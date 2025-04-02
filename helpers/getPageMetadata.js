import capitalizeFirstLetter from "./capitalizeFirstLetter";

// List of major BC cities
const bcCities = [
  "vancouver",
  "victoria",
  "surrey",
  "burnaby",
  "richmond",
  "coquitlam",
  "kelowna",
  "nanaimo",
  "kamloops",
  "abbotsford",
];

function isBritishColumbiaCity(cityName) {
  return bcCities.includes(cityName.toLowerCase());
}

function formatPriceRange(range) {
  switch (range) {
    case "0-500k":
      return "Under $500K";
    case "500k-600k":
      return "from $500K to $600K";
    case "600k-700k":
      return "from $600K to $700K";
    case "700k-800k":
      return "from $700K to $800K";
    case "800k-1mil":
      return "from $800K to $1M";
    case "1mil-1.5mil":
      return "from $1M to $1.5M";
    default:
      return "";
  }
}

function isDubaiCity(cityName) {
  return cityName.toLowerCase() === "dubai";
}

export default function getPageMetadata(
  type,
  cityName,
  totalCount,
  priceRange
) {
  const city = capitalizeFirstLetter(cityName);
  const isBC = isBritishColumbiaCity(cityName);
  const isDubai = isDubaiCity(cityName);
  const propertyTerm = isBC
    ? "Presale"
    : isDubai
    ? "Off Plan Properties"
    : "Pre Construction";
  const province = isBC ? "British Columbia" : "Ontario";

  switch (type) {
    case "Detached":
      return {
        title: `${totalCount} ${propertyTerm} Detached ${
          isDubai ? "Properties" : "Homes"
        } in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} detached ${
          isDubai ? "properties" : "homes"
        } for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for detached ${
          isDubai ? "properties" : "homes"
        } in ${city}`,
      };
    case "Semi-Detached":
      return {
        title: `${totalCount} ${propertyTerm} Semi-Detached Homes in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} semi-detached homes for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for semi-detached homes in ${city}`,
      };
    case "Townhomes":
      return {
        title: `${totalCount} ${propertyTerm} Townhomes in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} townhomes for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for townhomes in ${city}`,
      };
    case "Condo":
      return {
        title: `${totalCount} ${propertyTerm} Condos in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} condos for sale in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability for condos in ${city}`,
      };
    case "price_range":
      const formattedRange = formatPriceRange(priceRange);
      return {
        title: `${totalCount} ${propertyTerm} Homes ${formattedRange} in ${city} (2025)`,
        subtitle: `Find ${propertyTerm.toLowerCase()} homes ${formattedRange} in ${city}, ${province} | Get VIP access to floor plans, pricing, and availability`,
      };
    default:
      return {
        title: `${totalCount} ${propertyTerm} Homes in ${city} (2025)`,
        subtitle: `Top ${totalCount} ${propertyTerm} Homes in ${city}, ${province} | Check out plans, pricing, availability for ${propertyTerm.toLowerCase()} homes in ${city}`,
      };
  }
}
