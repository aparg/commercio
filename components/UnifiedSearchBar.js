"use client";

import * as React from "react";
import { cn, slugify } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import citiesWithProvinces from "@/constant/cities";
import { searchProperties } from "@/app/_resale-api/getSalesData";

const MAX_RECENT_SEARCHES = 5; // Maximum number of recent searches to store

const SearchIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

const LocationIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

const CommuteIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
};

const ClockIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6l4 2"
      />
    </svg>
  );
};

const CloseIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const UnifiedSearchBar = ({
  width = "w-full md:w-[350px]",
  height = "h-11",
  className,
  center = false,
  small = false,
}) => {
  const [showResults, setShowResults] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("resale");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState({
    resale: [],
  });
  const searchRef = React.useRef(null);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [recentSearches, setRecentSearches] = React.useState([]);

  // Popular suggestions for each tab
  const popularSuggestions = {
    resale: [
      { name: "Toronto", url: "/commercial/ontario/toronto/homes-for-sale" },
      {
        name: "Mississauga",
        url: "/commercial/ontario/mississauga/homes-for-sale",
      },
      { name: "Brampton", url: "/commercial/ontario/brampton/homes-for-sale" },
      { name: "Markham", url: "/commercial/ontario/markham/homes-for-sale" },
      { name: "Oakville", url: "/commercial/ontario/oakville/homes-for-sale" },
    ],
    precon: [
      { name: "New Condos in Toronto", url: "/toronto/condos" },
      { name: "Brampton", url: "/brampton" },
      { name: "Mississauga", url: "/mississauga" },
      { name: "Vaughan", url: "/vaughan" },
    ],
  };

  // Load recent searches on component mount
  React.useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Function to add a search to recent searches
  const addToRecentSearches = (query, type, item) => {
    const search = {
      query,
      type,
      item,
      timestamp: new Date().getTime(),
    };

    const updated = [
      search,
      ...recentSearches
        .filter((s) => s.query !== query) // Remove duplicates
        .slice(0, MAX_RECENT_SEARCHES - 1),
    ]; // Keep only MAX_RECENT_SEARCHES items

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    // Submit search query to backend
    fetch("https://api.homebaba.ca/api/search-query-submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        visitor_id: localStorage.getItem("visitorId")
          ? localStorage.getItem("visitorId")
          : "",
        page: typeof window !== "undefined" ? window.location.href : "",
      }),
    }).catch((error) => {
      console.error("Error submitting search query:", error);
    });
  };

  // Modify the handleSearchClick function
  const handleSearchClick = (item, type) => {
    if (!item) return;

    let searchData = {
      query: "",
      url: "",
      item: item,
    };

    // Set query and URL based on type
    if (type === "city") {
      searchData.query = item.city || item.name;
      if (item.city) {
        searchData.url = `/commercial/ontario/${slugify(
          item.city
        )}/homes-for-sale`;
      } else if (item.name) {
        searchData.url = `/${item.name.split(",")[0].toLowerCase()}`;
      }
    } else if (type === "precon") {
      searchData.query = item.name;
      if (item.city && item.slug) {
        searchData.url = `/${item.city.toLowerCase()}/${item.slug}`;
      }
    } else if (type === "resale") {
      searchData.query = item.UnparsedAddress?.split(",")[0] || item.city;
      searchData.url = getListingUrl(item);
    } else if (type === "project") {
      searchData.query = item.name;
      searchData.url = `/precon/projects`;
    }

    // Only save if we have both query and url
    if (!searchData.query || !searchData.url) return;

    // Use addToRecentSearches instead of duplicating its functionality
    addToRecentSearches(searchData.query, type, item);

    setShowResults(false);
  };

  const handleCancel = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Instant city search function - now more optimized
  const getCityResults = React.useCallback((query) => {
    if (!query) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return citiesWithProvinces.filter((data) =>
      data.city.toLowerCase().includes(normalizedQuery)
    );
  }, []);

  // Immediate city search effect
  React.useEffect(() => {
    if (showResults && searchQuery) {
      const cityResults = getCityResults(searchQuery);
      setResults((prev) => ({
        ...prev,
        resale: cityResults,
      }));
    }
  }, [searchQuery, showResults, getCityResults]);

  // Debounced effect for non-city searches
  React.useEffect(() => {
    const fetchAdditionalResults = async () => {
      if (!debouncedSearch || !showResults) return;

      // Only show loading for non-city content
      setLoading(true);

      try {
        const cityResults = getCityResults(debouncedSearch);

        // Fetch additional data in background
        // const [preconResponse, resaleProperties] = await Promise.all([
        //   fetch(
        //     `https://api.homebaba.ca/api/search/?q=${encodeURIComponent(
        //       debouncedSearch
        //     )}`
        //   ),
        //   searchProperties(debouncedSearch),
        // ]);

        const preconData = await preconResponse.json();

        // Merge results, keeping cities at the top and filtering out duplicates
        setResults({
          resale: [
            ...cityResults,
            ...resaleProperties.filter(
              (item) =>
                // Filter out properties that are just city matches
                !item.city &&
                // Ensure the item has either an UnparsedAddress or is a unique entry
                (item.UnparsedAddress || item.ListingKey)
            ),
          ],
        });
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalResults();
  }, [debouncedSearch, showResults, getCityResults]);

  const getListingUrl = (item) => {
    const quadrantSlug = item.quadrant ? `/${item.quadrant}` : "";

    if (item.city) {
      const citySlug = slugify(item.city);
      return `/commercial/${
        item.province.toLowerCase() || "ontario"
      }/${citySlug}${quadrantSlug}/homes-for-sale`;
    } else {
      const citySlug = slugify(item.City || "");
      const address =
        item.UnparsedAddress?.split(",")[0] || item.StreetName || "";
      const listingSlug = `${slugify(address)}-${item.ListingKey}`;
      return `/commercial/ontario/${citySlug}/listings/${listingSlug}`;
    }
  };

  return (
    <div className={cn("relative", width, className)} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className={cn(
            "w-full pl-9",
            showResults ? "pr-9" : "pr-4",
            "py-2.5",
            height,
            "bg-white hover:bg-gray-100 focus:bg-gray-100",
            "rounded-xl border border-gray-200 hover:border-gray-100 focus:border-gray-100 focus:outline-none",
            showResults ? "rounded-b-none" : "",
            "transition-colors duration-200",
            "placeholder:text-gray-400 text-gray-700 text-sm placeholder:text-xs hover:placeholder:text-gray-700 focus:placeholder:text-gray-700"
          )}
          placeholder={
            small
              ? "Search properties..."
              : "Search for City, Neighborhood, Zip, County..."
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        {showResults && (
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={handleCancel}
          >
            <CloseIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 focus:text-gray-600" />
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div
          className={`absolute z-50 bg-white rounded-b-xl shadow-md overflow-hidden border border-gray-200 border-t-0 ${
            center
              ? "left-1/2 -translate-x-1/2 w-full"
              : "w-[300px] md:w-full -left-1/3 top-14 md:top-11 md:left-0"
          }`}
        >
          {/* Filter Options */}
          <div className="flex border-b bg-white">
            <button
              className={cn(
                "flex-1 px-3 py-2 text-xs font-medium transition-colors border-b-2",
                activeTab === "resale"
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab("resale")}
            >
              Properties for Sale
            </button>
            {/* <button
              className={cn(
                "flex-1 px-3 py-2 text-xs font-medium transition-colors border-b-2",
                activeTab === "precon"
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
              onClick={() => setActiveTab("precon")}
            >
              Pre Construction
            </button> */}
          </div>

          {/* Last Filter State Search */}
          {activeTab === "resale" && (
            <div className="border-b border-gray-100">
              {(() => {
                const filterState =
                  typeof window !== "undefined"
                    ? localStorage.getItem("filterState")
                    : null;
                if (!filterState) return null;

                const lastSearch = JSON.parse(filterState);
                const searchText = `${
                  lastSearch.houseType ? lastSearch.houseType + " " : ""
                }Properties ${lastSearch.saleLease} in ${
                  lastSearch.city
                    ? lastSearch.city.charAt(0).toUpperCase() +
                      lastSearch.city.slice(1)
                    : "Ontario"
                }`;

                const generateURLFromFilterState = () => {
                  const priceRange =
                    lastSearch.priceRange?.min !== 0 ||
                    lastSearch.priceRange?.max !== 0
                      ? lastSearch.priceRange
                      : undefined;

                  return `/commercial/ontario/${
                    lastSearch.city || "all"
                  }/homes-for-sale${
                    lastSearch.houseType ? `?type=${lastSearch.houseType}` : ""
                  }`;
                };

                return (
                  <Link
                    href={generateURLFromFilterState()}
                    className="block px-5 py-2 text-xs hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <CommuteIcon className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-gray-600">{searchText}</span>
                    </div>
                  </Link>
                );
              })()}
            </div>
          )}

          {/* Results content */}
          <div className="max-h-[320px] overflow-y-auto">
            {
              // Resale results
              <>
                {results.resale.length === 0 ? (
                  <div className="p-3 text-center text-xs text-gray-500">
                    No results found
                  </div>
                ) : (
                  <div className="p-1.5">
                    {/* Show city results first */}
                    {results.resale
                      .filter((item) => item.city)
                      .map((item, index) => (
                        <Link
                          key={`city-${index}`}
                          href={getListingUrl(item)}
                          onClick={() => handleSearchClick(item, "resale")}
                          className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                        >
                          <div className="bg-gray-100 p-1.5 rounded-full mr-2 group-hover:bg-gray-200">
                            <LocationIcon className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-xs">
                              {item.city} {item.quadrant || ""}
                            </div>
                            <div className="text-xs text-gray-500">City</div>
                          </div>
                        </Link>
                      ))}

                    {/* Loading indicator for non-city results */}
                    {loading && (
                      <div className="text-center py-2 text-xs text-gray-500">
                        Loading more results...
                      </div>
                    )}

                    {/* Show non-city results */}
                    {results.resale
                      .filter((item) => !item.city)
                      .map((item, index) => (
                        <Link
                          key={`listing-${index}`}
                          href={getListingUrl(item)}
                          onClick={() => handleSearchClick(item, "resale")}
                          className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                        >
                          <div className="bg-gray-100 p-1.5 rounded-full mr-2 group-hover:bg-gray-200">
                            <LocationIcon className="h-3.5 w-3.5 text-gray-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-xs">
                              {item.UnparsedAddress?.split(",")[0]}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.ListPrice
                                ? `$${item.ListPrice.toLocaleString()}`
                                : ""}
                              {item.City ? ` • ${item.City}` : ""}
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedSearchBar;
