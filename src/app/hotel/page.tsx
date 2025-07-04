import Image from "next/image";
import React from "react";

const Hotel = () => {
  return (
    <div className="flex-1">
      {/* BANNER */}
      <div className="relative w-full h-[150px] rounded-md z-0">
        <Image
          src="/banner.png"
          fill
          alt="banner image"
          className="absolute w-full h-full object-cover rounded-md"
        />

        {/* TEXT OVERLAY */}
        <div className="absolute z-20 top-0 left-0 p-10">
          <h1 className="text-black text-2xl font-bold">Hotels</h1>

          <form action=""></form>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
