import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PieChart } from "react-minimal-pie-chart";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

type CardProps = {
  statistic: string;
  selectorPlaceholder: string;
  selectorVals: string[];
};

type CardSelectorProps = {
  placeholder: string;
  values: string[];
};

const MOCK_DATA = [
  { title: "One", value: 10, color: "#FFD694" },
  { title: "Two", value: 15, color: "#FCE3BB" },
  { title: "Three", value: 20, color: "#FCEBCF" },
];

export default function PieChartCard({
  statistic,
  selectorPlaceholder,
  selectorVals,
}: CardProps) {
  return (
    <div className="bg-white shadow rounded xl:w-56 w-60 flex flex-col gap-4">
      <div className={`${arabotoBold.className} pt-4 text-center text-2xl`}>
        {statistic}
      </div>
      <div className="h-40">
        <PieChart data={MOCK_DATA} lineWidth={48} />
      </div>
      <div className={cn("bg-[#ffefdf] flex justify-end items-center p-4")}>
        <CardSelector placeholder={selectorPlaceholder} values={selectorVals} />
      </div>
    </div>
  );
}

function CardSelector({ placeholder, values }: CardSelectorProps) {
  return (
    <Select>
      <SelectTrigger className="w-[97px] h-[27px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((val, i) => {
          return (
            <SelectItem value={val} key={i}>
              {capitalizeFirstLetter(val)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
