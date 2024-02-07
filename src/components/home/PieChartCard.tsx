import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { arabotoBold } from "@/lib/font";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PieChart } from "react-minimal-pie-chart";
import { useEffect } from "react";
import useClerkSWR from "@/lib/useClerkSWR";
import usePieChartStore from "@/stores/homepage/usePieChartStore";
import { SelectDonationType } from "@/types/homepage/DonationTypes";

type CardProps = {
  statistic: string;
  selectorPlaceholder: string;
};

type CardSelectorProps = {
  placeholder: string;
  values: string[];
  setFilter: (typeOfDonation: string) => void;
};

const colors = ["#FFD694", "#FCE3BB", "#FCEBCF"];

function formatTitle(key: string) {
  var splitStr = key.toLowerCase().split("_");

  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(" ");
}

export default function PieChartCard({
  statistic,
  selectorPlaceholder,
}: CardProps) {
  const { typesOfDonationsFilter, setTypesOfDonationsFilter } =
    usePieChartStore();

  const { data, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/homepage-analytics/types-of-donations?filter=` +
      typesOfDonationsFilter
  );

  // convert data ({type: string; count: number}) into array of objects
  const pieChartData: {
    title: string;
    value: number;
    color: string;
  }[] = [];
  let count = 0;

  for (let key in data) {
    pieChartData.push({
      title: formatTitle(key.toLowerCase()),
      value: Number(data[key]),
      color: colors[count++],
    });
  }

  if (error) return null;

  return (
    <div className="bg-white shadow rounded xl:w-56 w-60 flex flex-col gap-4">
      <div className={`${arabotoBold.className} pt-4 text-center text-2xl`}>
        {statistic}
      </div>
      <div className="h-40">
        <PieChart
          data={pieChartData}
          lineWidth={48}
          label={(data) => data.dataEntry.value}
          labelPosition={75}
          labelStyle={{
            fontSize: "10px",
            fontWeight: "600",
          }}
        />
      </div>
      <div className={cn("bg-[#ffefdf] flex justify-end items-center p-4")}>
        <CardSelector
          placeholder={selectorPlaceholder}
          values={[
            SelectDonationType.INDIVIDUAL,
            SelectDonationType.GROUP,
            SelectDonationType.ANONYMOUS,
            SelectDonationType.ALL,
          ]}
          setFilter={setTypesOfDonationsFilter}
        />
      </div>
    </div>
  );
}

function CardSelector({ placeholder, values, setFilter }: CardSelectorProps) {
  return (
    <Select
      onValueChange={(val) => {
        setFilter(val);
      }}
    >
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
