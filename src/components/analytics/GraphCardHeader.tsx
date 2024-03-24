import useAnalyticsStore, {
  graphIntervals,
  graphOptions,
} from "@/stores/useAnalyticsStore";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarDays } from "lucide-react";
import DatePicker from "../home/RangeDatePicker";

function GraphCardHeader() {
  const {
    graphYAxis,
    setGraphYAxis,
    graphStartDate,
    setGraphStartDate,
    graphEndDate,
    setGraphEndDate,
    graphInterval,
    setGraphInterval,
  } = useAnalyticsStore();

  return (
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
            <DatePicker />
            <DatePicker />
          </div>
        </div>
        <Select required value={graphInterval} onValueChange={setGraphInterval}>
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
  );
}

export default GraphCardHeader;
