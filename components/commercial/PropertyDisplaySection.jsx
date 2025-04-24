import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const PropertyDisplaySection = ({
  title,
  subtitle,
  exploreAllLink,
  children,
  exploreText,
}) => {
  return (
    <div className="my-10 md:my-32 max-w-[96%] mx-auto sm:max-w-full">
      <div className="my-2 sm:my-4 flex flex-col items-center">
        <h3 className="text-lg sm:text-4xl font-bold w-[100%] sm:w-auto">
          {title}
        </h3>
        {/* {exploreAllLink && (
            <Link
              href={exploreAllLink || "#"}
              className="hidden sm:block hover:text-blue-500 text-sm hover:underline self-end -mb-2"
            >
              See more Listings <ArrowRight className="w-3 inline" />
            </Link>
          )} */}

        {subtitle && (
          <h5 className="font-md text-xs sm:text-md sm:mt-1">{subtitle}</h5>
        )}
      </div>
      {children}
      {exploreAllLink && (
        <div className="flex justify-center">
          <Link href={exploreAllLink || "#"} className="">
            <button className="border-black font-bold border-2 inline px-1 sm:px-3 py-2 rounded-md text-sm mt-1 sm:text-md hover:scale-110 duration-500 hover:bg-red-600 hover:text-white hover:border-0 items-center group">
              {exploreText || "Explore All"}
              <ArrowRight className="w-4 inline ml-0 transform transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      )}
      {}
    </div>
  );
};

export default PropertyDisplaySection;
