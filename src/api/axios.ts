import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://booking-com15.p.rapidapi.com/api/v1/"
const rapidApiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY ?? "";
const rapidApiHost = process.env.NEXT_PUBLIC_RAPIDAPI_HOST ?? ""

export default axios.create({
    baseURL,
    headers: {
    'x-rapidapi-key': rapidApiKey,
    'x-rapidapi-host': rapidApiHost
  }
})