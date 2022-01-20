import get from "axios";

import HttpError from "../models/http-error.js";

//https://developers.arcgis.com/labs/rest/search-for-an-address/

const getCoordsForAddress = async (address) => {
  const response = await get(
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates",
    {
      params: {
        f: "json",
        singleLine: address,
        outFields: "Match_addr,Addr_type",
      },
    }
  );

  const data = response.data;

  // Check if no matches were found
  if (!data || data.candidates.length === 0) {
    throw new HttpError(
      "Could not find location for the specified address.",
      422
    );
  }

  // Get Latitude
  const lat = response.data.candidates[0].location.y;
  // Get Longitude
  const lng = response.data.candidates[0].location.x;

  return {
    lat,
    lng,
  };
};

export default getCoordsForAddress;
