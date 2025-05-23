"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import CustomDropdown from "./CustomDropdown.jsx";
import { usePathname } from "next/navigation.js";
import { homeText } from "@/constant/filters.js";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter.js";
import { useRouter } from "next/navigation";

const priceRanges = [
  { label: "under $500k", path: "businesses-under-500k", maxPrice: 500000 },
  {
    label: "under $750k",
    path: "businesses-under-750k",

    maxPrice: 750000,
  },
  {
    label: "under $1M",
    path: "businesses-under-1000k",

    maxPrice: 1000000,
  },
  {
    label: "under $1.5M",
    path: "businesses-under-1500k",

    maxPrice: 1500000,
  },
  { label: "Over $1.5M", path: "businesses-over-1500k", minPrice: 1500000 },
];

const areaRanges = [
  { label: "under 500sqft", path: "spaces-under-500sqft", maxArea: 500 },
  {
    label: "under 1000sqft",
    path: "spaces-under-1000sqft",

    maxArea: 1000,
  },
  {
    label: "under 1500sqft",
    path: "spaces-under-1500sqft",

    maxArea: 1500,
  },
  {
    label: "over 1500sqft",
    path: "spaces-under-1500sqft",

    maxArea: 1500,
  },
];

const bedOptions = [
  { label: "1+ Bed", value: 1 },
  { label: "2+ Beds", value: 2 },
  { label: "3+ Beds", value: 3 },
  { label: "4+ Beds", value: 4 },
  { label: "5+ Beds", value: 5 },
];

export default function FilterBar({ currentFilters }) {
  const getPropertyTypes = (province) => {
    return [
      {
        label: `Retail Space`,
        path: "retail",
        subtypes: ["Commercial Retail"],
      },
      {
        label: `Land ${
          currentFilters.transactionType == "For Lease"
            ? `for lease`
            : "for sale"
        }`,
        path: "land",
        subtypes: ["Land"],
      },
      {
        label: `Office Space`,
        path: "office",
        subtypes: ["Office"],
      },
      {
        label: `Industrial Space ${
          currentFilters.transactionType == "For Lease"
            ? `for lease`
            : "for sale"
        }`,
        path: "industrial-space",
        subtypes: ["Industrial"],
      },
    ];
  };
  const cityPath = currentFilters.city
    ? `/${currentFilters.city.toLowerCase().replace(/ /g, "-")}`
    : "";
  const regex = /(?<=commercial\/)([^\/]+)/;
  const pathname = usePathname();
  const province = capitalizeFirstLetter(pathname.match(regex)[0]);
  const baseUrl = `/commercial/${province.toLowerCase()}`;
  const propertyTypes = getPropertyTypes(province.toLowerCase());
  const allProvinces = ["Ontario", "Alberta"];
  const router = useRouter();

  const getFilterUrl = (newFilter) => {
    const base = `/commercial/${province.toLowerCase()}`;
    let filters = { ...currentFilters };

    // Apply new filters while maintaining others
    Object.entries(newFilter).forEach(([key, value]) => {
      if (value === null) {
        delete filters[key];
      } else {
        filters[key] = value;
      }
    });

    console.log(filters);

    let urlPath = "";

    // If we have a city, it should be the first part of the path
    if (filters.city && !allProvinces.includes(filters.city)) {
      urlPath = filters.city.toLowerCase().replace(/ /g, "-");
      if (filters.quadrant) {
        urlPath += `/${filters.quadrant}`;
      }
      urlPath += "/";
    }

    // Handle price-dropped URLs
    if (filters.mlsStatus === "Price Change") {
      urlPath += "price-dropped";

      // Add property type if selected
      if (filters.propertyType) {
        const propertyPath = propertyTypes.find(
          (p) => p.label === filters.propertyType
        )?.path;
        if (propertyPath) {
          urlPath += `/${propertyPath}`;
        }
      }
    } else {
      // Regular property listing path
      if (filters.propertyType) {
        const propertyPath = propertyTypes.find(
          (p) => p.label === filters.propertyType
        )?.path;
        // Only add -homes for specific property types
        const shouldAddHomes = ["industrial", "retail"].includes(propertyPath);
        urlPath += `${propertyPath}${shouldAddHomes ? "-businesses" : ""}`;
      } else {
        urlPath += "businesses";
      }

      // Add price range if present
      if (filters.maxPrice && !filters.minPrice) {
        urlPath += `-under-${(filters.maxPrice / 1000).toFixed(0)}k`;
      } else if (filters.minPrice && !filters.maxPrice) {
        urlPath += `-over-${(filters.minPrice / 1000).toFixed(0)}k`;
      } else if (filters.minPrice && filters.maxPrice) {
        urlPath += `-between-${(filters.minPrice / 1000).toFixed(0)}k-${(
          filters.maxPrice / 1000
        ).toFixed(0)}k`;
      }

      // Add price range if present
      if (filters.maxArea && !filters.minArea) {
        urlPath += `-under-${filters.maxArea}sqft`;
      } else if (filters.minArea && !filters.maxArea) {
        urlPath += `over ${filters.minArea}sqft`;
      } else if (filters.minArea && filters.maxArea) {
        urlPath += `-between-${filters.minArea}sqft-${filters.maxArea}sqft`;
      }

      // Add transaction type
      urlPath += `-for-${
        filters.transactionType === "For Lease" ? "lease" : "sale"
      }`;
    }

    // Add beds and baths as additional path segments
    const specParts = [];
    if (filters.minBeds) {
      specParts.push(`${filters.minBeds}-plus-bed`);
    }
    if (filters.minBaths) {
      specParts.push(`${filters.minBaths}-plus-bath`);
    }

    let finalUrl = `${base}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }
    return finalUrl;
  };

  // Update the bed options click handlers
  const bedOptionsWithUrls = bedOptions.map((option) => {
    const filters = {
      minBeds: option.value,
    };
    // Only add propertyType if it exists in currentFilters
    if (currentFilters.propertyType) {
      filters.propertyType = currentFilters.propertyType;
    }
    return {
      ...option,
      href: getFilterUrl(filters),
    };
  });

  // Update the "All" selection handlers
  const handleAllProperties = () => {
    const { propertyType, ...restFilters } = currentFilters;
    let urlPath = "";

    // If we're on a price-dropped page, maintain that path structure
    if (restFilters.mlsStatus === "Price Change") {
      // Add city if present
      if (restFilters.city && !allProvinces.includes(restFilters.city)) {
        urlPath = `${restFilters.city.toLowerCase().replace(/ /g, "-")}/`;
      }
      urlPath += "price-dropped";
    } else {
      // Regular property listing path
      if (restFilters.city && !allProvinces.includes(restFilters.city)) {
        urlPath = `${restFilters.city.toLowerCase().replace(/ /g, "-")}/`;
      }
      urlPath += "businesses";

      // Add price range if present
      if (restFilters.maxPrice && !restFilters.minPrice) {
        urlPath += `-under-${(restFilters.maxPrice / 1000).toFixed(0)}k`;
      } else if (restFilters.minPrice && !restFilters.maxPrice) {
        urlPath += `-over-${(restFilters.minPrice / 1000).toFixed(0)}k`;
      } else if (restFilters.minPrice && restFilters.maxPrice) {
        urlPath += `-between-${(restFilters.minPrice / 1000).toFixed(0)}k-${(
          restFilters.maxPrice / 1000
        ).toFixed(0)}k`;
      }

      urlPath += `-for-${
        restFilters.transactionType === "For Lease" ? "lease" : "sale"
      }`;
    }

    // Add beds and baths as additional path segments
    const specParts = [];
    if (restFilters.minBeds) {
      specParts.push(`${restFilters.minBeds}-plus-bed`);
    }
    if (restFilters.minBaths) {
      specParts.push(`${restFilters.minBaths}-plus-bath`);
    }

    if (restFilters.minArea) {
      specParts.push(`above-${restFilters.minArea}-sqft`);
    }

    let finalUrl = `${baseUrl}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  // Update handleAnyBeds to maintain property type
  const handleAnyBeds = () => {
    const { minBeds, ...restFilters } = currentFilters;
    return getFilterUrl({
      minBeds: null,
      propertyType: currentFilters.propertyType, // Maintain property type
    });
  };

  const handleAnyPrice = () => {
    // Remove both minPrice and maxPrice while keeping all other filters
    const { minPrice, maxPrice, ...restFilters } = currentFilters;

    // Build URL parts in a specific order
    let urlPath = "";

    // 1. Start with base path (homes or property type)
    if (restFilters.propertyType) {
      const propertyPath = propertyTypes.find(
        (p) => p.label === restFilters.propertyType
      )?.path;
      // Only add -homes for specific property types
      const shouldAddHomes = ["industrial", "retail"].includes(propertyPath);
      urlPath =
        `${propertyPath}${shouldAddHomes ? "-spaces" : ""}` || "businesses";
    } else {
      urlPath = "businesses";
    }

    // 2. Add transaction type
    urlPath += `-for-${
      restFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    // 3. Add beds and baths as additional path segments
    const specParts = [];
    if (restFilters.minBeds) {
      specParts.push(`${restFilters.minBeds}-plus-bed`);
    }
    if (restFilters.minBaths) {
      specParts.push(`${restFilters.minBaths}-plus-bath`);
    }

    // Combine all parts
    let finalUrl = `${baseUrl}${cityPath}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  const handleAreaUrl = () => {
    const { minArea, maxArea, ...restFilters } = currentFilters;

    // Build URL parts in a specific order
    let urlPath = "";

    // 1. Start with base path (homes or property type)
    if (restFilters.propertyType) {
      const propertyPath = propertyTypes.find(
        (p) => p.label === restFilters.propertyType
      )?.path;
      // Only add -homes for specific property types
      const shouldAddHomes = ["detached", "semi-detached"].includes(
        propertyPath
      );
      urlPath = `${propertyPath}${shouldAddHomes ? "-homes" : ""}` || "homes";
    } else {
      urlPath = "homes";
    }

    // 2. Add transaction type
    urlPath += `-for-${
      restFilters.transactionType === "For Lease" ? "lease" : "sale"
    }`;

    // 3. Add beds and baths as additional path segments
    const specParts = [];
    if (restFilters.minBeds) {
      specParts.push(`${restFilters.minBeds}-plus-bed`);
    }
    if (restFilters.minBaths) {
      specParts.push(`${restFilters.minBaths}-plus-bath`);
    }

    // Combine all parts
    let finalUrl = `${baseUrl}${cityPath}/${urlPath}`;
    if (specParts.length > 0) {
      finalUrl += `/${specParts.join("/")}`;
    }

    return finalUrl;
  };

  const getPriceDropUrl = () => {
    const base = baseUrl;
    let urlPath = "";

    // If we have a city, it should be the first part of the path
    if (currentFilters.city && !allProvinces.includes(currentFilters.city)) {
      urlPath = currentFilters.city.toLowerCase().replace(/ /g, "-") + "/";
    }

    // Add base price-dropped path
    urlPath += "price-dropped";

    // Add property type if selected
    if (currentFilters.propertyType) {
      const propertyPath = propertyTypes.find(
        (p) => p.label === currentFilters.propertyType
      )?.path;
      if (propertyPath) {
        urlPath += `/${propertyPath}`;
      }
    }

    return `${base}/${urlPath}`;
  };

  const handleClearFilter = (filterType) => {
    const newFilters = { ...currentFilters };
    switch (filterType) {
      case "propertyType":
        delete newFilters.propertyType;
        break;
      case "minBeds":
        delete newFilters.minBeds;
        break;
      case "minBaths":
        delete newFilters.minBaths;
        break;
      case "price":
        delete newFilters.minArea;
        delete newFilters.maxPrice;
        break;
      case "mlsStatus":
        delete newFilters.mlsStatus;
        break;
      case "minArea":
        delete newFilters.minArea;
        break;
      default:
        break;
    }

    let urlPath = "";

    // If we have a city, it should be the first part of the path
    if (newFilters.city && !allProvinces.includes(newFilters.city)) {
      urlPath = newFilters.city.toLowerCase().replace(/ /g, "-") + "/";
    }

    // Handle price-dropped URLs
    if (newFilters.mlsStatus === "Price Change") {
      urlPath += "price-dropped";
    } else {
      // Regular property listing path
      if (newFilters.propertyType) {
        const propertyPath = propertyTypes.find(
          (p) => p.label === newFilters.propertyType
        )?.path;
        // Only add -homes for specific property types
        const shouldAddHomes = ["detached", "semi-detached"].includes(
          propertyPath
        );
        urlPath += `${propertyPath}${shouldAddHomes ? "-homes" : ""}`;
      } else {
        urlPath += "homes";
      }

      // Add price range if present
      if (newFilters.maxPrice && !newFilters.minPrice) {
        urlPath += `-under-${(newFilters.maxPrice / 1000).toFixed(0)}k`;
      } else if (newFilters.minPrice && !newFilters.maxPrice) {
        urlPath += `-over-${(newFilters.minPrice / 1000).toFixed(0)}k`;
      } else if (newFilters.minPrice && newFilters.maxPrice) {
        urlPath += `-between-${(newFilters.minPrice / 1000).toFixed(0)}k-${(
          newFilters.maxPrice / 1000
        ).toFixed(0)}k`;
      }

      // Add transaction type
      urlPath += `-for-${
        newFilters.transactionType === "For Lease" ? "lease" : "sale"
      }`;
    }

    return `${baseUrl}/${urlPath}`;
  };

  const isFilterActive = (filterType) => {
    switch (filterType) {
      case "propertyType":
        return !!currentFilters.propertyType;
      case "minBeds":
        return !!currentFilters.minBeds;
      case "minBaths":
        return !!currentFilters.minBaths;
      case "price":
        return !!(currentFilters.minPrice || currentFilters.maxPrice);
      case "mlsStatus":
        return currentFilters.mlsStatus === "Price Change";
      case "openHouse":
        return currentFilters.isOpenHouse;
      case "minArea":
        return !!(currentFilters.minArea || currentFilters.maxArea);
      default:
        return false;
    }
  };

  return (
    <div className="bg-white w-full relative z-[40]">
      <div className="flex flex-wrap sm:flex-row gap-1.5 md:gap-1.5 sm:my-2 items-center container-fluid">
        {/* Transaction Type Buttons */}
        <div className="relative">
          <Link
            href={getFilterUrl({ transactionType: "For Sale" })}
            className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
              currentFilters.transactionType === "For Sale"
                ? "bg-[#f2f4f5] border-black"
                : "border-gray-100 bg-white"
            }`}
          >
            For Sale
          </Link>
        </div>
        <div className="relative">
          <Link
            href={getFilterUrl({ transactionType: "For Lease" })}
            className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
              currentFilters.transactionType === "For Lease"
                ? "bg-[#f2f4f5] border-black"
                : "border-gray-100 bg-white"
            }`}
          >
            For Lease
          </Link>
        </div>
        {/* Property Types Dropdown */}
        <CustomDropdown
          trigger={
            <Button
              variant="outline"
              size="sm"
              className={`hover:bg-[#f2f4f5] rounded-full text-xs hover:shadow-xl flex items-center justify-between h-8 hover:border-black transition-colors duration-150 min-w-[100px] ${
                isFilterActive("propertyType")
                  ? "bg-[#f2f4f5] border-black"
                  : "bg-white border-gray-100"
              }`}
            >
              <span>{currentFilters.propertyType || "All Properties"}</span>
              <div className="flex items-center gap-1">
                {isFilterActive("propertyType") && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = handleAllProperties();
                      return false;
                    }}
                    className="hover:text-gray-600 cursor-pointer z-10"
                  >
                    <X className="h-3 w-3" />
                  </div>
                )}
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </div>
            </Button>
          }
          items={[
            <Link
              key="all"
              href={handleAllProperties()}
              className="px-4 py-2.5 w-full rounded-full text-xs hover:bg-gray-50 transition-colors duration-150 block"
            >
              All Properties
            </Link>,
            ...propertyTypes.map((type) => (
              <Link
                key={type.path}
                href={getFilterUrl({ propertyType: type.label })}
                className="px-4 py-2.5 w-full rounded-full text-xs hover:bg-gray-50 transition-colors duration-150 block"
              >
                {homeText[type.label] || type.label} in{" "}
                {currentFilters.city || province}
              </Link>
            )),
          ]}
          isActive={isFilterActive("propertyType")}
        />

        {/* following filters are not yet available for alberta data */}
        {province !== "Alberta" && (
          <>
            {/* Beds Dropdown */}

            {/* Price Range Dropdown */}
            <CustomDropdown
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className={`hover:bg-[#f2f4f5] hover:shadow-xl rounded-full text-xs flex items-center justify-between h-8 hover:border-black transition-colors duration-150 min-w-[100px] ${
                    isFilterActive("price")
                      ? "bg-[#f2f4f5] border-black"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <span>
                    {currentFilters.minPrice || currentFilters.maxPrice
                      ? `${
                          !currentFilters.minPrice && currentFilters.maxPrice
                            ? `Under $${(
                                currentFilters.maxPrice / 1000
                              ).toFixed(0)}k`
                            : `Over $${(currentFilters.minPrice / 1000).toFixed(
                                0
                              )}k`
                        }`
                      : "Price Range"}
                  </span>
                  <div className="flex items-center gap-1">
                    {isFilterActive("price") && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = handleClearFilter("price");
                          return false;
                        }}
                        className="hover:text-gray-600 cursor-pointer z-10"
                      >
                        <X className="h-3 w-3" />
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </Button>
              }
              items={[
                <Link
                  key="any"
                  href={handleAnyPrice()}
                  className="px-4 py-2.5 w-full rounded-full text-xs hover:bg-gray-50 transition-colors duration-150 block"
                >
                  Any Price
                </Link>,
                ...priceRanges.map((range) => (
                  <Link
                    key={range.path}
                    href={getFilterUrl({
                      minPrice: range.minPrice,
                      maxPrice: range.maxPrice,
                    })}
                    className="px-4 py-2.5 w-full rounded-full text-xs hover:bg-gray-50 transition-colors duration-150 block"
                  >
                    {currentFilters.city || province} properties {range.label}
                  </Link>
                )),
              ]}
              isActive={isFilterActive("price")}
            />

            {/* Lot size dropdown */}
            {/* <CustomDropdown
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className={`hover:bg-[#f2f4f5] hover:shadow-xl rounded-full text-xs flex items-center justify-between h-8 hover:border-black transition-colors duration-150 min-w-[100px] ${
                    isFilterActive("price")
                      ? "bg-[#f2f4f5] border-black"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <span>
                    {currentFilters.minArea || currentFilters.maxArea
                      ? `${
                          !currentFilters.minaArea && currentFilters.maxArea
                            ? `Under $${(currentFilters.maxArea / 1000).toFixed(
                                0
                              )}sqft`
                            : `Over $${(currentFilters.minArea / 1000).toFixed(
                                0
                              )}sqft`
                        }`
                      : "Lot Size"}
                  </span>
                  <div className="flex items-center gap-1">
                    {isFilterActive("area") && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = handleClearFilter("area");
                          return false;
                        }}
                        className="hover:text-gray-600 cursor-pointer z-10"
                      >
                        <X className="h-3 w-3" />
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </div>
                </Button>
              }
              items={[
                <Link
                  key="any"
                  href={handleAnyPrice()}
                  className="px-4 py-2.5 w-full rounded-full text-xs hover:bg-gray-50 transition-colors duration-150 block"
                >
                  Any Lot Size
                </Link>,
                ...areaRanges.map((range) => (
                  <Link
                    key={range.path}
                    href={getFilterUrl({
                      minaArea: range.minaArea,
                      maxArea: range.maxArea,
                    })}
                    className="px-4 py-2.5 w-full rounded-full text-xs hover:bg-gray-50 transition-colors duration-150 block"
                  >
                    {currentFilters.city || province} properties {range.label}
                  </Link>
                )),
              ]}
              isActive={isFilterActive("area")}
            /> */}

            {/* Open House Button */}
            {/* <div className="relative">
              <Link href={getOpenHouseUrl()}>
                <Button
                  variant="outline"
                  size="sm"
                  className={`hover:bg-[#f2f4f5] hover:shadow-xl rounded-full text-xs justify-between h-8 hover:border-black transition-colors duration-150 ${
                    isFilterActive("openHouse")
                      ? "bg-[#f2f4f5] border-black"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Open House</span>
                    {isFilterActive("openHouse") && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = handleClearOpenHouse();
                          return false;
                        }}
                        className="hover:text-gray-600 cursor-pointer z-10"
                      >
                        <X className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </Button>
              </Link>
            </div> */}

            {/* Price Drop Button */}
            <div className="relative">
              <Link href={getPriceDropUrl()}>
                <Button
                  variant="outline"
                  size="sm"
                  className={`hover:bg-[#f2f4f5] hover:shadow-xl rounded-full text-xs justify-between h-8 hover:border-black transition-colors duration-150 ${
                    isFilterActive("mlsStatus")
                      ? "bg-[#f2f4f5] border-black"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Price Dropped</span>
                    {isFilterActive("mlsStatus") && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = handleClearFilter("mlsStatus");
                          return false;
                        }}
                        className="hover:text-gray-600 cursor-pointer z-10"
                      >
                        <X className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </Button>
              </Link>
            </div>
          </>
        )}
        {console.log(province)}
        {console.log(currentFilters.city)}
        {province == "Alberta" && currentFilters.city == "Calgary" && (
          <>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "N" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "N"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                N
              </Link>
            </div>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "NE" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "NE"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                NE
              </Link>
            </div>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "NW" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "NW"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                NW
              </Link>
            </div>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "S" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "S"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                S
              </Link>
            </div>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "SE" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "SE"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                SE
              </Link>
            </div>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "SW" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "SW"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                SW
              </Link>
            </div>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "E" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "E"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                E
              </Link>
            </div>
            <div className="relative">
              <Link
                href={getFilterUrl({ quadrant: "W" })}
                className={`px-3 py-2 w-full rounded-full text-xs hover:bg-[#f2f4f5] hover:border-black border justify-between h-8 transition-colors duration-150 hover:shadow-xl ${
                  currentFilters.quadrant === "W"
                    ? "bg-[#f2f4f5] border-black"
                    : "border-gray-100 bg-white"
                }`}
              >
                W
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
