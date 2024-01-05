import { create } from "zustand";
import { HeartHandshake, Smile } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { devtools, persist } from "zustand/middleware";

export const graphYAxis = ["donation-amount", "donors"] as const;

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
    value: "donation-amount",
    icon: HeartHandshake,
  },
  {
    title: "Donors",
    value: "donors",
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
}

const useAnalyticsStore = create<AnalyticsState>()((set) => ({
  pieChartCampaignOne: "Charity Dinner 2020",
  pieChartCampaignTwo: "Smell Good, Feel Good, Do Good",
  setPieChartCampaignOne: (name) => set((_) => ({ pieChartCampaignOne: name })),
  setPieChartCampaignTwo: (name) => set((_) => ({ pieChartCampaignTwo: name })),
  graphYAxis: "donation-amount",
  setGraphYAxis: (type) => set((_) => ({ graphYAxis: type })),
  graphStartDate: new Date("2023-12-18"),
  setGraphStartDate: (date) => set((_) => ({ graphStartDate: date })),
  graphEndDate: new Date(),
  setGraphEndDate: (date) => set((_) => ({ graphEndDate: date })),
  graphInterval: "daily",
  setGraphInterval: (interval) => set((_) => ({ graphInterval: interval })),
  graphType: "line",
  setGraphType: (type) => set((_) => ({ graphType: type })),
}));

export default useAnalyticsStore;
