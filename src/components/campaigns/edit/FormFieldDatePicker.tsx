import React, { useEffect } from "react";
import { get, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import { DateRange } from "react-day-picker";

export default function FormFieldDatePicker({ form }: { form: UseFormReturn }) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const setEndDate = useCampaignEditorStore((state) => state.setEndDate);
  const setStartDate = useCampaignEditorStore((state) => state.setStartDate);

  useEffect(() => {
    form.setValue("startDate", date?.from);
    form.setValue("endDate", date?.to);
    setEndDate(date.to as Date);
    setStartDate(date.from as Date);
  }, [JSON.stringify(date)]);

  return (
    <div className="my-2 flex flex-row items-center justify-between">
      <FormLabel className="text-base ps-10">Duration</FormLabel>
      <Popover>
        <span className="w-1/2">
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
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
            </FormControl>
          </PopoverTrigger>
          {form.formState.errors && get(form.formState.errors, "startDate") && (
            <div>
              From date: {get(form.formState.errors, "startDate").message}
            </div>
          )}
          {form.formState.errors && get(form.formState.errors, "endDate") && (
            <div>To date: {get(form.formState.errors, "endDate").message}</div>
          )}
        </span>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
