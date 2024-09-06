import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./slices/fav.slice";

export const store = configureStore({
  reducer: {
    fav: favSlice.reducer,
  },
});
