import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import { Button } from "@/components/ui/button";
import { EditStage } from "@/components/campaigns/edit/edit-stage";
import { CampaignDonationAmount } from "@/types/prismaSchema";

function calcDonationOptionAmt(dollars: number, cents: number) {
  return dollars + cents / 100;
}

function buildPreviewLink({
  title,
  targetAmount,
  endDate,
  description,
  donationOptions,
  images,
}: {
  title: string;
  targetAmount: number;
  endDate: Date;
  description: string;
  donationOptions: CampaignDonationAmount[];
  images: { url: string }[];
}): URL {
  const campaignWebsite = process.env.NEXT_PUBLIC_CAMPAIGN_WEBSITE;
  const urlObj = new URL(campaignWebsite + "/campaigns/preview");
  urlObj.searchParams.append("title", title);
  urlObj.searchParams.append("donors", "0");
  urlObj.searchParams.append("currentAmount", "0");
  urlObj.searchParams.append("targetAmount", targetAmount.toString());
  urlObj.searchParams.append("targetDate", new Date(endDate).toTimeString());
  urlObj.searchParams.append("slug", title);
  urlObj.searchParams.append("description", description);

  for (let i = 0; i < donationOptions.length; i++) {
    const { dollars, cents, description } = donationOptions[i];
    urlObj.searchParams.append(
      "donationOptionValue",
      calcDonationOptionAmt(dollars, cents).toString()
    );
    urlObj.searchParams.append("donationOptionDescription", description || "");
  }

  for (let i = 0; i < images.length; i++) {
    urlObj.searchParams.append("imageUrls", images[i].url);
  }

  return urlObj;
}

export default function PreviewSite({
  setEditStage,
}: {
  setEditStage: (arg0: EditStage) => void;
}) {
  const { title, targetAmount, endDate, description, donationOptions, images } =
    useCampaignEditorStore();

  const previewLink = buildPreviewLink({
    title,
    targetAmount,
    endDate,
    description,
    donationOptions,
    images,
  }).href;

  function Banner() {
    return (
      <div className="flex justify-end bg-slate-50">
        <Button
          className="m-2 bg-blue-500 hover:bg-blue-600"
          onClick={() => setEditStage(EditStage.Publish)}
        >
          Close Preview
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <iframe
        className="w-full h-screen"
        src={previewLink}
        title="Preview link"
      ></iframe>
    </div>
  );
}
