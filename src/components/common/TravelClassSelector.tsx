"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import { UsersThreeIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TravelClassSelectorProps {
  className?: string;
  onSelect?: (data: { passengers: number; travelClass: string }) => void;
}

export function TravelClassSelector({
  className,
  onSelect,
}: TravelClassSelectorProps) {
  const [open, setOpen] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const handlePassengerChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 9) {
      setPassengers(newCount);
      if (onSelect) {
        onSelect({ passengers: newCount, travelClass });
      }
    }
  };

  const handleClassChange = (value: string) => {
    setTravelClass(value);
    if (onSelect) {
      onSelect({ passengers, travelClass: value });
    }
  };

  return (
    <div className={cn("flex items-center gap-2 border border-neutral-200 p-2 rounded-md", className)}>
      <UsersThreeIcon size={30} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal border-none shadow-none"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">
                {passengers} {passengers === 1 ? "Passenger" : "Passengers"}
              </span>
              <span className="text-xs text-muted-foreground">{travelClass}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Passengers</h4>
              <div className="flex items-center justify-between">
                <span>Number of passengers</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePassengerChange(passengers - 1)}
                    disabled={passengers <= 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{passengers}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePassengerChange(passengers + 1)}
                    disabled={passengers >= 9}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Travel Class</h4>
              <Select
                value={travelClass}
                onValueChange={handleClassChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economy">Economy</SelectItem>
                  <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="First">First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full" 
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default TravelClassSelector;