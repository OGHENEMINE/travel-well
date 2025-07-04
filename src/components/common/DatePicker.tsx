import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarBlankIcon, CaretUpDownIcon } from "@phosphor-icons/react";
import { Calendar } from "../ui/calendar";

const DatePicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex items-center gap-2 border border-neutral-200 p-2 rounded-md">
      <CalendarBlankIcon size={30} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <CaretUpDownIcon size={30} />
    </div>
  );
};

export default DatePicker;
