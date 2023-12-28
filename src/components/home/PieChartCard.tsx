import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideIcon } from "lucide-react";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import clsx from "clsx";
import {
  capitalizeFirstLetter,
  joinBlankspacedStringLowercased,
} from "@/lib/utils";
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
  { title: "One", value: 10, color: "#E38627" },
  { title: "Two", value: 15, color: "#C13C37" },
  { title: "Three", value: 20, color: "#6A2135" },
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
        <PieChart data={MOCK_DATA} />
      </div>
      <div className={clsx("bg-[#ffefdf] flex justify-end items-center p-4")}>
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
            <SelectItem value={joinBlankspacedStringLowercased(val)} key={i}>
              {capitalizeFirstLetter(val)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
