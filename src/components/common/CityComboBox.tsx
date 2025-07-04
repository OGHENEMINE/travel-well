"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { MapPinIcon, Buildings } from "@phosphor-icons/react";

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
}

const CityComboBox = ({
  placeholder,
  onSelect,
  value,
}: CityComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setCities([]);
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
        // This is a mock API call - replace with your actual API endpoint
        const response = await axios.get(`/api/cities?search=${searchTerm}`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        // For demo purposes, provide some mock data
        setCities([
          { code: "LON", name: "London", city: "London", country: "United Kingdom" },
          { code: "NYC", name: "New York City", city: "New York", country: "United States" },
          { code: "PAR", name: "Paris", city: "Paris", country: "France" },
          { code: "DXB", name: "Dubai", city: "Dubai", country: "United Arab Emirates" },
          { code: "SYD", name: "Sydney", city: "Sydney", country: "Australia" },
          { code: "TOK", name: "Tokyo", city: "Tokyo", country: "Japan" },
          { code: "ROM", name: "Rome", city: "Rome", country: "Italy" },
          { code: "SIN", name: "Singapore", city: "Singapore", country: "Singapore" },
          { code: "BCN", name: "Barcelona", city: "Barcelona", country: "Spain" },
          { code: "HKG", name: "Hong Kong", city: "Hong Kong", country: "China" },
        ].filter(city => 
          city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.code.toLowerCase().includes(searchTerm.toLowerCase())
        ));
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
                <span className="text-xs text-muted-foreground">{value.country}</span>
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
            {!loading && cities.length === 0 && searchTerm.length >= 2 && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}
            {!loading && cities.length > 0 && (
              <CommandGroup>
                {cities.map((city) => (
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
                      <span className="text-xs text-muted-foreground">{city.country}</span>
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