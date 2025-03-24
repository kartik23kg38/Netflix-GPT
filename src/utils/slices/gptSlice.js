import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMoviesAdded: null,
    gptRawMovies: null,
    gptTMDBMoviesAdded: null,
  },
  reducers: {
    gptSearchToggler: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMoviesResults: (state, action) => {
      const { rawMovies, tmdbMovies } = action.payload; // ✅ Separate data
      state.gptRawMovies = rawMovies;                   // ✅ Storing raw movie names
      state.gptTMDBMoviesAdded = tmdbMovies;                // ✅ Storing TMDB movie results
    }
  },
});

export const { gptSearchToggler, addGptMoviesResults } = gptSlice.actions;

export default gptSlice.reducer;
