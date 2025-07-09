"use client";
import ActivitiesCard from "@/components/common/ActivitiesCard";
import FlightCard from "@/components/common/FlightCard";
import HotelCard from "@/components/common/HotelCard";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  AirplaneInFlightIcon,
  CalendarBlankIcon,
  RoadHorizonIcon,
  WarehouseIcon,
} from "@phosphor-icons/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSavedItemsStore } from "@/store/useSavedItemsStore";

const Home = () => {
  const savedFlights = useSavedItemsStore((s) => s.flights);
  const savedHotels = useSavedItemsStore((s) => s.hotels);
  const savedActivities = useSavedItemsStore((s) => s.activities);

  return (
    <div className="flex-1 bg-white rounded-md p-4 lg:p-8">
      {/* BANNER */}
      <div className="relative w-full h-[120px] sm:h-[150px] rounded-md overflow-hidden">
        <Image
          src="/banner.png"
          fill
          alt="banner image"
          className="absolute w-full h-full object-center "
        />
      </div>

      {/* TRIP INFO */}
      <div>
        {/* TRIP TIMELINE */}
        <div className="flex w-fit items-center text-xs sm:text-sm gap-1 font-bold mt-4 lg:mt-5 py-2 px-3 bg-[#fef4e6] text-[#7a4504] rounded-md">
          <span>
            <CalendarBlankIcon size={16} className="sm:w-5 sm:h-5" />
          </span>
          <span>21 March 2024</span>
          <span>
            <ArrowRight size={16} className="sm:w-5 sm:h-5" />
          </span>
          <span>21 April 2024</span>
        </div>

        {/* TRIP NAME */}
        <h2 className="font-semibold text-xl sm:text-2xl py-2 text-black">
          Bahamas Family Trip
        </h2>

        {/* TRIP LOCATION / TYPE */}
        <p className="flex flex-col sm:flex-row sm:items-center sm:divide-x-2 sm:divide-neutral-300 font-medium text-sm">
          <span className="sm:pr-2">New York, United States of America</span>
          <span className="sm:pl-2">Solo Trip</span>
        </p>
      </div>

      {/* TRIP PLANNER */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-5">
        <Card className="shadow-none border-none text-base sm:text-lg bg-[#000031] text-white p-4 sm:p-5 rounded-md flex-1">
          <CardTitle className="font-semibold text-sm sm:text-base">
            Activities
          </CardTitle>
          <CardContent className="p-0 text-sm">
            Build, personalize, and optimize your itineraries with our trip
            planner.
          </CardContent>
          <CardFooter className="p-0 mt-3">
            <Link
              href="/activity"
              className="bg-primary w-full p-2 rounded-md text-center text-xs sm:text-sm font-medium"
            >
              Add Activities
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-none border-none text-base sm:text-lg bg-[#e7f0ff] text-black p-4 sm:p-5 rounded-md flex-1">
          <CardTitle className="font-semibold text-sm sm:text-base">
            Hotels
          </CardTitle>
          <CardContent className="p-0 text-sm">
            Build, personalize, and optimize your itineraries with our trip
            planner.
          </CardContent>
          <CardFooter className="p-0 mt-3">
            <Link
              href="/hotel"
              className="bg-primary text-white w-full p-2 rounded-md text-center text-xs sm:text-sm font-medium"
            >
              Add Hotels
            </Link>
          </CardFooter>
        </Card>
        <Card className="shadow-none border-none text-base sm:text-lg bg-primary text-white p-4 sm:p-5 rounded-md flex-1">
          <CardTitle className="font-semibold text-sm sm:text-base">
            Flights
          </CardTitle>
          <CardContent className="p-0 text-sm">
            Build, personalize, and optimize your itineraries with our trip
            planner.
          </CardContent>
          <CardFooter className="p-0 mt-3">
            <Link
              href="/flight"
              className="bg-white w-full text-primary p-2 rounded-md text-center text-xs sm:text-sm font-medium"
            >
              Add Flights
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* TRIP ITINERY INFO */}
      <div className="space-y-1 mt-16 lg:mt-24">
        <p className="font-bold text-base sm:text-lg text-black">
          Trip itineraries
        </p>
        <p className="text-sm">Your trip itineraries are placed here</p>
      </div>

      {/* Flight Info */}
      <div className="text-black bg-neutral-100 mt-7 px-4 sm:px-6 py-4 rounded-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-medium flex items-center gap-1">
            <span>
              <AirplaneInFlightIcon size={20} className="sm:w-6 sm:h-6" />
            </span>
            Flights
          </p>
          <Link
            href="/flight"
            className="text-primary bg-white font-medium hover:bg-primary hover:text-white cursor-pointer p-2 rounded-md text-xs sm:text-sm self-start sm:self-auto"
          >
            Add Flights
          </Link>
        </div>
        {savedFlights.length === 0 && (
          <p className="text-gray-500 mb-8 text-sm">No saved flights.</p>
        )}
        <div className="space-y-3 mt-4">
          {savedFlights.map((f) => {
            const flight = f.data;
            const firstSegment = flight.segments?.[0];
            const lastSegment = flight.segments?.[flight.segments.length - 1];
            const airline =
              firstSegment?.carriersData?.[0]?.name || "Unknown Airline";
            const priceObj = flight.priceBreakdown?.total;
            const price = priceObj ? priceObj.units + priceObj.nanos / 1e9 : 0;
            const flightClass =
              firstSegment?.legs?.[0]?.cabinClass || "Economy";
            const departure = firstSegment?.departureTime;
            const returnDate = lastSegment?.arrivalTime;
            return (
              <FlightCard
                key={f.id}
                airline={airline}
                price={price}
                flightClass={flightClass}
                buttonType="cancel"
                departure={departure}
                returnDate={returnDate}
                onRemove={() =>
                  useSavedItemsStore.getState().removeFlight(f.id)
                }
              />
            );
          })}
        </div>
      </div>

      {/* HOTEL INFO */}
      <div className="bg-[#344054] px-4 sm:px-6 py-4 mt-4 rounded-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white font-bold flex items-center gap-1">
            <WarehouseIcon size={20} className="sm:w-6 sm:h-6" />
            <span>Hotels</span>
          </p>
          <Link
            href="/hotel"
            className="bg-white p-2 rounded-md text-[#344054] text-xs sm:text-sm font-medium self-start sm:self-auto"
          >
            Add Hotels
          </Link>
        </div>
        {savedHotels.length === 0 && (
          <p className="text-gray-300 text-sm">No saved hotels.</p>
        )}
        <div className="space-y-3 mt-4">
          {savedHotels.map((h) => {
            const hotel = h.data;
            const p = hotel.property;
            return (
              <HotelCard
                key={h.id}
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
                buttonType="cancel"
                onRemove={() => useSavedItemsStore.getState().removeHotel(h.id)}
              />
            );
          })}
        </div>
      </div>

      {/* ACTIVITIES INFO */}
      <div className="bg-primary px-4 sm:px-6 py-4 mt-4 rounded-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white font-bold flex items-center gap-1">
            <RoadHorizonIcon size={20} className="sm:w-6 sm:h-6" />
            <span>Activities</span>
          </p>
          <Link
            href="/activity"
            className="bg-white text-primary p-2 rounded-md text-xs sm:text-sm font-medium self-start sm:self-auto"
          >
            Add Activities
          </Link>
        </div>
        {savedActivities.length === 0 && (
          <p className="text-gray-300 text-sm">No saved activities.</p>
        )}
        <div className="space-y-3 mt-4">
          {savedActivities.map((a) => {
            const activity = a.data;
            const p = activity;
            return (
              <ActivitiesCard
                key={a.id}
                name={p.name}
                image={p.primaryPhoto.small || []}
                price={p.priceBreakdown?.grossPrice?.value || 0}
                currency={p.priceBreakdown?.grossPrice?.currency || ""}
                rating={p.combinedNumericStats.average}
                reviewCount={p.combinedNumericStats.total}
                buttonType="cancel"
                onRemove={() =>
                  useSavedItemsStore.getState().removeActivity(a.id)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
