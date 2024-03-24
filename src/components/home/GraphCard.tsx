import * as React from "react";
import { CalendarDaysIcon } from "lucide-react";
import DatePicker from "./RangeDatePicker";
import { arabotoBold } from "@/lib/font";
import useBarGraphStore from "@/stores/homepage/useBarGraphStore";
import BarGraph from "./BarGraph";
import RangeDatePicker from "./RangeDatePicker";

export default function GraphCard() {
  const { graphStartDate, graphEndDate } = useBarGraphStore();

  return (
    <div className="flex flex-col bg-white shadow rounded p-4 grow gap-10">
      <GraphHeader />
      {graphStartDate && graphEndDate ? (
        <BarGraph startDate={graphStartDate} endDate={graphEndDate} />
      ) : (
        <p className={`${arabotoBold.className} text-center`}>
          Please pick a start date and end date to generate the graph
        </p>
      )}
    </div>
  );
}

// left to implement: update the date states

function GraphHeader() {
  return (
    <div className="flex justify-between items-center">
      <p className={`${arabotoBold.className} text-2xl`}>
        Total Donation By Day
      </p>
      <div className="flex gap-2 items-center">
        <RangeDatePicker />
      </div>
    </div>
  );
}
