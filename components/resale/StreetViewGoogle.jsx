"use client";
import { useState, useEffect } from "react";

const NearbyPlacesGoogle = ({
  width = 600,
  height = 400,
  location = "University of Oxford",
  zoom = 13,
  defaultCategories = ["restaurants", "schools"],
}) => {
  // Predefined categories that users can select from
  const availableCategories = [
    { id: "restaurants", label: "Restaurants" },
    { id: "schools", label: "Schools" },
    { id: "hospitals", label: "Hospitals" },
    { id: "parks", label: "Parks" },
    { id: "shopping", label: "Shopping" },
    { id: "gyms", label: "Gyms" },
    { id: "cafes", label: "Cafes" },
    { id: "banks", label: "Banks" },
  ];

  // State to track selected categories
  const [selectedCategories, setSelectedCategories] =
    useState(defaultCategories);
  const [mapSrc, setMapSrc] = useState("");

  // Update map source when selected categories change
  useEffect(() => {
    const query = `all ${selectedCategories.join(" and ")} near ${location}`;
    setMapSrc(
      `https://www.google.com/maps?q=${encodeURIComponent(
        query
      )}&z=${zoom}&output=embed`
    );
  }, [selectedCategories, location]);

  // Toggle category selection
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div className="relative max-w-full">
      {/* <h3 className="text-start text-lg font-normal mb-4">{location}</h3> */}
      <div className="mb-4 flex flex-wrap justify-start gap-2">
        {availableCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`px-2 py-1 text-xs rounded-full transition-colors ${
              selectedCategories.includes(category.id)
                ? "bg-[#f2f4f5] text-black border border-black"
                : "bg-white border border-[#e8e8e8] text-gray-700 hover:bg-[#f2f4f5]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {selectedCategories.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded text-center">
          Please select at least one category to view nearby places
        </div>
      ) : (
        <div
          className="overflow-hidden bg-none"
          style={{ height: `${height}px` }}
        >
          <iframe
            className="max-w-full"
            height={height}
            width={width}
            src={mapSrc}
            title="Google Nearby Places"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default NearbyPlacesGoogle;
