import { CampaignTable } from "@/types/campaigns/CampaignTable";
import SubHeader from "../SubHeader";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import useCampaignEditorStore, {
  DonationAmountFormInput,
} from "@/stores/useCampaignEditorStore";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { useAuth } from "@clerk/nextjs";
import { CampaignWithDonationAmounts } from "@/types/campaigns/CampaignWithDonationAmounts";
import { CampaignDonationAmount } from "@/types/prismaSchema";

/**
 * Converts DB object stored with dollars and cents to input object stored with amount
 * @param donationAmounts Donation Amounts in dollars and cents
 * @returns array of DonationAmountFormInput with total amount from the dollars and cents
 */
function convertDonationDbObjToInputObj(
  donationAmounts: CampaignDonationAmount[]
): DonationAmountFormInput[] {
  return donationAmounts.map((dbObject) => {
    return {
      amount: dbObject.dollars + Math.floor(dbObject.cents / 100),
      description: dbObject.description || "",
    };
  });
}

export default function Table({ campaigns }: { campaigns: CampaignTable[] }) {
  const router = useRouter();

  const {
    setId,
    setStartDate,
    setEndDate,
    setDonationOptions,
    setDescription,
    setTitle,
    setImages,
    setStatus,
    setTargetAmount,
    setIsCampaignExist,
  } = useCampaignEditorStore();

  const { getToken } = useAuth();

  const onEdit = async (indexOfCampaign: number) => {
    const campaignId = campaigns[indexOfCampaign].id;
    setId(campaignId);
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/campaign/${campaignId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data: CampaignWithDonationAmounts = await res.json();

    if (data) {
      const targetAmount = data.dollars + data.cents / 100;
      setId(data.id || "");
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
      setTitle(data.title);
      setDonationOptions(convertDonationDbObjToInputObj(data.donationAmounts));
      setDescription(data.description || "");
      setImages(
        data.imageUrls.map((imageUrl, i) => {
          return {
            url: imageUrl,
            name: "",
          };
        })
      );
      setStatus(data.status);
      setTargetAmount(targetAmount);
      setIsCampaignExist(true);
      router.push("/campaigns/edit");
    }
  };

  return (
    <div className="flex flex-col gap-8 mx-4">
      <SubHeader />
      <DataTable
        columns={columns(onEdit) as ColumnDef<CampaignTable, string>[]}
        data={campaigns}
      />
    </div>
  );
}
