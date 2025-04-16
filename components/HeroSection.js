"use client";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useState } from "react";
import UnifiedSearchBar from "@/components/UnifiedSearchBar";
import { generateURL } from "@/helpers/generateResaleURL";
import LastSearchSection from "./commercial/LastSearchSection";

const popularCities = [
  "Toronto",
  "Milton",
  "Mississauga",
  "Milton",
  "Etobicoke",
  "Brampton",
  "Markham",
  "Vaughan",
  "Edmonton",
];

const HeroSection = () => {
  const [isResale, setIsResale] = useState(true);
  return (
    <>
      <div className="min-h-[86vh] sm:mt-6 pb-8 relative bg-hero">
        {/* Mobile padding */}
        <div className="block md:hidden pt-4"></div>
        {/* Desktop padding */}
        <div className="hidden md:block pt-5"></div>

        <div className="container py-5 mt-[10rem] md:mt-[8rem]">
          <div className="mx-auto text-center px-4">
            <div className="flex flex-row space-x-0 justify-center items-center ">
              <div className="bg-white w-fit h-fit flex items-center">
                <span className="text-xs md:text-sm font-semibold">
                  commercio
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
              </div>
            </div>
            <div className="flex flex-col gap-x-3 justify-center md:mb-3">
              <h1 className="text-3xl md:text-2xl lg:text-5xl font-extrabold pb-0 text-black flex items-center justify-center gap-3">
                Canada's leading commercial space platform
                {/* <Image
                  src="/canadaleaf.svg"
                  alt="canada maple leaf"
                  width={80}
                  height={80}
                  className="w-6 md:w-12 lg:w-16"
                /> */}
              </h1>
            </div>
            {/* {
              <h1 className="text-md md:text-2xl max-w-[280px] sm:max-w-3xl mx-auto font-[500] mb-7">
                with Commercio
              </h1>
            } */}

            <div className="mx-auto mb-4">
              {!isResale ? (
                <SearchBar
                  padding="py-8 px-2"
                  width="w-[330px] md:w-[650px]"
                  className="mt-3 rounded-[7px]"
                />
              ) : (
                <UnifiedSearchBar
                  width="w-[330px] md:w-[670px] mx-auto"
                  height="h-16"
                  center={true}
                />
              )}
              <h2 className="text-sm mt-2 mb-6">
                Explore office, retail, industrial, medical, flex, multifamily,
                and land opportunities — for lease or for sale, all in one
                place.
              </h2>
              <div className="flex flex-wrap gap-3 justify-center mt-4 max-w-xl mx-auto">
                {popularCities.map((city, index) => (
                  <Link
                    href={
                      !isResale
                        ? `/${city.toLowerCase()}`
                        : generateURL({
                            cityVal: city,
                            province:
                              city == "Edmonton" ? "alberta" : "ontario",
                          })
                    }
                    key={index}
                    className="text-[11px] font-normal text-black hover:underline decoration-1 decoration-black underline-offset-4"
                  >
                    {city}
                  </Link>
                ))}
              </div>

              <LastSearchSection />
            </div>
          </div>

          <div className="flex justify-center">
            <img src="/line-9.svg" alt="line" className="w-20" />
          </div>

          {/* {!isResale ? <PropertyTypes /> : <ResalePropertyTypes />} */}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
