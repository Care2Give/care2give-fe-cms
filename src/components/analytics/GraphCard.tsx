import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Card from "../shared/Card";
import { BarChart3, CalendarDays, LineChart } from "lucide-react";
import { number, unknown } from "zod";
import DatePicker from "../home/DatePicker";
import {
  graphOptions,
  useAnalyticsStore,
  GraphInterval,
  graphIntervals,
  GraphType,
} from "@/stores/useAnalyticsStore";
import useChartConfig from "@/lib/useDemoConfig";
import { AxisOptions } from "react-charts";
import dynamic from "next/dynamic";
import { ToggleGroup } from "../ui/toggle-group";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { cn, mmddFormatter } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Montserrat } from "next/font/google";
import { set } from "date-fns";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
});

// const campaigns = [
//   "Charity Dinner 2020",
//   "Providing Housing Advice",
//   "Smell Good, Feel Good, Do Good",
//   "Hidden Heroes",
// ];

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

interface GraphCardProps {
  // Define the props for your component here
}

const GraphCard: React.FC<GraphCardProps> = (props) => {
  const {
    graphYAxis,
    setGraphYAxis,
    graphStartDate,
    setGraphStartDate,
    graphEndDate,
    setGraphEndDate,
    graphInterval,
    setGraphInterval,
    graphType,
    setGraphType,
  } = useAnalyticsStore();

  const { data } = useChartConfig({
    series: 3,
    dataType: "time",
  });

  const linePrimaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as Date,
    }),
    []
  ) as AxisOptions<unknown>;

  const barPrimaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => mmddFormatter(datum.primary as Date),
    }),
    []
  ) as AxisOptions<unknown>;

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  ) as AxisOptions<unknown>[];

  const secondaryStackedAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
      },
    ],
    []
  ) as AxisOptions<unknown>[];

  return (
    <Card>
      <div className="flex justify-between">
        <Select required value={graphYAxis} onValueChange={setGraphYAxis}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Graph" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {graphOptions.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  <option.icon height={24} width={24} className="inline" />
                  <span className="ml-2">{option.title}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className={"inline-flex gap-x-8"}>
          <div className="flex gap-2 items-center">
            <CalendarDays height={27} width={27} strokeWidth={1} />
            <div className="flex gap-4 items-center">
              <DatePicker date={graphStartDate} setDate={setGraphStartDate} />
              <DatePicker date={graphEndDate} setDate={setGraphEndDate} />
            </div>
          </div>
          <Select
            required
            value={graphInterval}
            onValueChange={setGraphInterval}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="rounded-lg">
                {graphIntervals.map((interval) => (
                  <SelectItem value={interval} key={interval}>
                    <span className="capitalize">{interval}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="my-4 flex gap-8">
        <Graph
          options={{
            data,
            primaryAxis:
              graphType === "line" ? linePrimaryAxis : barPrimaryAxis,
            secondaryAxes:
              graphType === "bar" ? secondaryStackedAxes : secondaryAxes,
          }}
        />
        <div className="w-36 basis-36 flex flex-col gap-4">
          <div className={" rounded-lg border border-slate-200 h-8 p-1"}>
            <ToggleGroup
              className={"flex gap-2 h-full p-0"}
              type={"single"}
              defaultValue="line"
              onValueChange={setGraphType}
            >
              <ToggleGroupItem
                value={"line"}
                className="flex-1 h-full flex justify-center items-center data-[state=on]:bg-[#FFEFE0] rounded-md disabled:cursor-pointer"
                disabled={graphType === "line"}
              >
                <LineChart height={16} width={16} strokeWidth={3} />
              </ToggleGroupItem>
              <ToggleGroupItem
                value={"bar"}
                className="flex-1 h-full flex justify-center items-center data-[state=on]:bg-[#FFEFE0] rounded-md disabled:cursor-pointer"
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
              {campaigns.map((campaign) => (
                <div className="flex border-2 rounded-md" key={campaign.name}>
                  <div
                    className={`${campaign.bgClass} basis-2 flex-none rounded-s-sm`}
                  ></div>
                  <div className="flex items-center gap-2 px-2 py-4">
                    <Checkbox id={campaign.name} />
                    <label
                      htmlFor={campaign.name}
                      className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {campaign.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

function Graph({ ...props }: React.ComponentProps<typeof Chart>) {
  return (
    <div className="flex-1 min-h-96 ">
      <Chart {...props} />
    </div>
  );
}

export default GraphCard;
