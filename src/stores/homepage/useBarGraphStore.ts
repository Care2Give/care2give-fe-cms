import { SelectSingleEventHandler } from "react-day-picker";
import { create } from "zustand";

interface BarGraphState {
  graphStartDate: Date;
  graphEndDate: Date;
  setGraphStartDate: SelectSingleEventHandler;
  setGraphEndDate: SelectSingleEventHandler;
}

const useBarGraphStore = create<BarGraphState>()((set) => ({
  graphStartDate: new Date("2023-12-18"),
  graphEndDate: new Date(),
  setGraphStartDate: (date) => set((_) => ({ graphStartDate: date })),
  setGraphEndDate: (date) => set((_) => ({ graphEndDate: date })),
}));

export default useBarGraphStore;