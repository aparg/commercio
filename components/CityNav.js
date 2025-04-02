"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { preconCityList } from "@/data/preconCityList";

const CityNav = () => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef(null);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      // Check if scrolled from start
      setShowLeftButton(container.scrollLeft > 0);
      // Check if can scroll further right
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();
    }
    return () => container?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction * 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="z-50 bg-[#f5f6f7] shadow-sm hidden md:block">
      <div className="mx-auto relative">
        <div className="relative overflow-hidden">
          {showLeftButton && (
            <button
              className="absolute left-0 top-0 h-full z-10 px-3
                         bg-white/20 backdrop-blur-sm border-y border-r border-white/30 
                         hover:bg-white/30 transition-all duration-300
                         shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]
                         flex items-center"
              onClick={() => scroll(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex space-x-3 py-4 px-8 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {preconCityList.map((city) => (
              <Link
                key={city.city_name}
                href={`/${city.city_name}`}
                className="whitespace-nowrap px-5 text-[1rem] pt-5 pb-4 font-medium text-gray-700 transition-colors bg-white shadow-sm border-b-4 border-white hover:border-black rounded-[5px]"
              >
                {city.city_name_cap}
              </Link>
            ))}
          </div>

          {showRightButton && (
            <button
              className="absolute right-0 top-0 h-full z-10 px-3
                         bg-white/20 backdrop-blur-sm border-y border-l border-white/30 
                         hover:bg-white/30 transition-all duration-300
                         shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]
                         flex items-center"
              onClick={() => scroll(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CityNav;
