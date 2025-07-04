"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import {
  HandCoinsIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  ChartPieIcon,
  WalletIcon,
  BellIcon,
  BasketIcon,
  PlusSquareIcon,
  ListChecksIcon,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const PATH = usePathname();
  return (
    <nav className="w-full bg-white">
      <div className="py-[39px] max-w-7xl mx-auto flex max-sm:flex-col items-center justify-between">
        {/* LOGO AND SEARCH BAR */}
        <div className="flex items-center gap-7">
          <Image src="/logo.svg" width={58} height={56} alt="Logo" />

          {/* SEARCH COMPONENT */}
          <div className="flex items-center gap-x-2 bg-neutral-100 p-3 rounded-md md:min-w-96 w-full">
            <MagnifyingGlassIcon size={24} />
            <Input
              name="search"
              placeholder="Search"
              className="shadow-none border-none focus:outline-none focus-visible:ring-ring/0 p-0 font-medium text-base"
            />
          </div>
        </div>

        {/* NAVLINKS */}
        <div className="flex max-sm:flex-col items-center md:divide-x-2 md:divide-neutral-300">
          {/* LEFT SIDE */}
          <div className="flex max-sm:flex-col md:items-center gap-6 md:pr-5">
            <Link
              href="/"
              className={`flex md:flex-col gap-2 items-center text-sm font-medium hover:text-black ${
                PATH === "/" ? "text-foreground" : ""
              }`}
            >
              <span>
                <HouseIcon size={32} />
              </span>
              <span>Home</span>
            </Link>
            <Link
              href="#"
              className={`flex md:flex-col gap-2 items-center text-sm font-medium hover:text-black ${
                PATH === "/dashboard" ? "text-foreground" : ""
              }`}
            >
              <span>
                <ChartPieIcon size={32} />
              </span>
              <span> Dashboard</span>
            </Link>
            <Link
              href="#"
              className={`flex md:flex-col gap-2 items-center text-sm font-medium hover:text-black ${
                PATH === "/wallet" ? "text-foreground" : ""
              }`}
            >
              <WalletIcon size={32} />
              <span>Wallet</span>
            </Link>
            <Link
              href="/"
              className={`flex md:flex-col gap-2 items-center text-sm font-medium hover:text-black ${
                PATH === "/" ? "text-foreground" : ""
              }`}
            >
              <span>
                <ListChecksIcon size={32} />
              </span>
              <span>Plan a trip</span>
            </Link>
            <Link
              href="#"
              className={`flex md:flex-col gap-2 items-center text-sm font-medium hover:text-black ${
                PATH === "/commission" ? "text-foreground" : ""
              }`}
            >
              <span>
                <HandCoinsIcon size={32} />
              </span>
              <span>Commission for life</span>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <ul className="flex max-sm:flex-col md:items-center gap-6 pl-5">
            <Button className="bg-blue-400">Suscribe</Button>
            <Link
              href="#"
              className="text-sm flex lg:flex-col gap-2 items-center font-medium"
            >
              <span>
                <BellIcon size={32} />
              </span>
              <span>Notification</span>
            </Link>
            <Link
              href="#"
              className="text-sm flex lg:flex-col gap-2 items-center font-medium"
            >
              <span>
                <BasketIcon size={32} />
              </span>
              <span>carts</span>
            </Link>
            <Link
              href="#"
              className="text-sm flex lg:flex-col gap-2 items-center font-medium"
            >
              <span>
                <PlusSquareIcon size={32} />
              </span>
              <span>create</span>
            </Link>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
