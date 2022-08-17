import { CommonTitle } from "types/Movie";

export const API_ENDPOINT_URL = process.env.REACT_APP_API_ENDPOINT_URL;
export const TMDB_V3_API_KEY = process.env.REACT_APP_TMDB_V3_API_KEY;

export const ARROW_MAX_WIDTH = 60;
export const COMMON_TITLES: CommonTitle[] = [
  { name: "Popular", apiString: "popular" },
  { name: "Top Rated", apiString: "top_rated" },
  { name: "Now Playing", apiString: "now_playing" },
  { name: "Upcoming", apiString: "upcoming" },
];

export const YOUTUBE_URL = "https://www.youtube.com/watch?v=";
