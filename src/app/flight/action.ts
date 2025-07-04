"use server";

import axios from "@/api/axios";

export const searchLocation = async (data: string) => {
  const res = await axios.get("flights/searchDestination", {
    params: {
      query: data,
    },
  });
  return res.data;
};

export const searchFlight = async (
  from: string,
  to: string,
  cabinClass: string
) => {
  const res = await axios.get("flights/searchFlights", {
    params: {
      fromId: from,
      toId: to,
      stops: "none",
      pageNo: "1",
      sort: "BEST",
      cabinClass: cabinClass,
      currency_code: "NGN",
    },
  });
  return res.data;
};
