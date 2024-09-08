import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosiInstance from "../../api/axios";
export const getMovieById = createAsyncThunk(
  "movieDetails",
  async (movieID) => {
    try {
      const response = await axiosiInstance.get(`movie/${movieID}`);
      const movie = response.data;
      return movie;
    } catch (e) {
      return e;
    }
  }
);
export const movieDetails = createSlice({
  name: "movieDetails",
  initialState: {
    movie: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.movie = { ...action.payload };
        state.status = "succeeded";
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.status = "failed";
        console.error(action.error);
      });
  },
});
