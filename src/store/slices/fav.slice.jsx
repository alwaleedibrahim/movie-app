import { createSlice } from "@reduxjs/toolkit";

export const favSlice = createSlice({
  name: "fav",
  initialState: {
    favorites: [],
  },
  reducers: {
    toggleFav: (state, action) => {
      const item = state.favorites.find((f) => f.id == action.payload.id);
      if (!item) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter(
          (f) => f.id != action.payload.id
        );
      }
    },
  },
});

export const { toggleFav } = favSlice.actions;

export default favSlice;
