"use server";
import { albertaListings, calgaryProperties } from "./routes/fetchRoutes";

export const getFilteredAlbertaData = async (queryParams) => {
  //   try {
  //all the necessary queries possible
  let selectQuery = `${queryParams.city ? `City=${queryParams.city}` : ""}${
    queryParams.saleLease
      ? `${queryParams.city ? "," : ""}TransactionType=${queryParams.saleLease}`
      : ""
  }`;
  let selectOrQuery = "";
  const skipQuery = `${queryParams.offset}`;
  const limitQuery = `${queryParams.limit}`;
  let rangeQuery = [];
  if (queryParams.minListPrice)
    rangeQuery.push(`minListPrice=${queryParams.minListPrice}`);
  if (queryParams.minBaths)
    rangeQuery.push(`minBathroomsTotalInteger=${queryParams.minBaths}`);
  if (queryParams.minBeds)
    rangeQuery.push(`minBedroomsTotal=${queryParams.minBeds}`);

  if (queryParams.propertySubTypes) {
    const houseTypeQuery = queryParams.propertySubTypes
      .map((propertySubType) => `PropertySubType=${propertySubType}`)
      .join(",");
    selectOrQuery += houseTypeQuery;
  }

  if (queryParams.hasBasement) {
    selectQuery += `,Basement1=Apartment`;
  }

  if (queryParams.sepEntrance) {
    selectQuery += `,Basement2=Sep Entrance`;
  }
  if (queryParams.maxListPrice > queryParams.minListPrice) {
    rangeQuery += `,maxListPrice=${queryParams.maxListPrice}`;
  }
  if (queryParams.quadrant) {
    //for now only calgary uses this
    selectQuery += `,District=CAL Zone ${queryParams.quadrant}`;
  }

  //   if (queryParams.priceDecreased) {
  //     selectQuery += `,PriceDecreased=true`;
  //   }

  selectQuery += `,PropertyType=Commercial`;

  let url = "";

  url = albertaListings.properties.replace(
    "$query",
    `?$select=${selectQuery}&$skip=${skipQuery}&$limit=${limitQuery}&$range=${rangeQuery.join(
      ","
    )}&$selectOr=${selectOrQuery}`
  );
  const options = {
    method: "GET",
    // cache: "no-store",
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data.results;
  //   } catch (error) {
  //     throw new Error(`An error happened in getFilteredRetsData: ${error}`);
  //   }
};

export const fetchAlbertaDataFromMLS = async (listingID) => {
  try {
    const queriesArray = [`$select=ListingId=${listingID}`];
    const urlToFetchMLSDetail = albertaListings.properties.replace(
      "$query",
      `?${queriesArray.join("&")}`
    );
    const resMLSDetail = await fetch(urlToFetchMLSDetail);
    const data = await resMLSDetail.json();
    return data.results[0];
  } catch (err) {
    console.log(err);
  }
};
