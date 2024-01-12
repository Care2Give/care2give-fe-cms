import { SelectSingleEventHandler } from "react-day-picker";
import { create } from "zustand";

interface DonationState {
  startDate: Date;
  endDate: Date;
  setStartDate: SelectSingleEventHandler;
  setEndDate: SelectSingleEventHandler;
  isNricHidden: boolean;
  setIsNricHidden: (isNricHidden: boolean) => void;
}

const useDonationStore = create<DonationState>()((set) => ({
  startDate: new Date(),
  endDate: new Date(),
  setStartDate: (date) => set((_) => ({ startDate: date })),
  setEndDate: (date) => set((_) => ({ endDate: date })),
  isNricHidden: true,
  setIsNricHidden: (isNricHidden) => set((_) => ({ isNricHidden })),
}));

export default useDonationStore;
