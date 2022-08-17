import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "utils/axios";

// Define a type for the slice state
interface ConfigurationState {
  images?: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    // logo_sizes: string[];
    logo_sizes: string;
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys?: string[];
}

// Define the initial state using that type
const initialState: ConfigurationState = {};

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getConfiguration.fulfilled,
      (state: ConfigurationState, { payload }) => {
        state.images = payload.images;
        state.change_keys = payload.change_keys;
      }
    );
    builder.addCase(
      getConfiguration.rejected,
      (state: ConfigurationState, action) => {
        if (action.payload) {
          console.log("Configuration GET Error:", action.payload);
        } else {
          console.error("Configuration GET Error:", action.error);
        }
      }
    );
  },
});

export const getConfiguration = createAsyncThunk<ConfigurationState>(
  "/configuration",
  async () => {
    const response = await axiosInstance.get("/configuration");
    return response.data;
  }
);

export default configurationSlice.reducer;
