import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { onLogin, onRegister } from "../actions/authAction";
import { IAuthState } from "../../types/store/authStoreType";

const authState: IAuthState = {
  isAuthChecked: false,
  registerError: null,
  registerRequest: false,
  loginError: null,
  loginRequest: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onRegister.pending, (state) => {
      state.registerRequest = true;
    });
    builder.addCase(onRegister.fulfilled, (state) => {
      state.registerRequest = false;
    });
    builder.addCase(onRegister.rejected, (state, action) => {
      state.registerError = action.payload;
      state.registerRequest = false;
    });
    builder.addCase(onLogin.pending, (state) => {
      state.loginRequest = true;
    });
    builder.addCase(onLogin.fulfilled, (state) => {
      state.loginRequest = false;
    });
    builder.addCase(onLogin.rejected, (state, action) => {
      state.loginError = action.payload;
      state.loginRequest = false;
    });
  },
});

export const { setAuthChecked } = authSlice.actions;
export const authReducer = authSlice.reducer;
