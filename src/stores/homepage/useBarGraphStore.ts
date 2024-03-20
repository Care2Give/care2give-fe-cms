import { SelectSingleEventHandler } from "react-day-picker";
import { create } from "zustand";
import { subDays } from "date-fns";

interface BarGraphState {
  graphStartDate: Date;
  graphEndDate: Date;
  setGraphStartDate: SelectSingleEventHandler;
  setGraphEndDate: SelectSingleEventHandler;
}

const useBarGraphStore = create<BarGraphState>()((set) => ({
  graphStartDate: subDays(new Date(), 7),
  graphEndDate: new Date(),
  setGraphStartDate: (date) => set((_) => ({ graphStartDate: date })),
  setGraphEndDate: (date) => set((_) => ({ graphEndDate: date })),
}));

export default useBarGraphStore;
