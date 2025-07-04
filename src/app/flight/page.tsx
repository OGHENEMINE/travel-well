"use client";
import DatePicker from "@/components/common/DatePicker";
import Sidebar from "@/components/layout/Sidebar";
import { Input } from "@/components/ui/input";
import { ArrowsLeftRightIcon, MapPinIcon } from "@phosphor-icons/react";

const Flight = () => {
  return (
    <div className="flex py-10 gap-16">
      <Sidebar />

      <div className="bg-white shadow rounded-md w-full h-fit p-4">
        <h2 className="text-xl text-black font-semibold mb-5">Flight</h2>
        <form action="" className="flex justify-between items-center">
          <div>
            <p className="mb-2 font-medium">Destination:</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 border border-neutral-200 p-2 rounded-md">
                <MapPinIcon size={30} />
                <Input
                  className="shadow-none border-none focus:outline-none focus-visible:ring-ring/0 p-0 font-medium text-base"
                  placeholder="From"
                />
              </div>
              <ArrowsLeftRightIcon size={24} />
              <div className="flex items-center gap-2 border border-neutral-200 p-2 rounded-md">
                <MapPinIcon size={30} />
                <Input
                  className="shadow-none border-none focus:outline-none focus-visible:ring-ring/0 p-0 font-medium text-base"
                  placeholder="To"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 font-medium">Departure & Return time:</p>
            <DatePicker />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Flight;
