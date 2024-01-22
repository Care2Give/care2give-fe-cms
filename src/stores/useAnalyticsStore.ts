import { create } from "zustand";
import { HeartHandshake, Smile } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { devtools, persist } from "zustand/middleware";

export const graphYAxis = ["donationAmount", "numDonations"] as const;

export type GraphYAxis = (typeof graphYAxis)[number];

export const graphIntervals = ["daily", "weekly", "monthly"] as const;

export type GraphInterval = (typeof graphIntervals)[number];

export const graphTypes = ["line", "bar"] as const;

export type GraphType = (typeof graphTypes)[number];

export type GraphOption = {
  title: string;
  value: GraphYAxis;
  icon: any;
};

export const graphOptions: GraphOption[] = [
  {
    title: "Donation Amount",
    value: "donationAmount",
    icon: HeartHandshake,
  },
  {
    title: "Donors",
    value: "numDonations",
    icon: Smile,
  },
];
interface AnalyticsState {
  pieChartCampaignOne: string;
  pieChartCampaignTwo: string;
  setPieChartCampaignOne: (val: string) => void; // Based on onValueChange for Select component
  setPieChartCampaignTwo: (val: string) => void;
  graphYAxis: GraphYAxis;
  setGraphYAxis: (type: GraphYAxis) => void;
  graphStartDate: Date;
  setGraphStartDate: SelectSingleEventHandler;
  graphEndDate: Date;
  setGraphEndDate: SelectSingleEventHandler;
  graphInterval: GraphInterval;
  setGraphInterval: (interval: GraphInterval) => void;
  graphType: GraphType;
  setGraphType: (type: GraphType) => void;
  allCampaigns: string[];
  setAllCampaigns: (allCampaigns: string[]) => void;
  selectedCampaigns: string[];
  setSelectedCampaigns: (selectedCampaigns: string[]) => void;
  toggleSelectedCampaigns: (campaignToToggle: string) => void;
  removeSelectedCampaign: (campaignToRemove: string) => void;
  addSelectedCampaign: (campaignToAdd: string) => void;
}

const useAnalyticsStore = create<AnalyticsState>()((set, get) => ({
  pieChartCampaignOne: "Charity Dinner 2020",
  pieChartCampaignTwo: "Smell Good, Feel Good, Do Good",
  setPieChartCampaignOne: (name) => set((_) => ({ pieChartCampaignOne: name })),
  setPieChartCampaignTwo: (name) => set((_) => ({ pieChartCampaignTwo: name })),
  graphYAxis: "donationAmount",
  setGraphYAxis: (type) => set((_) => ({ graphYAxis: type })),
  graphStartDate: new Date("2023-12-18"),
  setGraphStartDate: (date) => set((_) => ({ graphStartDate: date })),
  graphEndDate: new Date(),
  setGraphEndDate: (date) => set((_) => ({ graphEndDate: date })),
  graphInterval: "daily",
  setGraphInterval: (interval) => set((_) => ({ graphInterval: interval })),
  graphType: "line",
  setGraphType: (type) => set((_) => ({ graphType: type })),
  allCampaigns: [],
  setAllCampaigns: (allCampaigns: string[]) => set({allCampaigns: allCampaigns, selectedCampaigns: allCampaigns}),
  selectedCampaigns: [],
  setSelectedCampaigns: (selectedCampaigns) => set({selectedCampaigns}),
  toggleSelectedCampaigns: (campaignToToggle) => {
    const campaigns = get().selectedCampaigns;
    if (campaigns.includes(campaignToToggle)) {
      const newCampaigns = campaigns.filter(campaign => campaign != campaignToToggle);
      set({selectedCampaigns: newCampaigns});
    } else {
      campaigns.push(campaignToToggle);
      set({selectedCampaigns: campaigns});
    }
  },
  removeSelectedCampaign: (campaignToRemove) => {
    const campaigns = get().selectedCampaigns;
    const newCampaigns = campaigns.filter(campaign => campaign != campaignToRemove);
    set({selectedCampaigns: newCampaigns});
  },
  addSelectedCampaign: (campaignToAdd) => {
    const campaigns = get().selectedCampaigns;
    if (campaigns.includes(campaignToAdd)) {
      return;
    }
    campaigns.push(campaignToAdd);
    set({selectedCampaigns: campaigns});
  }
}));

export default useAnalyticsStore;
