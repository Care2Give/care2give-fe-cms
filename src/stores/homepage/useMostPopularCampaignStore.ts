import { create } from "zustand";

interface MostPopularCampaignStore {
  mostPopularCampaignFilter: string;
  setMostPopularCampaignFilter: (typeOfCampaign: string) => void;
}

const useMostPopularCampaignStore = create<MostPopularCampaignStore>()((set) => ({
  mostPopularCampaignFilter: "alltime",
  setMostPopularCampaignFilter: (mostPopularCampaign) => set((_) => ({ mostPopularCampaignFilter: mostPopularCampaign })),
}));

export default useMostPopularCampaignStore;