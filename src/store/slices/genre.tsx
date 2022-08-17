import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { GenreType } from "types/Genre";
import { MEDIA_TYPE } from "types/Movie";
import { axiosInstance } from "utils/axios";

// Define a type for the slice state
interface GenreState {
  movie: GenreType[];
  tv: GenreType[];
}

interface CustomGenresResult {
  result: GenreType[];
  mediaType: MEDIA_TYPE;
}

// Define the initial state using that type
const initialState: GenreState = { movie: [], tv: [] };

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getGenres.fulfilled,
      (state: GenreState, { payload }: { payload: CustomGenresResult }) => {
        state[payload.mediaType] = payload.result;
      }
    );
    builder.addCase(getGenres.rejected, (state: GenreState, action) => {});
  },
});

export const getGenres = createAsyncThunk<
  CustomGenresResult,
  { mediaType: MEDIA_TYPE }
>("/genre", async ({ mediaType }) => {
  const response = await axiosInstance.get(`/genre/${mediaType}/list`);
  return { result: response.data.genres, mediaType };
});

export default genreSlice.reducer;
