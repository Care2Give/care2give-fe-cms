import { create } from "zustand";
import {DonationOption} from "@/components/campaigns/edit/DonationOptionForm";

export type CampaignImage = {
    url: string;
    name: string;
}

interface CampaignEditorState {
    isActive: boolean;
    setIsActive: (isActive: boolean) => void;
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
    donationOptions: DonationOption[];
    setDonationOptions: (donationOptions: DonationOption[]) => void;
    images: CampaignImage[];
    setImages: (images: CampaignImage[]) => void;
}

const useCampaignEditorStore = create<CampaignEditorState>()((set) => ({
    isActive: true,
    setIsActive: (isActive) => set({ isActive }),
    title: "123",
    setTitle: (title) => set({title}),
    description: "123",
    setDescription: (description) => set({description}),
    targetAmount: 123,
    setTargetAmount: (targetAmount) => set({targetAmount}),
    startDate: new Date(),
    setStartDate: (startDate) => set({startDate}),
    endDate: new Date(),
    setEndDate: (endDate) => set({endDate}),
    donationOptions: [{amount: 1, description: "123"}],
    setDonationOptions: (donationOptions) => set({donationOptions}),
    images: [],
    setImages: (images: CampaignImage[]) => set({images}),
}));

export default useCampaignEditorStore;
