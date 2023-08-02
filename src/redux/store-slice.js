import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  url: {},
  genres: {},
};

const homeSlice = createSlice({
  name: "home slice",
  initialState: initialValue,
  reducers: {
    getApiConfiguration: (state, { payload }) => {
      state.url = payload;
    },
    getGenres: (state, { payload }) => {
      state.genres = payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;
export default homeSlice.reducer;
