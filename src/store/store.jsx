import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./slices/fav.slice";
import { movieDetails } from "./slices/movieDetails.slice";

export const store = configureStore({
  reducer: {
    fav: favSlice.reducer,
    movie: movieDetails.reducer 
  },
});
