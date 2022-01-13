//settign up the data layer

import { configureStore } from "@reduxjs/toolkit";
//sepraating the data layer
import navReducer from "./slices/navSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
