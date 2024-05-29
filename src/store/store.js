import { configureStore } from "@reduxjs/toolkit";
import movieflixReducer from "./movieflixSlice";

export const store = configureStore({
  reducer: {
    movieflixData: movieflixReducer,
  },
});
