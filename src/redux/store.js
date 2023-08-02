import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./store-slice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
