import { Card } from "../ui/card";
import {
    BedIcon,
    CalendarBlankIcon,
    MapPinIcon, SwimmingPoolIcon,
    WineIcon,
    X
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ImageCarousel } from "./ImageCarousel";
import { Star } from "lucide-react";

const HotelCard = () => {
  return (
    <Card className="shadow-none p-0 border-none mt-6 rounded-sm text-muted">
      <div className="flex items-center flex-col md:flex-row gap-2">
        {/* Image Section */}
        <div className="relative ">
          <ImageCarousel images={["/hotel.png", "/hotel.png", "/hotel.png"]} />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex ">
          <div className="divide-y flex-1">
            <div className="flex-1 flex justify-between gap-3 pr-4 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-0.5">
                  Riviera Resort, Lekki
                </h2>
                <p className="font-medium flex items-start gap-1 text-sm text-muted mb-3">
                  18, Kensingkuru Street, Off Access Bank Admiralty Way, Lekki
                  Phase1
                </p>
                <div className="flex items-center gap-4 mb-4 text-muted">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <MapPinIcon size={24} /> <span>Show in map</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <Star
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-medium">8.5</span>
                    <span className="text-sm">(436)</span>
                  </div>
                  <p className="flex items-center gap-1 text-sm font-medium">
                    <BedIcon size={24} />
                    <span>King size room</span>
                  </p>
                </div>
              </div>

              {/* Price Section */}
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ₦ 123,450.00
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Total Price: NGN 560,000
                </div>
                <div className="text-xs text-gray-500">
                  1 room x 10 nights incl. taxes
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pr-4 py-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Facilities:</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <SwimmingPoolIcon size={20} />
                    <span className="text-sm">Pool</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <WineIcon size={20} />
                    <span className="text-sm">Bar</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarBlankIcon size={20} />
                  <span>Check In: 20-04-2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarBlankIcon size={20} />s
                  <span>Check Out: 29-04-2024</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 pr-4 text-primary font-medium">
              <div className="flex items-center gap-5">
                <Link href="#">Hotel details</Link>
                <Link href="#">Price details</Link>
              </div>
              <Link href="#">Edit details</Link>
            </div>
          </div>
          <Button className="h-auto w-10 rounded-none text-destructive bg-destructive/10 hover:bg-destructive hover:text-white cursor-pointer">
            <X size={32} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
