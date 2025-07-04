"use client";
import { Card, CardContent, CardFooter } from "../ui/card";
import ProfileAvatar from "../common/ProfileAvatar";
import {
  AirplaneTiltIcon, BuildingsIcon,
  FirstAidKitIcon,
  NewspaperClippingIcon,
  RoadHorizonIcon,
  StudentIcon,
  SuitcaseRollingIcon,
  CaretUpDownIcon
} from "@phosphor-icons/react";
import { PackageIcon } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="space-y-16">
      <Card className="shrink-0 w-full rounded-md border-none shadow-none text-muted">
        <CardContent>
          <div className="space-y-3">
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <RoadHorizonIcon size={32} />
              </span>
              <span>Activities</span>
            </Link>
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <BuildingsIcon size={32} />
              </span>
              <span>Hotels</span>
            </Link>
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <AirplaneTiltIcon size={32} />
              </span>
              <span>Flights</span>
            </Link>
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <StudentIcon size={32} />
              </span>
              <span>Study</span>
            </Link>
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <NewspaperClippingIcon size={32} />
              </span>
              <span>Visa</span>
            </Link>
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <SuitcaseRollingIcon size={32} />
              </span>
              <span>Immigration</span>
            </Link>
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <FirstAidKitIcon size={32} />
              </span>
              <span>Medical</span>
            </Link>
            <Link href="#" className="py-3 px-3.5 flex items-center gap-2 font-medium hover:text-primary text-nowrap">
              <span>
                <PackageIcon size={32} />
              </span>
              <span>Vacation packages</span>
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <div className="font-medium flex items-center gap-2 text-sm bg-neutral-100 rounded-md px-3.5 py-3">
            <ProfileAvatar className="w-12 h-12 bg-primary text-white font-bold rounded-sm" />
            <span>Personal Account</span>
            <CaretUpDownIcon size={24}/>
          </div>
        </CardFooter>
      </Card>
    </aside>
  );
};

export default Sidebar;
