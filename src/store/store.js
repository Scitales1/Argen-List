import { configureStore } from "@reduxjs/toolkit";
import { tourReducer } from "./slices/tour-slice";
import { authSlice } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    tours: tourReducer,
    auth: authSlice.reducer,
    user: userReducer,
  },
});
