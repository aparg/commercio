import Link from "next/link";
import React from "react";

const OfficesContent = () => {
  const cities = [
    { name: "Barrie", imageUrl: "/aeee.jpg", link: "/" },
    { name: "Mississauga", imageUrl: "/etobicoke.jpg", link: "/" },
    { name: "Brampton", imageUrl: "/office-building.jpeg", link: "/" },
    { name: "Toronto", imageUrl: "/office-building2.jpg", link: "/" },
  ];
  return (
    <div className="mx-20 flex py-10 sm:py-20">
      <div className="flex-1 p-4">
        <div className="text-center h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-[5rem] font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent text-left leading-[5.8rem]">
            Explore Office Spaces
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed text-left mt-6">
            Discover premium office locations across Ontario's most vibrant
            cities, tailored to your business needs
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-6 flex-1 gap-x-2 gap-y-2">
        {cities.map((city) => (
          <Link
            href={`/commercial/ontario/${city.name.toLowerCase()}/office-for-sale`}
            key={city.id}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-[4/3] w-full">
              <img
                src={city.imageUrl}
                alt={`${city.name} offices`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 p-4">
                <h3 className="text-white text-xl font-bold">{city.name}</h3>
                <p className="text-white/80 text-sm mt-1">Explore Offices →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OfficesContent;
