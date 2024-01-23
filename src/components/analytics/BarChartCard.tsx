import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Montserrat } from "next/font/google";
import BarChart from "./BarChart";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["700"],
});

type CampaignProps = {
  campaign: string;
  amount: number;
  trend?: boolean;
  number_of_donors?: number;
};

type BarChartProps = {
  xLabel: string;
  yLabel: string;
  scale: number;
};

type BarChartCardProps = {
  title: string;
  barChartDetails: BarChartProps[];
  tableDetails: CampaignProps[];
  Table: any;
};

export default function BarChartCard({
  title,
  barChartDetails,
  tableDetails,
  Table,
}: BarChartCardProps) {
  return (
    <div className="bg-white shadow rounded flex flex-col p-8 m-2">
      <div className="flex justify-between">
        <div className={`${montserrat.className} text-1xl`}>{title}</div>
        <CardFrequencySelector />
      </div>
      <div className="flex mt-10">
        <div className="h-full flex-initial mr-1">
          <BarChart {...barChartDetails} />
        </div>
        <div className="flex flex-1 ml-1 overflow-hidden">
          <Table {...tableDetails} />
        </div>
      </div>
    </div>
  );
}

function CardFrequencySelector() {
  return (
    <Select>
      <SelectTrigger className="w-[97px] h-[27px]">
        <SelectValue placeholder="Daily" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
        <SelectItem value="yearly">Yearly</SelectItem>
        <SelectItem value="alltime">All Time</SelectItem>
      </SelectContent>
    </Select>
  );
}
