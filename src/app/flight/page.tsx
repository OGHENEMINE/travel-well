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
import { useSavedItemsStore } from "@/store/useSavedItemsStore";
import { format } from "date-fns";

interface FlightFormData {
  origin?: Airport;
  destination?: Airport;
  dateRange?: DateRange;
  passengers: number;
  travelClass: string;
}

interface FlightOffer {
  token: string;
  segments?: Array<{
    carriersData?: Array<{ name: string }>;
    legs?: Array<{ cabinClass: string }>;
    departureTime?: string;
    arrivalTime?: string;
  }>;
  priceBreakdown?: {
    total?: {
      units: number;
      nanos: number;
    };
  };
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
      departDate: Date | string;
      returnDate: Date | string;
    }) =>
      searchFlightApi({
        fromId: params.fromId,
        toId: params.toId,
        cabinClass: params.cabinClass,
        departDate: params.departDate,
        returnDate: params.returnDate,
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

  const addFlight = useSavedItemsStore((s) => s.addFlight);
  const removeFlight = useSavedItemsStore((s) => s.removeFlight);
  const savedFlights = useSavedItemsStore((s) => s.flights);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.origin ||
      !formData.destination ||
      !formData.dateRange?.from ||
      !formData.dateRange?.to
    ) {
      toast.error("Please fill in all required fields");
      return;
    } else {
      mutation.mutate({
        fromId: formData.origin.id,
        toId: formData.destination.id,
        cabinClass: formData.travelClass,
        departDate: format(formData.dateRange.from, "yyyy-MM-dd"),
        returnDate: format(formData.dateRange.to, "yyyy-MM-dd"),
      });
    }
  };

  const swapAirports = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  console.log("form-data", formData);

  return (
    <div className="w-full">
      <div className="bg-white shadow rounded-md w-full h-fit p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl text-black font-semibold mb-4 lg:mb-5">
          Flight Search
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-6">
          <div>
            <p className="mb-2 font-medium text-sm lg:text-base">
              Destination:
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 w-full">
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
                className="rounded-full self-center"
              >
                <ArrowsLeftRightIcon size={20} className="lg:w-6 lg:h-6" />
              </Button>
              <div className="flex-1 w-full">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="mb-2 font-medium text-sm lg:text-base">
                Departure & Return:
              </p>
              <DateRangePicker
                onSelect={(dateRange) =>
                  setFormData((prev) => ({ ...prev, dateRange }))
                }
              />
            </div>
            <div>
              <p className="mb-2 font-medium text-sm lg:text-base">
                Passengers & Class:
              </p>
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
            disabled={
              mutation.isPending ||
              !formData.origin ||
              !formData.destination ||
              !formData.dateRange?.from ||
              !formData.dateRange?.to
            }
          >
            {mutation.isPending ? "Searching..." : "Search Flights"}
          </Button>
        </form>
      </div>
      <div className="mt-4 lg:mt-6 space-y-3">
        {mutation.data &&
          Array.isArray(mutation.data.data.flightOffers) &&
          mutation.data.data.flightOffers.map((flight: FlightOffer) => {
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
                buttonType={
                  savedFlights.some((f) => f.id === flight.token)
                    ? "cancel"
                    : "add"
                }
                departure={departure}
                returnDate={returnDate}
                onAdd={() => addFlight({ id: flight.token, data: flight })}
                onRemove={() => removeFlight(flight.token)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Flight;
