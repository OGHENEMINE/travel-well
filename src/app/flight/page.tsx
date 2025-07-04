"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ArrowsLeftRightIcon } from "@phosphor-icons/react";
import AirportComboBox from "@/components/common/AirportComboBox";
import DateRangePicker from "@/components/common/DateRangePicker";
import TravelClassSelector from "@/components/common/TravelClassSelector";
import { Button } from "@/components/ui/button";
import FlightCard from "@/components/common/FlightCard";
import { Airport } from "@/components/common/AirportComboBox";
import { searchFlight } from "./action";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.origin ||
      !formData.destination ||
      !formData.dateRange?.from
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      
      const response = await searchFlight(formData.origin.id, formData.destination.id, formData.travelClass);
      console.log("Search results:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error searching flights:", error);
      setError("Failed to search flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const swapAirports = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  return (
    <div>
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

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md">{error}</div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md">
              Flight search successful! Check console for results.
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Searching..." : "Search Flights"}
          </Button>
        </form>
      </div>
      <div className="mt-6">
        <FlightCard buttonType="add"/>
      </div>
    </div>
  );
};

export default Flight;
