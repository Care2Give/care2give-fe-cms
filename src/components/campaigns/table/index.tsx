import SubHeader from "../SubHeader";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import data from "./MOCK_DATA";
import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import {useRouter} from "next/router";

export default function Table() {
    const router = useRouter();
    const setStartDate = useCampaignEditorStore(state => state.setStartDate);
    const setEndDate = useCampaignEditorStore(state => state.setEndDate);
    const setDonationOptions = useCampaignEditorStore(state => state.setDonationOptions);
    const setDescription = useCampaignEditorStore(state => state.setDescription);
    const setTitle = useCampaignEditorStore(state => state.setTitle);
    const setImages = useCampaignEditorStore(state => state.setImages);
    const setIsActive = useCampaignEditorStore(state => state.setIsActive);
    const setTargetAmount = useCampaignEditorStore(state => state.setTargetAmount);

    const onEdit = (indexOfCampaign: number) => {
        const campaign = data[indexOfCampaign];
        setStartDate(new Date(campaign.startDate));
        setEndDate(new Date(campaign.endDate));
        setTitle(campaign.title);
        setDonationOptions(campaign.donationOptions);
        setDescription(campaign.description);
        setImages(campaign.images);
        setIsActive(campaign.isActive);
        setTargetAmount(campaign.targetAmount);
        router.push("/campaigns/edit");
    }

    return (
      <div className="flex flex-col gap-8 mx-24">
        <SubHeader />
        <DataTable columns={getColumns(onEdit)} data={data} />
      </div>
    );
}
