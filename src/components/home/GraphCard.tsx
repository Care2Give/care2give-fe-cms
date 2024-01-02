import * as React from "react";
import { CalendarDaysIcon } from "lucide-react";
import DatePicker from "./DatePicker";
import { Montserrat } from "next/font/google";
import { arabotoBold } from "@/lib/font";
import useHomeStore from "@/stores/useHomeStore";
import { SelectSingleEventHandler } from "react-day-picker";
import BarGraph from "./BarGraph";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

type GraphHeaderProps = {
  startDate: Date;
  endDate: Date;
  setStartDate: SelectSingleEventHandler;
  setEndDate: SelectSingleEventHandler;
};

type GraphProps = {
  startDate: Date;
  endDate: Date;
};

export default function GraphCard() {
  const { graphStartDate, graphEndDate, setGraphStartDate, setGraphEndDate } =
    useHomeStore();
  return (
    <div className="flex flex-col bg-white shadow rounded p-4 grow gap-10">
      <GraphHeader
        startDate={graphStartDate}
        endDate={graphEndDate}
        setStartDate={setGraphStartDate}
        setEndDate={setGraphEndDate}
      />
      <Graph startDate={graphStartDate} endDate={graphEndDate} />
    </div>
  );
}

function GraphHeader({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: GraphHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <p className={`${arabotoBold.className} text-2xl`}>
        Total Donation By Day
      </p>
      <div className="flex gap-2 items-center">
        <CalendarDaysIcon height={27} width={27} strokeWidth={1} />
        <div className="flex gap-4 items-center">
          <DatePicker date={startDate} setDate={setStartDate} />
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
      </div>
    </div>
  );
}

function Graph({ startDate, endDate }: GraphProps) {
  return (
    <div>
      <BarGraph startDate={startDate} endDate={endDate} />
    </div>
  );
}
