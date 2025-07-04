"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { searchHotelApi, searchHotelLocationApi } from "@/api/hotelApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import CityComboBox from "@/components/common/CityComboBox";
import DateRangePicker from "@/components/common/DateRangePicker";
import RoomTypeSelector from "@/components/common/RoomTypeSelector";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import HotelCard from "@/components/common/HotelCard";
import type { HotelProperty } from "@/api/hotelApi";
import { useSavedItemsStore } from "@/store/useSavedItemsStore";
import { format } from "date-fns";

interface City {
  code: string;
  name: string;
  city: string;
  country: string;
}

interface HotelFormData {
  destination?: City;
  dateRange?: DateRange;
  guests: number;
  roomType: string;
}

interface HotelSearchParams {
  dest_id: string;
  room_qty: number;
  arrival_date: string;
  departure_date: string;
}

const Hotel = () => {
  const [formData, setFormData] = useState<HotelFormData>({
    destination: undefined,
    dateRange: undefined,
    guests: 1,
    roomType: "Standard",
  });
  const mutation = useMutation({
    mutationFn: (params: HotelSearchParams) => searchHotelApi(params),
    onSuccess: (response) => {
      console.log("Search results:", response.data);
      toast.success("Hotel search successful! Check console for results.");
    },
    onError: (error) => {
      console.error("Error searching hotels:", error);
      toast.error("Failed to search hotels. Please try again.");
    },
  });
  const [citySearch, setCitySearch] = useState("");
  // Debounced city search
  const { data: cityData, isLoading: cityLoading } = useQuery({
    queryKey: ["hotel-cities", citySearch],
    queryFn: () =>
      citySearch.length >= 2 ? searchHotelLocationApi(citySearch) : null,
    enabled: citySearch.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
  const addHotel = useSavedItemsStore((s) => s.addHotel);
  const removeHotel = useSavedItemsStore((s) => s.removeHotel);
  const savedHotels = useSavedItemsStore((s) => s.hotels);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.destination ||
      !formData.dateRange?.from ||
      !formData.dateRange?.to
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    mutation.mutate({
      dest_id: formData.destination.code,
      room_qty: 1,
      arrival_date: format(formData.dateRange.from, "yyyy-MM-dd"),
      departure_date: format(formData.dateRange.to, "yyyy-MM-dd"),
    });
  };

  return (
    <div className="bg-white shadow rounded-md w-full h-fit p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl text-black font-semibold mb-4 lg:mb-5">
        Hotel Search
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-6">
        <div>
          <p className="mb-2 font-medium text-sm lg:text-base">Destination:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <CityComboBox
                placeholder="Where are you going?"
                value={formData.destination}
                onSelect={(city) =>
                  setFormData((prev) => ({ ...prev, destination: city }))
                }
                searchTerm={citySearch}
                setSearchTerm={setCitySearch}
                options={Array.isArray(cityData?.data) ? cityData.data : []}
                loading={cityLoading}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="mb-2 font-medium text-sm lg:text-base">
              Check-in & Check-out:
            </p>
            <DateRangePicker
              onSelect={(dateRange) =>
                setFormData((prev) => ({ ...prev, dateRange }))
              }
            />
          </div>
          <div>
            <p className="mb-2 font-medium text-sm lg:text-base">
              Guests & Room Type:
            </p>
            <RoomTypeSelector
              onSelect={({ guests, roomType }) =>
                setFormData((prev) => ({
                  ...prev,
                  guests,
                  roomType,
                }))
              }
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={
            mutation.isPending || !formData.destination || !formData.dateRange
          }
        >
          {mutation.isPending ? "Searching..." : "Search Hotels"}
        </Button>
      </form>
      <div className="mt-4 lg:mt-6 space-y-3">
        {mutation.data &&
          Array.isArray(mutation.data.data.hotels) &&
          mutation.data.data.hotels.map((hotel: HotelProperty) => {
            const p = hotel.property;
            return (
              <HotelCard
                key={p.id}
                name={p.name}
                address={undefined}
                images={p.photoUrls || []}
                price={p.priceBreakdown?.grossPrice?.value || 0}
                currency={p.priceBreakdown?.grossPrice?.currency || ""}
                rating={p.reviewScore}
                reviewCount={p.reviewCount}
                roomType={undefined}
                checkIn={p.checkinDate}
                checkOut={p.checkoutDate}
                buttonType={
                  savedHotels.some((h) => h.id === p.id.toString())
                    ? "cancel"
                    : "add"
                }
                onAdd={() => addHotel({ id: p.id.toString(), data: hotel })}
                onRemove={() => removeHotel(p.id.toString())}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Hotel;
