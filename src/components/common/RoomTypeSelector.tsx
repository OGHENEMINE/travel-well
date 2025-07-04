"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { UsersThreeIcon, BedIcon } from "@phosphor-icons/react";

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

interface RoomTypeSelectorProps {
  className?: string;
  onSelect?: (data: { guests: number; roomType: string }) => void;
}

export function RoomTypeSelector({
  className,
  onSelect,
}: RoomTypeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState("Standard");

  const handleGuestsChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 9) {
      setGuests(newCount);
      if (onSelect) {
        onSelect({ guests: newCount, roomType });
      }
    }
  };

  const handleRoomTypeChange = (value: string) => {
    setRoomType(value);
    if (onSelect) {
      onSelect({ guests, roomType: value });
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
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </span>
              <span className="text-xs text-muted-foreground">{roomType} Room</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Guests</h4>
              <div className="flex items-center justify-between">
                <span>Number of guests</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleGuestsChange(guests - 1)}
                    disabled={guests <= 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleGuestsChange(guests + 1)}
                    disabled={guests >= 9}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Room Type</h4>
              <Select
                value={roomType}
                onValueChange={handleRoomTypeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                  <SelectItem value="Presidential Suite">Presidential Suite</SelectItem>
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

export default RoomTypeSelector;