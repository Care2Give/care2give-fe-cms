import { create } from "zustand";

interface TotalDonorsStore {
  totalDonorsFilter: string;
  setTotalDonorsFilter: (totalDonorsFilter: string) => void;
}

const useTotalDonorsStore = create<TotalDonorsStore>()((set) => ({
  totalDonorsFilter: "alltime",
  setTotalDonorsFilter: (totalDonorsFilter) => set((_) => ({ totalDonorsFilter: totalDonorsFilter })),
}));

export default useTotalDonorsStore;