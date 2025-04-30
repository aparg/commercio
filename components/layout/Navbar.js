"use client";

import React, { useState } from "react";
import { LucideBuilding, Menu } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import AnticipatedBottom from "@/components/AnticipatedBottom";
import Dropdown from "@/components/commercial/Dropdown";
import { usePathname } from "next/navigation";
import { generateURL } from "@/helpers/generateResaleURL";
import citiesWithProvinces from "@/constant/cities";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import UnifiedSearchBar from "@/components/UnifiedSearchBar";
import { preconCityList } from "@/data/preconCityList";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnticipated, setShowAnticipated] = useState(false);
  const pathname = usePathname();

  const cities = citiesWithProvinces.map((obj) => obj.city.toLowerCase());
  const cityName = cities.find((city) => !!pathname?.match(city));

  const buyOpts = [
    {
      name:
        "All businesses for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Retail Space for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "Retail",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Land for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "land",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Office for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "office",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Industrial Space for Sale" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "industrial",
        saleLeaseVal: "sale",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Price dropped businesses" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "sale",
        cityVal: cityName || null,
        priceDropped: true,
      }),
    },
  ];

  const rentOpts = [
    {
      name:
        "All businesses for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Retail Space for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "Retail",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Land for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "land",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Office for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "office",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Industrial Space for Lease" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        houseTypeVal: "industrial",
        saleLeaseVal: "lease",
        cityVal: cityName || null,
      }),
    },
    {
      name:
        "Price dropped businesses" +
        `${cityName ? ` in ${capitalizeFirstLetter(cityName)}` : ""}`,
      link: generateURL({
        saleLeaseVal: "lease",
        cityVal: cityName || null,
        priceDropped: true,
      }),
    },
  ];

  const preConstructionOpts = preconCityList.map((city) => ({
    name: `${city.city_name_cap}`,
    link: `/${city.city_name}`,
  }));

  // Function to get the pre-construction link based on current path
  const getPreConstructionLink = () => {
    // Check if we're in a resale page
    if (pathname.includes("/commercial/ontario")) {
      // Extract city name from path if it exists
      const pathParts = pathname.split("/");
      const cityIndex = pathParts.indexOf("ontario") + 1;

      // If there's no path after "ontario" or if it's "homes-for-sale", return main pre-construction page
      if (
        cityIndex >= pathParts.length ||
        pathParts[cityIndex] === "homes-for-sale"
      ) {
        return "/pre-construction-homes";
      }

      // If it's a specific city page, redirect to that city's pre-construction
      const city = pathParts[cityIndex];
      if (city && city !== "homes") {
        return `/${city}`;
      }
    }
    // Default to main pre-construction page
    return "/pre-construction-homes";
  };

  const resaleListingPage = pathname.includes("resale");
  const assignmentSalePage = pathname.includes("assignment-sale");
  return (
    <>
      <nav className={`flex items-center justify-between px-4 py-3 bg-white`}>
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center md:me-2">
              {/* <Image
                src="/canadaleaf.svg"
                alt="Maple Leaf Icon for Logo"
                width={20}
                height={20}
                className="hidden md:block"
              /> */}
              {/* <LucideBuilding width={20} height={20} /> */}
              <span className="text-sm md:text-2xl font-bold">commercio</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="#f00"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-store-icon lucide-store"
              >
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
              </svg>

              {/* <Image
                src="/canadaleaf.svg"
                alt="Maple Leaf Icon for Logo"
                width={15}
                height={15}
                className="block md:hidden"
              /> */}
            </Link>
          </div>

          {/* Search Section - Desktop */}
          <div className="hidden sm:block ml-4">
            <UnifiedSearchBar />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-7">
          <Dropdown
            name={`For Lease ${capitalizeFirstLetter(cityName) || ""}`}
            text={"red"}
            options={rentOpts}
            width="auto"
          />
          <Dropdown
            name={`For Sale ${capitalizeFirstLetter(cityName) || ""}`}
            text={"red"}
            options={buyOpts}
            width="auto"
          />

          <Link
            href="/blog"
            className="text-sm text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Blogs
          </Link>
          <Link
            href="/contact-us"
            className="text-sm text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Contact
          </Link>
          {/* <Image
            src="/cont.png"
            alt="Email Icon"
            width={150}
            height={30}
            className="cursor-pointer ml-1"
          /> */}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between gap-4">
          {/* Search Section - Mobile */}
          <div className="flex-1 max-w-xs mx-4 me-auto sm:hidden">
            <UnifiedSearchBar small={true} />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="flex flex-col py-3 mt-20">
                  <div className="px-6 py-4">
                    <Dropdown
                      name="For Lease"
                      text={"red"}
                      options={rentOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                    />
                  </div>
                  <div className="px-6 py-4">
                    <Dropdown
                      name="For Sale"
                      text={"red"}
                      options={buyOpts}
                      width="w-full"
                      className="!justify-start text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors py-2"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowAnticipated(true);
                    }}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors text-left flex items-center"
                  >
                    Trending
                    <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium ml-2">
                      New
                    </span>
                  </button>
                  <Link
                    href="/assignment-sale"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Assignment
                  </Link>
                  <Link
                    href="/contact-us"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <AnticipatedBottom
        isOpen={showAnticipated}
        onClose={() => setShowAnticipated(false)}
      />
    </>
  );
};

export default Navbar;
