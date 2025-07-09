import { Card } from "../ui/card";
import { ClockClockwiseIcon, MapPinIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ImageCarousel } from "./ImageCarousel";
import { Star } from "lucide-react";

const ActivitiesCard = ({
  name,
  image,
  price,
  currency,
  rating,
  reviewCount,
  buttonType = "add",
  onRemove,
  onAdd
}: {
  name: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: string;
  buttonType: string;
  onRemove: () => void;
  onAdd?: () => void;
}) => {
  return (
    <Card className="shadow-none p-0 border-none mt-6 rounded-sm text-muted">
      <div className="flex items-center flex-col md:flex-row gap-2">
        {/* Image Section */}
        <div className="relative ">
          <ImageCarousel images={[image, image, image]} />
        </div>

        {/* Content Section */}
        <div className="flex-1 flex">
          <div className="divide-y flex-1">
            <div className="flex-1 flex gap-3 justify-between pr-4 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-0.5">
                  {name}
                </h2>
                <p className="font-medium flex items-start gap-1 text-sm mb-3">
                  Works from Van Gogh to Warhol & beyond plus a sculpture
                  garden, 2 cafes & The modern restaurant
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <MapPinIcon size={24} /> <span>Directions</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <Star
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-medium">
                      {rating}({reviewCount})
                    </span>
                  </div>
                  <p className="flex items-center gap-1 text-sm font-medium">
                    <ClockClockwiseIcon size={20} />
                    <span>1 Hour</span>
                  </p>
                </div>
              </div>

              {/* Price Section */}
              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1 text-nowrap">
                  {currency}
                  {price}
                </div>
                <div className="text-sm mb-1">Total Price: NGN 560,000</div>
                <div className="text-xs">1 room x 10 nights incl. taxes</div>
              </div>
            </div>

            <div className="flex items-center gap-3 font-medium  pr-4 py-6">
              <span className="text-sm ">What&apos;s Included:</span>
              <p className="flex items-center gap-2 text-sm ">
                Admission to the Empire State Building
              </p>
              <Link
                href="#"
                className="flex items-center gap-2 text-sm text-primary"
              >
                See more
              </Link>
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
            onClick={buttonType === "cancel" ? onRemove : onAdd}
            className={`h-auto w-10 rounded-none  cursor-pointer ${
              buttonType === "cancel"
                ? "text-destructive bg-destructive/10 hover:bg-destructive hover:text-white"
                : "text-white bg-primary"
            }`}
          >
            <XIcon size={32} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ActivitiesCard;
