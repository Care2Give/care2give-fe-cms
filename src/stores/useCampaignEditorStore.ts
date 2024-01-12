import {create} from "zustand";
import {CampaignDonationAmount, CampaignStatus} from "@/types/prismaSchema";

export type CampaignImage = {
    url: string;
    name: string;
}

interface CampaignEditorState {
    id: string,
    setId: (id: string) => void;
    status: CampaignStatus;
    setStatus: (status: CampaignStatus) => void;
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    targetAmount: number;
    setTargetAmount: (targetAmount: number) => void;
    startDate: Date;
    setStartDate: (startDate: Date) => void;
    endDate: Date;
    setEndDate: (endDate: Date) => void;
    donationOptions: CampaignDonationAmount[];
    setDonationOptions: (donationOptions: CampaignDonationAmount[]) => void;
    images: CampaignImage[];
    setImages: (images: CampaignImage[]) => void;
    reset: () => void;
}

const useCampaignEditorStore = create<CampaignEditorState>()((set) => ({
    id: "",
    setId: (id) => set({id}),
    status: CampaignStatus.ACTIVE,
    setStatus: (status) => set({ status }),
    title: "",
    setTitle: (title) => set({title}),
    description: "",
    setDescription: (description) => set({description}),
    targetAmount: 0,
    setTargetAmount: (targetAmount) => set({targetAmount}),
    startDate: new Date(),
    setStartDate: (startDate) => set({startDate}),
    endDate: new Date(),
    setEndDate: (endDate) => set({endDate}),
    donationOptions: [],
    setDonationOptions: (donationOptions) => set({donationOptions}),
    images: [],
    setImages: (images: CampaignImage[]) => set({images}),
    reset: () => set({
        status: CampaignStatus.ACTIVE,
        title: "",
        description: "",
        targetAmount: 0,
        startDate: new Date(),
        endDate: new Date(),
        donationOptions: [],
        images: [],
    }),
}));

export default useCampaignEditorStore;
