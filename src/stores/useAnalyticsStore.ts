import { create } from "zustand";

interface AnalyticsState {
  pieChartCampaignOne: string;
  pieChartCampaignTwo: string;
  setPieChartCampaignOne: (val: string) => void; // Based on onValueChange for Select component
  setPieChartCampaignTwo: (val: string) => void;
}

const useAnalyticsStore = create<AnalyticsState>()((set) => ({
  pieChartCampaignOne: "Charity Dinner 2020",
  pieChartCampaignTwo: "Smell Good, Feel Good, Do Good",
  setPieChartCampaignOne: (name) => set((_) => ({ pieChartCampaignOne: name })),
  setPieChartCampaignTwo: (name) => set((_) => ({ pieChartCampaignTwo: name })),
}));

export default useAnalyticsStore;
