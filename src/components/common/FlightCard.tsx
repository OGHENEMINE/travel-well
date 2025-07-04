import React from "react";
import { Button } from "../ui/button";
import {
  FilmSlateIcon,
  ForkKnifeIcon,
  SuitcaseRollingIcon,
  UsbIcon,
  X,
} from "@phosphor-icons/react";
import {
  AirplaneLandingIcon,
  AirplaneTakeoffIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

const FlightCard = () => {
  return (
    <Card className="w-full border-none shadow-none rounded-md p-0 mt-6">
      <CardContent className="p-0 flex items-stretch">
        <div className="divide-y flex-1">
          {/* FLIGHT DETAILS */}
          <div className="flex items-center gap-10 px-4 py-6">
            <div className="flex items-center gap-2 shrink-0">
              <Image
                src="/american_airlines.svg"
                width={25}
                height={30}
                alt="american airline logo"
              />
              <div className="space-y-1">
                <p className="text-xl font-bold">American Airlines</p>
                <div className="flex items-center gap-2">
                  <p className="text-muted font-medium text-sm">AA-829</p>
                  <span> &bull; </span>
                  <Button className="bg-[#0A369D]">First class</Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-1">
              <div className="text-nowrap text-right">
                <p className="font-semibold text-xl">08:35</p>
                <p className="text-sm">Sun, 20 Aug</p>
              </div>

              <div className="relative bg-gray-100 w-full rounded-full h-1.5">
                <span className="absolute -top-7 left-0">
                  <AirplaneTakeoffIcon size={20} />
                </span>
                <span className="absolute -top-7 right-0">
                  <AirplaneLandingIcon size={20} />
                </span>
                <span className="absolute text-sm text-nowrap -top-7 left-1/2 -translate-x-1/2">
                  Duration: 1h 45m
                </span>
                <span className="bg-primary z-10 rounded-full h-full w-1/3 inline-block absolute top-0 left-1/2 -translate-x-1/2"></span>
                <span className="absolute text-sm text-nowrap -bottom-7 left-1/2 -translate-x-1/2">
                  Direct
                </span>
                <span className="absolute text-sm font-medium -bottom-7 left-0">
                  LOS
                </span>
                <span className="absolute text-sm font-medium -bottom-7 right-0">
                  SIN
                </span>
              </div>

              <div className="text-nowrap text-left">
                <p className="font-semibold text-xl">09:55</p>
                <p className="text-sm">Sun, 20 Aug</p>
              </div>
            </div>

            <p className="text-xl font-bold">123,450.00</p>
          </div>
          {/* FLIGHT OFFERS */}
          <div className="flex items-center gap-3 text-muted font-medium text-sm px-4 py-6 ">
            <p>Facilities:</p>
            <p className="flex items-center gap-2">
              <SuitcaseRollingIcon size={24} />
              <span>Baggage: 20kg, Cabin Baggage: 8kg</span>
            </p>
            <p className="flex items-center gap-2">
              <FilmSlateIcon size={24} />
              <span>In flight entertainment</span>
            </p>
            <p className="flex items-center gap-2">
              <ForkKnifeIcon size={24} />
              <span>In flight meal</span>
            </p>
            <p className="flex items-center gap-2">
              <UsbIcon size={24} /> <span>USB Port</span>
            </p>
          </div>
          {/* ACTIONS */}
          <div className="flex items-center justify-between p-4 text-primary font-medium">
            <div className="space-x-5">
              <Link href="#">Flight details</Link>
              <Link href="#">Price details</Link>
            </div>
            <Link href="#">Edit details</Link>
          </div>
        </div>

        {/* CANCEL BUTTON */}
        <Button className="h-auto w-10 rounded-none text-destructive bg-destructive/10 hover:bg-destructive hover:text-white cursor-pointer">
          <X size={32} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
