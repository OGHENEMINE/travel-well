"use client";

import { useState, useRef, useEffect } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { Attraction, searchActivityLocationApi } from "@/api/activityApi";
import { toast } from "sonner";

interface AttractionComboBoxProps {
  placeholder: string;
  onSelect: (attraction: Attraction) => void;
  value?: Attraction;
  options?: Attraction[];
  loading?: boolean;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

const AttractionComboBox = ({
  placeholder,
  onSelect,
  value,
  options = [],
  loading = false,
}: //   searchTerm = "",
//   setSearchTerm = () => {},
AttractionComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce search term
  useEffect(() => {
    if (searchTerm.length < 2) {
      setDebouncedSearchTerm("");
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout to debounce the search
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Use React Query to fetch airports
  const { data, isLoading, isError } = useQuery({
    queryKey: ["activities", debouncedSearchTerm],
    queryFn: () => searchActivityLocationApi(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Show error toast if query fails
  useEffect(() => {
    if (isError) {
      toast.error("Error fetching activities");
    }
  }, [isError]);

  const activities = data?.data || [];

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
                <span className="font-medium">{value.cityName}</span>
                <span className="text-xs text-muted-foreground">
                  {value.countryCode}
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
            placeholder="Search attraction..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {loading && (
              <div className="py-6 text-center text-sm">Loading...</div>
            )}
            {!loading && options.length === 0 && searchTerm.length >= 2 && (
              <CommandEmpty>No attraction found.</CommandEmpty>
            )}
            {!loading && options.length > 0 && (
              <CommandGroup>
                {activities.map((activity) => (
                  <CommandItem
                    key={activity.id}
                    value={activity.id}
                    onSelect={() => {
                      onSelect(activity);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.id === activity.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{activity.cityName}</span>
                      <span className="text-xs text-muted-foreground">
                        {activity.countryCode}
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

export default AttractionComboBox;
