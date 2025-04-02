import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { preconCityList } from "@/data/preconCityList";

const CitySelector = () => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set initial search term based on URL path
  useEffect(() => {
    if (!mounted) return;

    const cityFromPath = pathname?.split("/")[1]; // Get the city name from the URL

    if (cityFromPath) {
      const matchingCity = preconCityList.find(
        (city) => city.city_name.toLowerCase() === cityFromPath.toLowerCase()
      );
      if (matchingCity) {
        setSearchTerm(matchingCity.city_name_cap);
      }
    }
  }, [pathname, mounted]);

  // Filter cities based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCities([]);
    } else {
      const filtered = preconCityList.filter((city) =>
        city.city_name_cap.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input focus
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div className="max-w-md mx-auto relative" ref={dropdownRef}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-[5px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent shadow-sm placeholder:text-gray-400 placeholder:text-xs text-xs"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>

        {isDropdownOpen && filteredCities.length > 0 && (
          <div className="absolute z-10 w-[150px] mt-1 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto border border-gray-200">
            <ul className="py-1 list-none mx-0">
              {filteredCities.map((city) => (
                <li key={city.city_name} className="px-1">
                  <Link
                    href={`/${city.city_name}`}
                    className="block px-4 py-2 hover:bg-blue-50 text-gray-800 rounded-md transition-colors duration-150 ease-in-out text-xs"
                  >
                    {city.city_name_cap}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isDropdownOpen && searchTerm && filteredCities.length === 0 && (
          <div className="absolute z-10 w-[150px] mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
            <p className="px-4 py-2 text-gray-500 text-xs">No cities found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
