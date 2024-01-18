import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, addMonths, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import useCampaignEditorStore from "@/stores/useCampaignEditorStore";
import { UseFormReturn } from "react-hook-form";

export default function FormFieldDatePicker({ form }: { form: UseFormReturn }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addMonths(new Date(), 1),
  });

  const { setEndDate, setStartDate } = useCampaignEditorStore();

  return (
    <div className="my-2">
      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between">
            <FormLabel className="text-base ps-10">Duration</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
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
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(e) => {
                    setDate(e);
                    setStartDate(e?.from as Date);
                    setEndDate(e?.to as Date);
                  }}
                  numberOfMonths={2}
                  disabled={(date) => date < addDays(new Date(), -365)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
}
