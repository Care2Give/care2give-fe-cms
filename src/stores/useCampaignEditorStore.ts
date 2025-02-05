import { create } from "zustand";
import { CampaignStatus } from "@/types/prismaSchema";
import { addMonths } from "date-fns";

export interface CampaignImage {
  name: string;
  url: string;
}

export interface DonationAmountFormInput {
  amount: number;
  description: string;
}

interface CampaignEditorState {
  id: string;
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
  donationOptions: DonationAmountFormInput[];
  setDonationOptions: (donationOptions: DonationAmountFormInput[]) => void;
  images: CampaignImage[];
  setImages: (images: CampaignImage[]) => void;
  reset: () => void;
  isCampaignExist: boolean;
  setIsCampaignExist: (isCampaignExist: boolean) => void;
}

const useCampaignEditorStore = create<CampaignEditorState>()((set) => ({
  id: "",
  setId: (id) => set({ id }),
  status: CampaignStatus.ACTIVE,
  setStatus: (status) => set({ status }),
  title: "",
  setTitle: (title) => set({ title }),
  description: "",
  setDescription: (description) => set({ description }),
  targetAmount: 0,
  setTargetAmount: (targetAmount) => set({ targetAmount }),
  startDate: new Date(),
  setStartDate: (startDate) => set({ startDate }),
  endDate: addMonths(new Date(), 1),
  setEndDate: (endDate) => set({ endDate }),
  donationOptions: [],
  setDonationOptions: (donationOptions) => set({ donationOptions }),
  images: [],
  setImages: (images: CampaignImage[]) => set({ images }),
  reset: () =>
    set({
      status: CampaignStatus.ACTIVE,
      title: "",
      description: "",
      targetAmount: 0,
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      donationOptions: [],
      images: [],
    }),
  isCampaignExist: false,
  setIsCampaignExist: (isCampaignExist) => set({ isCampaignExist }),
}));

export default useCampaignEditorStore;
