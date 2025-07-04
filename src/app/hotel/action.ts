"use server";

import axios from "@/api/axios";

export const searchHotelLocation = async (data: string) => {
  return await axios.get("/hotels/searchDestination", {
    params: {
      query: data,
    },
  });
};

export const searchHotel = async (dest_id: string, room_qty: number) => {
  return await axios.get("/hotels/searchDestination", {
    params: {
      dest_id: dest_id,
      room_qty: room_qty,
      languagecode: "en-us",
      currency_code: "NGN",
      location: dest_id,
    },
  });
};
