import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

type DatePickerProps = {
  date: Date;
  setDate: SelectSingleEventHandler;
};

export default function DatePicker({ date, setDate }: DatePickerProps) {
  // const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-36 text-left font-normal flex justify-between",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
          <ChevronDownIcon strokeWidth={1} className="min-w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
