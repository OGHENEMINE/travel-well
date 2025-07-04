"use client";
import { useState } from "react";
import Image from "next/image";
import { DateRange } from "react-day-picker";
import axios from "axios";
import Sidebar from "@/components/layout/Sidebar";
import CityComboBox from "@/components/common/CityComboBox";
import DateRangePicker from "@/components/common/DateRangePicker";
import RoomTypeSelector from "@/components/common/RoomTypeSelector";
import { Button } from "@/components/ui/button";

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

const Hotel = () => {
  const [formData, setFormData] = useState<HotelFormData>({
    destination: undefined,
    dateRange: undefined,
    guests: 1,
    roomType: "Standard",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.destination || !formData.dateRange?.from) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // This is a mock API call - replace with your actual API endpoint
      const response = await axios.post("/api/hotel-search", formData);
      console.log("Search results:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error searching hotels:", error);
      setError("Failed to search hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex py-10 gap-16">
      <Sidebar />

      <div className="bg-white shadow rounded-md w-full h-fit p-6">
        <h2 className="text-xl text-black font-semibold mb-5">Hotel Search</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <p className="mb-2 font-medium">Destination:</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <CityComboBox
                  placeholder="Where are you going?"
                  value={formData.destination}
                  onSelect={(city) => setFormData(prev => ({ ...prev, destination: city }))}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 font-medium">Check-in & Check-out:</p>
              <DateRangePicker 
                onSelect={(dateRange) => setFormData(prev => ({ ...prev, dateRange }))}
              />
            </div>
            <div>
              <p className="mb-2 font-medium">Guests & Room Type:</p>
              <RoomTypeSelector 
                onSelect={({ guests, roomType }) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    guests, 
                    roomType
                  }))
                }
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md">
              Hotel search successful! Check console for results.
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Hotels"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hotel;
