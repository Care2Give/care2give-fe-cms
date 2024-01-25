import { create } from "zustand";

interface HighestAmountStore {
  highestAmountFilter: string;
  setHighestAmountFilter: (highestAmountFilter: string) => void;
}

const useHighestAmountStore = create<HighestAmountStore>()((set) => ({
  highestAmountFilter: "daily",
  setHighestAmountFilter: (highestAmountFilter) =>
    set((_) => ({ highestAmountFilter: highestAmountFilter })),
}));

export default useHighestAmountStore;
