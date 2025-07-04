"use client";

import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { MapPinIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { searchLocation } from "@/app/flight/action";

export interface Airport {
  id: string;
  photoUri: string;
  regionName: string;
  code: string;
  countryName: string;
  city: string;
  country: string;
}

interface AirportComboBoxProps {
  placeholder: string;
  onSelect: (airport: Airport) => void;
  value?: Airport;
}

const AirportComboBox = ({
  placeholder,
  onSelect,
  value,
}: AirportComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setAirports([]);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout to debounce the search
    searchTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await searchLocation(searchTerm);
        console.log(response.data);
        setAirports(response.data);
      } catch (error) {
        console.error("Error fetching airports:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  console.log("airp",airports)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between shadow-none"
        >
          <div className="flex items-center gap-2">
            <MapPinIcon size={24} />
            {value ? (
              <div className="flex flex-col items-start">
                <span className="font-medium">{value.city}</span>
                <span className="text-xs text-muted-foreground">
                  {value.code} - {value.regionName}
                </span>
              </div>
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search airport..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {loading && (
              <div className="py-6 text-center text-sm">Loading...</div>
            )}
            {!loading && airports.length === 0 && searchTerm.length >= 2 && (
              <CommandEmpty>No airports found.</CommandEmpty>
            )}
            {!loading && airports.length > 0 && (
              <CommandGroup>
                {airports?.map((airport) => (
                  <CommandItem
                    key={airport.id}
                    value={airport.code}
                    onSelect={() => {
                      onSelect(airport);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.code === airport.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>
                        {airport.city} ({airport.code})
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {airport.regionName}, {airport.country}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AirportComboBox;
