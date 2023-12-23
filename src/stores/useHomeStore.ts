import { SelectSingleEventHandler } from "react-day-picker";
import { create } from "zustand";

interface HomeState {
  graphStartDate: Date;
  graphEndDate: Date;
  setGraphStartDate: SelectSingleEventHandler;
  setGraphEndDate: SelectSingleEventHandler;
}

const useHomeStore = create<HomeState>()((set) => ({
  graphStartDate: new Date("2023-12-18"),
  graphEndDate: new Date(),
  setGraphStartDate: (date) => set((_) => ({ graphStartDate: date })),
  setGraphEndDate: (date) => set((_) => ({ graphEndDate: date })),
}));

export default useHomeStore;
