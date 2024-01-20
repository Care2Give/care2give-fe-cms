import { create } from "zustand";

interface MostPopularDonationStore {
  mostPopularDonationFilter: string;
  setMostPopularDonationFilter: (typeOfDonation: string) => void;
}

const useMostPopularDonationStore = create<MostPopularDonationStore>()((set) => ({
  mostPopularDonationFilter: "alltime",
  setMostPopularDonationFilter: (mostPopularDonation) => set((_) => ({ mostPopularDonationFilter: mostPopularDonation })),
}));

export default useMostPopularDonationStore;