import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideIcon } from "lucide-react";
import { arabotoBold } from "@/lib/font";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

type CardProps = {
  statistic: string;
  data: string;
  Icon: LucideIcon;
  footerData?: string;
  setFilter: (filter: string) => void;
};
export default function Card({
  statistic,
  data,
  Icon,
  footerData,
  setFilter,
}: CardProps) {
  return (
    <div className="bg-white shadow rounded xl:w-56 w-60 flex flex-col justify-between">
      <div className="pt-8 p-4 flex justify-between items-center h-full">
        <div>
          <div className={`${arabotoBold.className} text-3xl`}>{statistic}</div>
          <div className={`${montserrat.className} text-xs`}>{data}</div>
        </div>
        <Icon height={40} width={40} className="min-w-10" strokeWidth={1} />
      </div>
      <div
        className={cn("bg-[#ffefdf] flex justify-end items-center p-4", {
          "justify-between": footerData,
        })}
      >
        {footerData && (
          <p className={`${montserrat.className} text-sm`}>{footerData}</p>
        )}
        <CardFrequencySelector setFilter={setFilter} />
      </div>
    </div>
  );
}

interface CardFrequencySelectorProps {
  setFilter: (filter: string) => void;
}

function CardFrequencySelector({ setFilter }: CardFrequencySelectorProps) {
  return (
    <Select onValueChange={(val) => setFilter(val)}>
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
