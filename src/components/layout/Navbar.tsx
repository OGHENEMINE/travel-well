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
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const PATH = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="py-4 lg:py-[39px] max-w-7xl mx-auto px-4 lg:px-0">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* LOGO AND SEARCH BAR */}
          <div className="flex items-center gap-7">
            <Image src="/logo.svg" width={58} height={56} alt="Logo" />

            {/* SEARCH COMPONENT */}
            <div className="flex items-center gap-x-2 bg-neutral-100 p-3 rounded-md min-w-96">
              <MagnifyingGlassIcon size={24} />
              <Input
                name="search"
                placeholder="Search"
                className="shadow-none border-none focus:outline-none focus-visible:ring-ring/0 p-0 font-medium text-base"
              />
            </div>
          </div>

          {/* NAVLINKS */}
          <div className="flex items-center divide-x-2 divide-neutral-300">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-6 pr-5">
              <Link
                href="/"
                className={`flex flex-col gap-2 items-center text-sm font-medium hover:text-black ${
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
                className={`flex flex-col gap-2 items-center text-sm font-medium hover:text-black ${
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
                className={`flex flex-col gap-2 items-center text-sm font-medium hover:text-black ${
                  PATH === "/wallet" ? "text-foreground" : ""
                }`}
              >
                <WalletIcon size={32} />
                <span>Wallet</span>
              </Link>
              <Link
                href="/"
                className={`flex flex-col gap-2 items-center text-sm font-medium hover:text-black ${
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
                className={`flex flex-col gap-2 items-center text-sm font-medium hover:text-black ${
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
            <ul className="flex items-center gap-6 pl-5">
              <Button className="bg-blue-400">Suscribe</Button>
              <Link
                href="#"
                className="text-sm flex flex-col gap-2 items-center font-medium"
              >
                <span>
                  <BellIcon size={32} />
                </span>
                <span>Notification</span>
              </Link>
              <Link
                href="#"
                className="text-sm flex flex-col gap-2 items-center font-medium"
              >
                <span>
                  <BasketIcon size={32} />
                </span>
                <span>carts</span>
              </Link>
              <Link
                href="#"
                className="text-sm flex flex-col gap-2 items-center font-medium"
              >
                <span>
                  <PlusSquareIcon size={32} />
                </span>
                <span>create</span>
              </Link>
            </ul>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <Image src="/logo.svg" width={40} height={38} alt="Logo" />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="mt-4">
            <div className="flex items-center gap-x-2 bg-neutral-100 p-3 rounded-md">
              <MagnifyingGlassIcon size={20} />
              <Input
                name="search"
                placeholder="Search"
                className="shadow-none border-none focus:outline-none focus-visible:ring-ring/0 p-0 font-medium text-sm"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 bg-white border rounded-lg shadow-lg p-4">
              <div className="space-y-4">
                <Link
                  href="/"
                  className={`flex items-center gap-3 text-sm font-medium hover:text-black ${
                    PATH === "/" ? "text-foreground" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HouseIcon size={24} />
                  <span>Home</span>
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-3 text-sm font-medium hover:text-black ${
                    PATH === "/dashboard" ? "text-foreground" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ChartPieIcon size={24} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-3 text-sm font-medium hover:text-black ${
                    PATH === "/wallet" ? "text-foreground" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <WalletIcon size={24} />
                  <span>Wallet</span>
                </Link>
                <Link
                  href="/"
                  className={`flex items-center gap-3 text-sm font-medium hover:text-black ${
                    PATH === "/" ? "text-foreground" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ListChecksIcon size={24} />
                  <span>Plan a trip</span>
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-3 text-sm font-medium hover:text-black ${
                    PATH === "/commission" ? "text-foreground" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HandCoinsIcon size={24} />
                  <span>Commission for life</span>
                </Link>
                <div className="border-t pt-4 space-y-3">
                  <Button className="bg-blue-400 w-full">Suscribe</Button>
                  <Link
                    href="#"
                    className="flex items-center gap-3 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BellIcon size={24} />
                    <span>Notification</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BasketIcon size={24} />
                    <span>Carts</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <PlusSquareIcon size={24} />
                    <span>Create</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
