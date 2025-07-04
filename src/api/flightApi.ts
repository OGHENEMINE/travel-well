"use client";

import axios from "@/api/axios";
import {Airport} from "@/components/common/AirportComboBox";

export interface SearchFlightParams {
    fromId: string;
    toId: string;
    cabinClass: string;
    stops?: string;
    pageNo?: string;
    sort?: string;
    currency_code?: string;
    departDate?: string | Date; // Optional, if needed for flight search
    returnDate?: string | Date; // Optional, if needed for round trip flights
}

export interface SearchLocationResponse {
    status: boolean;
    message: string;
    data: Airport[];
}

export interface SearchFlightResponse {
    status: boolean;
    message: string;
    data: any; // Replace with proper type when available
}

export const searchLocationApi = async (query: string): Promise<SearchLocationResponse> => {
    const res = await axios.get("flights/searchDestination", {
        params: {query},
    });
    return res.data;
};

export const searchFlightApi = async (params: SearchFlightParams): Promise<SearchFlightResponse> => {
    const res = await axios.get("flights/searchFlights", {
        params: {
            fromId: params.fromId,
            toId: params.toId,
            stops: params.stops || "none",
            pageNo: params.pageNo || "1",
            sort: params.sort || "BEST",
            cabinClass: params.cabinClass,
            currency_code: params.currency_code || "NGN",
            departDate: params.departDate ? params.departDate : undefined,
            returnDate: params.returnDate ? params.returnDate : undefined,
        },
    });
    return res.data;
};