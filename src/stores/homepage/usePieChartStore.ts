import { create } from "zustand";

interface PieChartState {
  typesOfDonationsFilter: string;
  setTypesOfDonationsFilter: (typeOfDonation: string) => void;
}

const usePieChartStore = create<PieChartState>()((set) => ({
  typesOfDonationsFilter: "individual",
  setTypesOfDonationsFilter: (typeOfDonation) => set((_) => ({ typesOfDonationsFilter: typeOfDonation })),
}));

export default usePieChartStore;