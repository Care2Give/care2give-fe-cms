import { CampaignTable } from "@/types/campaigns/CampaignTable";
import SubHeader from "../SubHeader";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import {useRouter} from "next/router";
import {ColumnDef} from "@tanstack/react-table";
import {ca} from "date-fns/locale";
import useClerkSWR from "@/lib/useClerkSWR";
import {useAuth} from "@clerk/nextjs";
import { Campaign } from "@/types/prismaSchema"

export default function Table({ campaigns }: { campaigns: CampaignTable[] }) {
    const router = useRouter();
    const setStartDate = useCampaignEditorStore(state => state.setStartDate);
    const setEndDate = useCampaignEditorStore(state => state.setEndDate);
    const setDonationOptions = useCampaignEditorStore(state => state.setDonationOptions);
    const setDescription = useCampaignEditorStore(state => state.setDescription);
    const setTitle = useCampaignEditorStore(state => state.setTitle);
    const setImages = useCampaignEditorStore(state => state.setImages);
    const setStatus = useCampaignEditorStore(state => state.setStatus);
    const setTargetAmount = useCampaignEditorStore(state => state.setTargetAmount);
    const { getToken } = useAuth();

    const onEdit = (indexOfCampaign: number) => {
        const campaignId = campaigns[indexOfCampaign].id;
        getToken().then((token) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/campaign/${campaignId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => res.json()).then((response) => {
                const campaign: Campaign = response;
                console.log(campaign);
                setStartDate(new Date(campaign.startDate));
                setEndDate(new Date(campaign.endDate));
                setTitle(campaign.title);
                setDonationOptions(campaign.donationAmounts);
                setDescription(campaign.description || "");
                // TODO change database to store the name of image
                setImages(campaign.imageUrl.map(imageUrl => {
                    return (
                        {
                            url: imageUrl,
                            name: ""
                        }
                    );
                }));
                setStatus(campaign.status);
                setTargetAmount(campaign.targetAmount);
                router.push("/campaigns/edit");
            })
        })
    }

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
