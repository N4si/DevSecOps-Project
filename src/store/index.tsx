import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counter";
import configurationReducer from "./slices/configuration";
import genreReducer from "./slices/genre";

const store = configureStore({
  reducer: {
    configuration: configurationReducer,
    genres: genreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
