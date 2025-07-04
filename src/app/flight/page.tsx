"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import AirportComboBox from "@/components/common/AirportComboBox";
import DateRangePicker from "@/components/common/DateRangePicker";
import TravelClassSelector from "@/components/common/TravelClassSelector";
import { Button } from "@/components/ui/button";
import FlightCard from "@/components/common/FlightCard";
import { Airport } from "@/components/common/AirportComboBox";
import { searchFlightApi } from "@/api/flightApi";
import { useMutation } from "@tanstack/react-query";

interface FlightFormData {
  origin?: Airport;
  destination?: Airport;
  dateRange?: DateRange;
  passengers: number;
  travelClass: string;
}

const Flight = () => {
  const [formData, setFormData] = useState<FlightFormData>({
    origin: undefined,
    destination: undefined,
    dateRange: undefined,
    passengers: 1,
    travelClass: "Economy",
  });
  const mutation = useMutation({
    mutationFn: (params: {
      fromId: string;
      toId: string;
      cabinClass: string;
    }) =>
      searchFlightApi({
        fromId: params.fromId,
        toId: params.toId,
        cabinClass: params.cabinClass,
      }),
    onSuccess: (response) => {
      console.log("Search results:", response.data);
      toast.success("Flight search successful! Check console for results.");
    },
    onError: (error) => {
      console.error("Error searching flights:", error);
      toast.error("Failed to search flights. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.origin ||
      !formData.destination ||
      !formData.dateRange?.from
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    mutation.mutate({
      fromId: formData.origin.id,
      toId: formData.destination.id,
      cabinClass: formData.travelClass,
    });
  };

  const swapAirports = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow rounded-md w-full h-fit p-6">
        <h2 className="text-xl text-black font-semibold mb-5">Flight Search</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <p className="mb-2 font-medium">Destination:</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <AirportComboBox
                  placeholder="From"
                  value={formData.origin}
                  onSelect={(airport) =>
                    setFormData((prev) => ({ ...prev, origin: airport }))
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={swapAirports}
                className="rounded-full"
              >
                <ArrowsLeftRightIcon size={24} />
              </Button>
              <div className="flex-1">
                <AirportComboBox
                  placeholder="To"
                  value={formData.destination}
                  onSelect={(airport) =>
                    setFormData((prev) => ({ ...prev, destination: airport }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 font-medium">Departure & Return:</p>
              <DateRangePicker
                onSelect={(dateRange) =>
                  setFormData((prev) => ({ ...prev, dateRange }))
                }
              />
            </div>
            <div>
              <p className="mb-2 font-medium">Passengers & Class:</p>
              <TravelClassSelector
                onSelect={({ passengers, travelClass }) =>
                  setFormData((prev) => ({ ...prev, passengers, travelClass }))
                }
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Searching..." : "Search Flights"}
          </Button>
        </form>
      </div>
      <div className="mt-6">
        {mutation.data &&
          Array.isArray(mutation.data.data.flightOffers) &&
          mutation.data.data.flightOffers.map((flight: any) => {
            // Extract airline name (first carrier in first segment)
            const firstSegment = flight.segments?.[0];
            const lastSegment = flight.segments?.[flight.segments.length - 1];
            const airline =
              firstSegment?.carriersData?.[0]?.name || "Unknown Airline";
            // Price: use total price (units + nanos)
            const priceObj = flight.priceBreakdown?.total;
            const price = priceObj ? priceObj.units + priceObj.nanos / 1e9 : 0;
            // Flight class: from first leg's cabinClass
            const flightClass =
              firstSegment?.legs?.[0]?.cabinClass || "Economy";
            // Departure: from first segment's departureTime
            const departure = firstSegment?.departureTime;
            // Return: from last segment's arrivalTime (for roundtrip)
            const returnDate = lastSegment?.arrivalTime;
            return (
              <FlightCard
                key={flight.token}
                airline={airline}
                price={price}
                flightClass={flightClass}
                buttonType="add"
                departure={departure}
                returnDate={returnDate}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Flight;
