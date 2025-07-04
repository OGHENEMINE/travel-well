"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { CalendarBlankIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  className?: string;
  onSelect?: (dateRange: DateRange | undefined) => void;
}

export function DateRangePicker({ className, onSelect }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDateRange: DateRange | undefined) => {
    setDate(selectedDateRange);
    if (onSelect) {
      onSelect(selectedDateRange);
    }
    if (selectedDateRange?.from && selectedDateRange?.to) {
      setOpen(false);
    }
  };

  return (
    <div className={cn("flex items-center gap-2 border border-neutral-200 p-2 rounded-md", className)}>
      <CalendarBlankIcon size={30} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className="w-full justify-start text-left font-normal border-none shadow-none"
          >
            <div className="flex flex-col">
              {date?.from ? (
                date.to ? (
                  <>
                    <span className="font-medium">
                      {format(date.from, "MMM d, yyyy")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      to {format(date.to, "MMM d, yyyy")}
                    </span>
                  </>
                ) : (
                  <span className="font-medium">
                    {format(date.from, "MMM d, yyyy")}
                  </span>
                )
              ) : (
                <span>Select date range</span>
              )}
            </div>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;