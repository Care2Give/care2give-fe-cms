import useAnalyticsStore from "@/stores/useAnalyticsStore";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { BarChart3, LineChart } from "lucide-react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
});

const defaultColors = ["bg-[#1DCF9E]", "bg-[#5185FF]", "bg-[#FF5757]", "bg-[#F8DF71]"];

const campaigns = [
  {
    name: "Charity Dinner 2020",
    bgClass: "bg-[#1DCF9E]",
  },
  {
    name: "Providing Housing Advice",
    bgClass: "bg-[#5185FF]",
  },
  {
    name: "Smell Good, Feel Good, Do Good",
    bgClass: "bg-[#FF5757]",
  },
  {
    name: "Hidden Heroes",
    bgClass: "bg-[#F8DF71]",
  },
];

function GraphCardSidebar() {
  const { graphType, setGraphType, allCampaigns, toggleSelectedCampaigns, selectedCampaigns } = useAnalyticsStore();
  return (
    <div className="w-36 basis-36 flex flex-col gap-4">
      <div className={" rounded-lg border border-slate-200 h-8 p-1"}>
        <ToggleGroup
          className={"flex gap-2 h-full p-0"}
          type={"single"}
          defaultValue={graphType}
          onValueChange={setGraphType}
        >
          <ToggleGroupItem
            value={"line"}
            className="flex-1 h-full flex justify-center items-center data-[state=on]:bg-[#FFEFE0] rounded-md disabled:opacity-100 hover:bg-none hover:text-current"
            disabled={graphType === "line"}
          >
            <LineChart height={16} width={16} strokeWidth={3} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value={"bar"}
            className="flex-1 h-full flex justify-center items-center data-[state=on]:bg-[#FFEFE0] rounded-md disabled:opacity-100 hover:bg-none hover:text-current"
            disabled={graphType === "bar"}
          >
            <BarChart3 height={16} width={16} strokeWidth={3} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div
        className={cn(
          montserrat.className,
          "rounded-lg border border-slate-200 flex flex-col items-center py-3 px-2 h-full max-h-80 overflow-y-scroll"
        )}
      >
        <h3 className="text-xs font-semibold border-b-2 w-2/3 pb-2 mb-2 text-center">
          Campaigns
        </h3>
        <div className="space-y-2">
          {allCampaigns.map((campaign, campaignIndex) => (
            <div className="flex border-2 rounded-md" key={campaign}>
              <div
                className={`${defaultColors[campaignIndex]} basis-2 flex-none rounded-s-sm`}
              ></div>
              <div className="flex items-center gap-2 px-2 py-4">
                <Checkbox id={campaign} onCheckedChange={() => toggleSelectedCampaigns(campaign)} checked={selectedCampaigns.includes(campaign)}/>
                <label
                  htmlFor={campaign}
                  className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {campaign}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraphCardSidebar;
