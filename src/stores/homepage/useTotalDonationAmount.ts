import { create } from "zustand";

interface TotalDonationAmountStore {
  totalDonationAmountFilter: string;
  setTotalDonationAmountFilter: (totalDonationAmountFilter: string) => void;
}

const useTotalDonationAmountStore = create<TotalDonationAmountStore>()((set) => ({
  totalDonationAmountFilter: "alltime",
  setTotalDonationAmountFilter: (totalDonationAmountFilter) => set((_) => ({ totalDonationAmountFilter: totalDonationAmountFilter })),
}));

export default useTotalDonationAmountStore;