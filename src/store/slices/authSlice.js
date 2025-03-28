import { createSlice } from "@reduxjs/toolkit";
import { sigInRequest, singUpRequest } from "../thunks/authThunk";
// import SignIn from "../../components/auth/SignIn";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: null,
    token: null,
    isLoading: false,
    isError: null,
  },
  reducers: {
    isAuth: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(singUpRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singUpRequest.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.isLoading = false;
        state.role = action.payload.data.role;
        state.token = action.payload.data.token;
      })
      .addCase(singUpRequest.rejected, (state, action) => {
        console.log("action: ", action);
        state.isLoading = false;
        state.isError = action.payload;
      });
    builder.addCase(sigInRequest.fulfilled, (state, action) => {
      state.role = action.payload.data.role;
    });
  },
});

export const { isAuth } = authSlice.actions;
