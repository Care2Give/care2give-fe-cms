import { CampaignTable } from "@/types/campaigns/CampaignTable";
import SubHeader from "../SubHeader";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { useAuth } from "@clerk/nextjs";
import { Campaign, CampaignStatus } from "@/types/prismaSchema";
import useClerkSWR from "@/lib/useClerkSWR";

export default function Table({ campaigns }: { campaigns: CampaignTable[] }) {
  const router = useRouter();
  //   const {data } = useClerkSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/cms/campaign/${campaignId}`)
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
  } = useCampaignEditorStore();
  const { getToken } = useAuth();

  const onEdit = (indexOfCampaign: number) => {
    const campaignId = campaigns[indexOfCampaign].id;
    getToken().then((token) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/campaign/${campaignId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((response) => {
          const campaign: Campaign = response;
          setId(campaign.id);
          setStartDate(new Date(campaign.startDate));
          setEndDate(new Date(campaign.endDate));
          setTitle(campaign.title);
          setDonationOptions(campaign.donationAmounts);
          setDescription(campaign.description || "");
          // TODO change database to store the name of image if needed
          setImages(
            campaign.imageUrl.map((imageUrl) => {
              return {
                url: imageUrl,
                name: "",
              };
            })
          );
          setStatus(campaign.status);
          setTargetAmount(campaign.targetAmount);
          router.push("/campaigns/edit");
        });
    });
  };

  return (
    <div className="flex flex-col gap-8 mx-4">
      <SubHeader />
      <DataTable
        columns={getColumns(onEdit) as ColumnDef<CampaignTable, string>[]}
        data={campaigns}
      />
    </div>
  );
}
