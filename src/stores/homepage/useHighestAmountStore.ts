import { create } from "zustand";

interface HighestAmountStore {
  highestAmountFilter: string;
  setHighestAmountFilter: (highestAmountFilter: string) => void;
}

const useHighestAmountStore = create<HighestAmountStore>()((set) => ({
  highestAmountFilter: "alltime",
  setHighestAmountFilter: (highestAmountFilter) => set((_) => ({ highestAmountFilter: highestAmountFilter })),
}));

export default useHighestAmountStore;