import FilterBar from "@/components/commercial/FilterBar";
import PropertyList from "@/components/commercial/PropertyList";
import PropertyLinksGrid from "@/components/commercial/PropertyLinksGrid";
import citiesWithProvinces from "@/constant/cities";
import Link from "next/link";
import { getProperties } from "@/lib/properties";
import FilterStateManager from "./FilterStateManager";
import { parseSlug } from "@/helpers/parseResaleFilter";
import ListingSEOContent from "./ListingSEOContent";
import { getPropertiesCounts } from "@/lib/properties";
import AveragePriceCard from "./AveragePriceCard";

const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

function generateTitle(filters, actualTotal) {
  const parts = [];

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `${actualTotal} businesses for Sale in ${
      filters.city || "Ontario"
    } from Condo Corporation ${filters.condoCorp}-${filters.condoCorpNumber}`;
  }

  if (filters.isOpenHouse) {
    parts.push("Open Houses");
    if (filters.city) {
      parts.push("in");
      parts.push(filters.city);
    } else {
      parts.push("in Ontario");
    }
    return parts.join(" ");
  }

  parts.push(`${actualTotal?.toLocaleString()}`);

  if (filters.mlsStatus === "Price Change") {
    parts.push("Price Dropped");
  }

  if (filters.minBeds) {
    parts.push(`${filters.minBeds} bedroom`);
  }

  if (filters.propertyType) {
    if (filters.propertyType === "Semi-Detached") {
      parts.push("Semi-Detached");
    } else if (filters.propertyType === "Detached") {
      parts.push("Detached");
    } else if (filters.propertyType === "Condo Townhome") {
      parts.push("Condo Townbusinesses");
    } else if (filters.propertyType === "Townbusinesses") {
      parts.push("Townbusinesses");
    } else {
      parts.push(filters.propertyType);
    }
  } else {
    parts.push("Businesses");
  }

  parts.push(filters.transactionType === "For Lease" ? "for Rent" : "for Sale");

  parts.push("in");
  parts.push(filters.city ? `${filters.city}, ON` : "Ontario");

  if (filters.maxPrice && !filters.minPrice) {
    parts.push(`under $${(filters.maxPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && !filters.maxPrice) {
    parts.push(`over $${(filters.minPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && filters.maxPrice) {
    parts.push(
      `between $${(filters.minPrice / 1000).toFixed(0)}k-$${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`
    );
  }

  return parts.join(" ");
}

function generateSubtitle(filters, total) {
  const parts = [];

  // Handle condo corporation case
  if (filters.condoCorpNumber) {
    return `${filters.condoCorp} in ${
      filters.city || "Ontario"
    } - Get information including bylaws, management, and how to order a status certificate for ${
      filters.condoCorpNumber
    }`;
  }

  if (filters.isOpenHouse) {
    return `View Open Houses in ${
      filters.city || "Ontario"
    } | Find Open Houses Near You | Commercio`;
  }

  parts.push(`${total.toLocaleString()}+ ${filters.city || "Ontario"}`);

  if (filters.minBeds) {
    parts.push(`${filters.minBeds} Bedroom`);
  }

  if (filters.propertyType) {
    parts.push(filters.propertyType.toLowerCase());
  } else {
    parts.push("businesses");
  }

  parts.push(
    filters.transactionType === "For Lease" ? "for Rent or Lease" : "for sale"
  );

  if (filters.maxPrice && !filters.minPrice) {
    parts.push(`under $${(filters.maxPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && !filters.maxPrice) {
    parts.push(`over $${(filters.minPrice / 1000).toFixed(0)}k`);
  } else if (filters.minPrice && filters.maxPrice) {
    parts.push(
      `between $${(filters.minPrice / 1000).toFixed(0)}k-$${(
        filters.maxPrice / 1000
      ).toFixed(0)}k`
    );
  } else {
    parts.push("");
  }

  parts.push("| Book a showing for affordable");

  if (filters.propertyType) {
    parts.push(filters.propertyType.toLowerCase());
  } else {
    parts.push("businesses");
  }

  parts.push(`in ${filters.city || "Ontario"}. Prices from $1 to $5M.`);

  return parts.join(" ");
}

export default async function ListingListPage({ slug, searchParams }) {
  const filters = parseSlug(slug);

  if (!filters) {
    notFound();
  }

  const {
    total: totalProperties,
    minPrice,
    maxPrice,
    averagePrice,
  } = await getPropertiesCounts({
    ...filters,
  });

  const {
    properties: allProperties,
    total,
    currentPage,
  } = await getProperties({
    ...filters,
    ...searchParams,
  });

  // If this is a price drop page, filter out properties without a price drop
  const filteredProperties =
    filters.mlsStatus === "Price Change"
      ? allProperties.filter(
          (property) =>
            property.PreviousListPrice &&
            property.ListPrice < property.PreviousListPrice
        )
      : allProperties;

  const actualTotal =
    filters.mlsStatus === "Price Change" ? filteredProperties.length : total;

  const title = generateTitle(filters, actualTotal);
  const subtitle = generateSubtitle(filters, total);

  return (
    <>
      <FilterStateManager filters={filters} />
      <div className="max-w-9xl mx-auto px-2 md:px-3 mt-0 md:mt-2">
        <div className="block md:flex md:justify-between md:items-start md:gap-0">
          <div className="px-1 mt-0 flex-1">
            <h1 className="font-bold text-xl md:text-3xl text-left sm:text-left pt-2 sm:pt-0 text-gray-800">
              {title}
            </h1>
            <h2 className="text-xs mt-1 mb-2 md:mb-1 text-left sm:text-left text-gray-600">
              {subtitle}
            </h2>
          </div>
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-auto md:w-auto md:static md:transform-none md:bottom-auto md:left-auto">
            <AveragePriceCard averagePrice={averagePrice} />
          </div>
        </div>
        <div className="sticky top-0 bg-white py-2 md:py-1 flex justify-between items-center mb-2 z-20 ps-0">
          <FilterBar currentFilters={filters} />
          <div className="bg-[#f2f4f5] p-1 rounded-full hidden md:flex">
            <button className="px-3 text-sm py-1 rounded-full bg-white shadow-sm">
              List
            </button>
            <button className="px-3 text-sm py-1 rounded-full">Map</button>
          </div>
        </div>

        <PropertyList
          properties={filteredProperties}
          total={actualTotal}
          priceReduced={filters.mlsStatus === "Price Change"}
          currentPage={currentPage}
          openHouse={filters.isOpenHouse}
          totalPages={Math.ceil(actualTotal / 30)}
        />
        {!filters.isOpenHouse && <ListingSEOContent filters={filters} />}
        {filters.mlsStatus === "Price Change" && (
          <div className="w-full bg-white mt-20 col-span-full">
            <div className="text-left mb-8">
              <h2 className="text-xl sm:text-3xl font-bold w-[100%] sm:w-auto">
                Explore Price Dropped Businesses in Ontario
              </h2>
              <p className="text-black">
                Explore businesses that have seen a price reduction in the last
                24 hours
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-0 gap-x-2 gap-y-2 md:gap-x-2">
              {citiesWithProvinces.map((city) => (
                <div key={city.city}>
                  <h4 className="text-xs font-normal text-gray-800 hover:underline underline-offset-2">
                    <Link
                      href={`/commercial/ontario/${slugify(
                        city.city
                      )}/price-dropped/`}
                    >
                      Price Dropped Businesses in {city.city}
                    </Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="w-full bg-white mt-20 col-span-full">
          <PropertyLinksGrid currentCity={filters.city || "Ontario"} />
        </div>
      </div>
    </>
  );
}

ListingListPage.generateMetadata = async function ({ params, searchParams }) {
  const slug = params.slug1;
  const filters = parseSlug(slug);
  const { properties, total } = await getProperties({
    ...filters,
    ...searchParams,
  });
  console.log(filters);
  // Handle condo corporation metadata
  if (filters.condoCorpNumber) {
    const location = filters.city || "Ontario";
    const title = `Businesses for Sale in ${location} from condo corporation ${filters.condoCorp}-${filters.condoCorpNumber} | Commercio`;
    const description = `Looking for condos for sale from condo corporation ${filters.condoCorp}-${filters.condoCorpNumber} located in ${location}. Get condo corporation information, bylaws, and status certificates.`;
    return {
      title,
      description,
      alternates: {
        canonical: `https://commercio.ca/commercial/ontario/${params.slug1.join(
          "/"
        )}`,
      },
      openGraph: {
        title,
        description,
        url: `https://commercio.ca/commercial/ontario/${params.slug1.join(
          "/"
        )}`,
        siteName: "Commercio",
        type: "website",
        images: [
          {
            url: "https://commercio.ca/city-images/milton.jpeg",
            width: 1200,
            height: 630,
            alt: `${filters.condoCorpNumber} Condos in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://commercio.ca/city-images/milton.jpeg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  const priceReducedProperties =
    filters.mlsStatus === "Price Change"
      ? properties.filter(
          (p) => p.PreviousListPrice && p.ListPrice < p.PreviousListPrice
        )
      : properties;

  const actualTotal =
    filters.mlsStatus === "Price Change"
      ? priceReducedProperties.length
      : total;

  const location = filters.city ? `${filters.city}, ON` : "Ontario";
  const canonicalPath = `/commercial/ontario/${params.slug1.join("/")}`;

  if (filters.isOpenHouse) {
    return {
      title: `Open Houses for sale in ${location} | Tour with Commercio Agents`,
      description: `View Open Houses in ${location}. Find upcoming open houses and schedule viewings. Browse through our collection of open houses in ${location}.`,
      alternates: {
        canonical: `https://commercio.ca/commercial/ontario/${params.slug1}`,
      },
      openGraph: {
        title: `Open Houses for sale in ${location} | Tour with Commercio Agents`,
        description: `View Open Houses in ${location}. Find upcoming open houses and schedule viewings. Browse through our collection of open houses in ${location}.`,
        url: `https://commercio.ca/commercial/ontario/${params.slug1}`,
        siteName: "Commercio",
        type: "website",
        images: [
          {
            url: "https://commercio.ca/city-images/milton.jpeg",
            width: 1200,
            height: 630,
            alt: `Open Houses in ${location}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `Open Houses for sale in ${location} | Tour with Commercio Agents`,
        description: `View Open Houses in ${location}. Find upcoming open houses and schedule viewings. Browse through our collection of open houses in ${location}.`,
        images: ["https://commercio.ca/city-images/milton.jpeg"],
      },
      robots: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
      other: {
        "og:locale": "en_CA",
        "og:type": "website",
      },
    };
  }

  const title =
    filters.mlsStatus === "Price Change"
      ? `${actualTotal} ${location} Businesses for Sale | Price Dropped`
      : `${!filters.minBeds ? actualTotal?.toLocaleString() : ""} ${
          filters.minBeds ? `${filters.minBeds} Bedroom` : ""
        } ${filters.propertyType || "Businesses"} ${
          filters.transactionType
        } in ${location}`;

  const description =
    filters.mlsStatus === "Price Change"
      ? `${actualTotal}+ price-reduced businesses in ${location}. Find price reduced businesses on Commercio. Don't miss out.`
      : generateSubtitle(filters, total);

  return {
    title,
    description,
    alternates: {
      canonical: `https://commercio.ca${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `https://commercio.ca${canonicalPath}`,
      siteName: "Commercio",
      type: "website",
      images: [
        {
          url: "https://commercio.ca/city-images/milton.jpeg",
          width: 1200,
          height: 630,
          alt: `Real Estate Listings in ${location}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://commercio.ca/city-images/milton.jpeg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "og:locale": "en_CA",
      "og:type": "website",
    },
  };
};
