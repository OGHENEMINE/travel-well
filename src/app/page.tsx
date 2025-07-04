"use client";
import ActivitiesCard from "@/components/common/ActivitiesCard";
import FlightCard from "@/components/common/FlightCard";
import HotelCard from "@/components/common/HotelCard";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  AirplaneInFlightIcon,
  CalendarBlankIcon,
  RoadHorizonIcon,
  WarehouseIcon,
} from "@phosphor-icons/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex py-10 gap-16">
      <Sidebar />

      <div className="flex-1 bg-white rounded-md p-8">
        {/* BANNER */}
        <div className="relative w-full h-[150px] aspect-square  rounded-md">
          <Image
            src="/banner.png"
            fill
            alt="banner image"
            className="absolute w-full h-full"
          />
        </div>

        {/* TRIP INFO */}
        <div>
          {/* TRIP TIMELINE */}
          <div className="flex w-fit items-center text-sm gap-1 font-bold mt-5 py-2 px-3 bg-[#fef4e6] text-[#7a4504]">
            <span>
              <CalendarBlankIcon size={20} />
            </span>
            <span>21 March 2024</span>
            <span>
              <ArrowRight size={20} />
            </span>
            <span>21 April 2024</span>
          </div>

          {/* TRIP NAME */}
          <h2 className="font-semibold text-2xl py-2 text-black">
            Bahamas Family Trip
          </h2>

          {/* TRIP LOCATION / TYPE */}
          <p className="flex items-center divide-x-2 divide-neutral-300 font-medium">
            <span className="pr-2">New York,  United States of America</span>
            <span className="pl-2">Solo Trip</span>
          </p>
        </div>

        {/* TRIP PLANNER */}
        <div className="flex items-center gap-1 mt-5">
          <Card className="shadow-none border-none text-lg bg-[#000031] text-white p-5 rounded-md">
            <CardTitle className="font-semibold">Activities</CardTitle>
            <CardContent className="p-0">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </CardContent>
            <CardFooter className="p-0">
              <Button className="w-full">Add Activities</Button>
            </CardFooter>
          </Card>
          <Card className="shadow-none border-none text-lg bg-[#e7f0ff] text-black p-5 rounded-md">
            <CardTitle className="font-semibold">Hotels</CardTitle>
            <CardContent className="p-0">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </CardContent>
            <CardFooter className="p-0">
              <Button className="w-full">Add Hotels</Button>
            </CardFooter>
          </Card>
          <Card className="shadow-none border-none text-lg bg-primary text-white p-5 rounded-md">
            <CardTitle className="font-semibold">Flights</CardTitle>
            <CardContent className="p-0">
              Build, personalize, and optimize your itineraries with our trip
              planner.
            </CardContent>
            <CardFooter className="p-0">
              <Button className="bg-white w-full text-primary">
                Add Flights
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* TRIP ITINERY INFO */}
        <div className="space-y-1 mt-24">
          <p className="font-bold text-lg text-black">Trip itineraries</p>
          <p>Your trip itineraries are placed here</p>
        </div>

        {/* Flight Info */}
        <div className="text-black bg-neutral-100 mt-7 px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="font-medium flex items-center gap-1">
              <span>
                <AirplaneInFlightIcon size={24} />
              </span>
              Flights
            </p>
            <Button className="text-primary bg-white font-bold hover:text-white cursor-pointer">
              Add Flights
            </Button>
          </div>
          <FlightCard />
        </div>

        {/* HOTEL INFO */}
        <div className="bg-[#344054] px-6 py-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-white font-bold flex items-center gap-1">
              <WarehouseIcon size={24} />
              <span>Hotels</span>
            </p>
            <Button>Add Hotels</Button>
          </div>
          <HotelCard />
        </div>

        {/* ACTIVITIES INFO */}
        <div className="bg-primary px-6 py-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-white font-bold flex items-center gap-1">
              <RoadHorizonIcon size={32} />
              <span>Activities</span>
            </p>
            <Button className="bg-white text-primary hover:bg-white">Add Activities</Button>
          </div>
          <ActivitiesCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
