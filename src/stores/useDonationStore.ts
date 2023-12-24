import { SelectSingleEventHandler } from "react-day-picker";
import { create } from "zustand";

interface DonationState {
  startDate: Date;
  endDate: Date;
  setStartDate: SelectSingleEventHandler;
  setEndDate: SelectSingleEventHandler;
}

const useDonationStore = create<DonationState>()((set) => ({
  startDate: new Date(),
  endDate: new Date(),
  setStartDate: (date) => set((_) => ({ startDate: date })),
  setEndDate: (date) => set((_) => ({ endDate: date })),
}));

export default useDonationStore;
