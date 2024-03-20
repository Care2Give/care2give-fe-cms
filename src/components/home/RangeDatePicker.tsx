import * as React from "react";
import { isBefore, addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import useBarGraphStore from "@/stores/homepage/useBarGraphStore";
import { CalendarIcon } from "@radix-ui/react-icons";

export default function RangeDatePicker() {
  const { graphStartDate, graphEndDate, setGraphStartDate, setGraphEndDate } =
    useBarGraphStore();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: graphStartDate,
    to: graphEndDate,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-[240px] pl-3 text-left font-normal"
        >
          <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(e) => {
            setDate(e);
            setGraphStartDate(e?.from as Date);
            setGraphEndDate(e?.to as Date);
          }}
          numberOfMonths={2}
          disabled={(date) => date < addDays(new Date(), -365)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
