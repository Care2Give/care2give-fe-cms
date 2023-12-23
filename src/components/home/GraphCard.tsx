import * as React from "react";
import { CalendarDaysIcon } from "lucide-react";
import DatePicker from "./DatePicker";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import useHomeStore from "@/stores/useHomeStore";
import { SelectSingleEventHandler } from "react-day-picker";
import BarGraph from "./BarGraph";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

const arabotoBold = localFont({
  src: "../../../public/fonts/araboto/Araboto Bold 400.ttf",
});

export default function GraphCard() {
  return (
    <div className="w-[845px]">
      <GraphHeader />
      <Graph />
    </div>
  );
}

function GraphHeader() {
  const { graphStartDate, graphEndDate, setGraphStartDate, setGraphEndDate } =
    useHomeStore();
  return (
    <div className="flex justify-between items-center">
      <p className={`${arabotoBold.className} text-2xl`}>
        Total Donation By Day
      </p>
      <div className="flex gap-4 items-center">
        <CalendarDaysIcon height={27} width={27} strokeWidth={1} />
        <div className="flex gap-8 items-center">
          <DatePicker date={graphStartDate} setDate={setGraphStartDate} />
          <DatePicker date={graphEndDate} setDate={setGraphEndDate} />
        </div>
      </div>
    </div>
  );
}

function Graph() {
  // TODO
  const { graphStartDate, graphEndDate } = useHomeStore();

  return (
    <div>
      <BarGraph />
    </div>
  );
}
