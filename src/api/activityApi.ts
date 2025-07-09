"use client";

import axios from "@/api/axios";

export interface Attraction {
  id: string;
  title: string;
  productId: string;
  cityName: string;
  countryCode: string;
}

export interface ActivityLocation {
  status: boolean;
  message: string;
  data: Attraction[];
}

export const searchActivityLocationApi = async (query: string): Promise<ActivityLocation> => {
  const res = await axios.get("attraction/searchLocation", {
    params: {
      query,
      languagecode: "en-us",
    },
  });
  return res.data;
};

export const searchActivityApi = async (id: string) => {
  const res = await axios.get("attraction/searchAttractions", {
    params: {
      id: id,
      sortBy: "trending",
      page: "1",
      currency_code: "NGN",
      languagecode: "en-us",
    },
  });
  return res.data;
};
