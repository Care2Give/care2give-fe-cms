import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import {DonationOption} from "@/components/campaigns/edit/DonationOptionForm";
import {Button} from "@/components/ui/button";
import {EditStage} from "@/pages/campaigns/edit/edit-stage";

function buildPreviewLink(campaignState): URL {
    const campaignWebsite = "http://localhost:3001";
    const urlObj = new URL(campaignWebsite + "/campaigns/preview");
    urlObj.searchParams.append("title", campaignState.title);
    urlObj.searchParams.append("donors", "0");
    urlObj.searchParams.append("currentAmount", "0");
    urlObj.searchParams.append("targetAmount", campaignState.targetAmount);
    urlObj.searchParams.append("targetDate", new Date(campaignState.endDate).toTimeString());
    urlObj.searchParams.append("slug", campaignState.title);
    urlObj.searchParams.append("description", campaignState.description);
    const donationOptions: DonationOption[] = campaignState.donationOptions;
    for (let i = 0; i < donationOptions.length; i++) {
        urlObj.searchParams.append("donationOptionValue", donationOptions[i].amount.toString());
        urlObj.searchParams.append("donationOptionDescription", donationOptions[i].description);
    }
    const images = campaignState.images;
    for (let i = 0; i < images.length; i++) {
        urlObj.searchParams.append("imageUrl", images[i].url);
    }
    return urlObj;
}


export default function PreviewSite({setEditStage}) {
    const previewLink = buildPreviewLink(useCampaignEditorStore.getState()).href;
    function Banner() {
        return (
            <div className="flex justify-end bg-slate-50">
                <Button className="m-2" onClick={() => setEditStage(EditStage.Publish)}>Close Preview</Button>
            </div>
        );
    }

    return (
        <div>
            <Banner />
            <iframe className="w-full h-screen" src={previewLink} title="Preview link"></iframe>
        </div>
    );
}
