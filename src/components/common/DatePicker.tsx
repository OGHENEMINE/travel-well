"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { CalendarBlankIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SingleDatePickerProps {
  className?: string;
  onSelect?: (date: Date | undefined) => void;
}

const SingleDatePicker = ({ className, onSelect }: SingleDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onSelect) {
      onSelect(selectedDate);
    }
    if (selectedDate) {
      setOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-neutral-200 p-2 rounded-md",
        className
      )}
    >
      <CalendarBlankIcon size={30} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="single-date"
            variant="outline"
            className="w-full justify-start text-left font-normal border-none shadow-none"
          >
            <div className="flex flex-col">
              {date ? (
                <span className="font-medium">
                  {format(date, "MMM d, yyyy")}
                </span>
              ) : (
                <span>Select date</span>
              )}
            </div>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SingleDatePicker;
