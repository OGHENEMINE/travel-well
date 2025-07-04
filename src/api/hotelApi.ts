"use client";

import axios from "@/api/axios";

export interface HotelProperty {
    accessibilityLabel: string;
    property: {
        id: number;
        name: string;
        reviewScore: number;
        reviewScoreWord: string;
        reviewCount: number;
        propertyClass: number;
        countryCode: string;
        photoUrls: string[];
        priceBreakdown: {
            grossPrice: {
                currency: string;
                value: number;
            };
            strikethroughPrice?: {
                currency: string;
                value: number;
            };
        };
        mainPhotoId: number;
        latitude: number;
        longitude: number;
        checkinDate?: string;
        checkoutDate?: string;
        // ...add more fields as needed
    };
}

export interface SearchHotelLocationResponse {
    status: boolean;
    message: string;
    data: {
        hotels: HotelProperty[];
        meta?: unknown;
        appear?: unknown;
    };
}

export interface SearchHotelParams {
    dest_id: string;
    room_qty: number;
    arrival_date?: string;
    departure_date?: string;
    languagecode?: string;
    currency_code?: string;
    location?: string;
}

export interface SearchHotelResponse {
    status: boolean;
    message: string;
    data: {
        hotels: HotelProperty[];
        meta?: unknown;
        appear?: unknown;
    };
}

export const searchHotelLocationApi = async (
    query: string
): Promise<SearchHotelLocationResponse> => {
    const res = await axios.get("/hotels/searchDestination", {
        params: {query},
    });
    return res.data;
};

export const searchHotelApi = async (
    params: SearchHotelParams
): Promise<SearchHotelResponse> => {
    const res = await axios.get("/hotels/searchDestination", {
        params: {
            dest_id: params.dest_id,
            room_qty: params.room_qty,
            languagecode: params.languagecode || "en-us",
            currency_code: params.currency_code || "NGN",
            location: params.location || params.dest_id,
            arrival_date: params.arrival_date,
            departure_date: params.departure_date,
        },
    });
    return res.data;
};
