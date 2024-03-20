import { create } from "zustand";
import { subDays } from "date-fns";

interface BarGraphState {
  graphStartDate: Date;
  graphEndDate: Date;
  setGraphStartDate: (graphStartDate: Date) => void;
  setGraphEndDate: (graphEndDate: Date) => void;
}

const useBarGraphStore = create<BarGraphState>()((set) => ({
  graphStartDate: subDays(new Date(), 7),
  graphEndDate: new Date(),
  setGraphStartDate: (graphStartDate) => set({ graphStartDate }),
  setGraphEndDate: (graphEndDate) => set({ graphEndDate }),
}));

export default useBarGraphStore;
