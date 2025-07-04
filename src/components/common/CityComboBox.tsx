"use client";

import * as React from "react";
import { useState } from "react";
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

interface City {
  code: string;
  name: string;
  city: string;
  country: string;
}

interface CityComboBoxProps {
  placeholder: string;
  onSelect: (city: City) => void;
  value?: City;
  options?: City[];
  loading?: boolean;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

const CityComboBox = ({
  placeholder,
  onSelect,
  value,
  options = [],
  loading = false,
  searchTerm = "",
  setSearchTerm = () => {},
}: CityComboBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border border-neutral-200 p-2 rounded-md"
        >
          <div className="flex items-center gap-2">
            <MapPinIcon size={24} />
            {value ? (
              <div className="flex flex-col items-start">
                <span className="font-medium">{value.city}</span>
                <span className="text-xs text-muted-foreground">
                  {value.country}
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
            placeholder="Search city..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {loading && (
              <div className="py-6 text-center text-sm">Loading...</div>
            )}
            {!loading && options.length === 0 && searchTerm.length >= 2 && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}
            {!loading && options.length > 0 && (
              <CommandGroup>
                {options.map((city) => (
                  <CommandItem
                    key={city.code}
                    value={city.code}
                    onSelect={() => {
                      onSelect(city);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.code === city.code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{city.city}</span>
                      <span className="text-xs text-muted-foreground">
                        {city.country}
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

export default CityComboBox;
