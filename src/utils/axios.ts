import axios from "axios";
import { API_ENDPOINT_URL, TMDB_V3_API_KEY } from "constant";

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT_URL,
  params: {
    api_key: TMDB_V3_API_KEY,
  },
});
