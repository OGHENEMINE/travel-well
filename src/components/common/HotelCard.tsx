import { Card } from "../ui/card";
import {
  BedIcon,
  CalendarBlankIcon,
  MapPinIcon,
  SwimmingPoolIcon,
  WineIcon,
  X,
  PlusIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ImageCarousel } from "./ImageCarousel";
import { Star } from "lucide-react";

interface HotelCardProps {
  name: string;
  address?: string;
  images: string[];
  price: number;
  currency: string;
  rating?: number;
  reviewCount?: number;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  onAdd?: () => void;
  onRemove?: () => void;
  buttonType?: "add" | "cancel";
}

const HotelCard = ({
  name,
  address,
  images,
  price,
  currency,
  rating,
  reviewCount,
  roomType,
  checkIn,
  checkOut,
  onAdd,
  onRemove,
  buttonType = "cancel",
}: HotelCardProps) => {
  return (
    <Card className="shadow-none p-0 border-none mt-6 rounded-sm text-muted">
      <div className="flex items-center flex-col md:flex-row gap-2">
        {/* Image Section */}
        <div className="relative ">
          <ImageCarousel images={images} />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex ">
          <div className="divide-y flex-1">
            <div className="flex-1 flex justify-between gap-3 pr-4 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-0.5">
                  {name}
                </h2>
                {address && (
                  <p className="font-medium flex items-start gap-1 text-sm text-muted mb-3">
                    {address}
                  </p>
                )}
                <div className="flex items-center gap-4 mb-4 text-muted">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <MapPinIcon size={24} /> <span>Show in map</span>
                  </button>
                  {rating !== undefined && (
                    <div className="flex items-center gap-1">
                      <Star
                        size={20}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-medium">{rating}</span>
                      {reviewCount !== undefined && (
                        <span className="text-sm">({reviewCount})</span>
                      )}
                    </div>
                  )}
                  {roomType && (
                    <p className="flex items-center gap-1 text-sm font-medium">
                      <BedIcon size={24} />
                      <span>{roomType}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {currency} {price.toLocaleString()}
                </div>
                {/* Add more price details if needed */}
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
                {checkIn && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarBlankIcon size={20} />
                    <span>Check In: {checkIn}</span>
                  </div>
                )}
                {checkOut && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarBlankIcon size={20} />
                    <span>Check Out: {checkOut}</span>
                  </div>
                )}
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
          <Button
            className={`h-auto w-10 rounded-none text-destructive bg-destructive/10 hover:bg-destructive hover:text-white cursor-pointer ${
              buttonType === "add" ? "bg-primary text-white" : ""
            }`}
            onClick={buttonType === "add" ? onAdd : onRemove}
          >
            {buttonType === "add" ? <PlusIcon size={32} /> : <X size={32} />}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
