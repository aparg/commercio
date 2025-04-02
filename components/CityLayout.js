import ListingCard from "./ListingCard";
import CityFilters from "./CityFilters";
import QuickLinks from "./QuickLinks";
import Image from "next/image";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import ContactForm from "./ContactForm";
import CityDirectory from "./CityDirectory";

export default function CityLayout({
  cityData,
  featuredListings,
  metadata,
  filters,
  params,
  sitemapData,
}) {
  const filteredprojects = (value) => {
    return cityData.data.results.filter((item) => item.status == value);
  };

  return (
    <div className="mx-auto px-3 md:px-10 py-2 transition-all duration-300 max-w-8xl">
      <div className="mb-3 md:mb-5">
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center">
          <h1 className="text-xl md:text-[2rem] text-gray-900 mb-1 md:mb-2 font-black text-start md:text-start w-full">
            {metadata.title}
          </h1>
        </div>
        <div>
          <h2 className="text-xs md:text-sm text-gray-500 text-start md:text-start mb-4 max-w-xs md:max-w-full">
            {metadata.subtitle}
          </h2>
        </div>
      </div>

      {/* Filters at the top */}
      <div className="mb-2 md:mb-4">
        <CityFilters filters={filters} cityName={params.city} />
      </div>

      <div className="relative">
        {/* Main Content */}
        <div className="w-full">
          {/* Selling Projects Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
              {featuredListings.data.results.map((listing) => (
                <ListingCard
                  key={listing.slug}
                  listing={listing}
                  isFeatured={true}
                  city={params.city}
                />
              ))}
              {filteredprojects("Selling").map((listing, index) => (
                <ListingCard
                  key={listing.slug}
                  listing={listing}
                  index={index + 1}
                  city={params.city}
                />
              ))}
            </div>
          </div>

          {/* Upcoming Projects Section */}
          {filteredprojects("Upcoming").length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-4">
                Launching Soon - New Construction Projects in{" "}
                {capitalizeFirstLetter(params.city)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
                {filteredprojects("Upcoming").map((listing, index) => (
                  <ListingCard
                    key={listing.slug}
                    listing={listing}
                    index={index + 1}
                    city={params.city}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sold Out Projects Section */}
          {filteredprojects("Sold out").length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-4">
                Sold Out Projects in {capitalizeFirstLetter(params.city)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5">
                {filteredprojects("Sold out").map((listing, index) => (
                  <ListingCard
                    key={listing.slug}
                    listing={listing}
                    index={index + 1}
                    city={params.city}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick links at the bottom */}
          <QuickLinks cityName={params.city} />

          {/* City Directory Section */}
          <div className="mt-10">
            <CityDirectory
              cityData={sitemapData}
              cityName={capitalizeFirstLetter(params.city)}
              citySlug={params.city}
            />
          </div>
        </div>

        <div className="my-32"></div>
        <h3 className="text-center text-4xl md:text-[3rem] font-bold">
          <span className="text-[red]">Be</span> Smart.{" "}
          <span className="text-[red]">Be</span> Quick
        </h3>
        <h4 className="text-center text-sm md:text-xl">
          Get in the line before someone else does
        </h4>

        <div className="p-2 md:p-8">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center">
              <Image
                src="/reg.webp"
                width={300}
                height={300}
                alt="Contact Me Design"
                className="rounded-lg"
              />
            </div>
            <div className="rounded-[10px] bg-white md:p-4 mt-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="w-full">
                  <ContactForm
                    cityName={params.city}
                    partnerdata={cityData.data.partnerdata}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
