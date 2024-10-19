import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TUserData, TUserState } from "../../types/userType";
import { TError } from "../../types";
import {
  onLogin,
  onLogout,
  onRegister,
  onUpdateUser,
} from "../actions/userAction";

const userState: TUserState = {
  isAuthChecked: false,
  userData: {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "",
    cart: null,
  },
  userUpdated: false,
  registerError: null,
  registerRequest: false,
  loginError: null,
  loginRequest: false,
  logoutError: null,
  logoutRequest: false,
  updateError: null,
  updateRequest: false,
  userError: null,
  userRequest: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUserData>) => {
      state.userData.email = action.payload.email;
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.mobileNumber = action.payload.mobileNumber;
      state.userData.role = action.payload.role;
      state.userData.cart = action.payload.cart;
      state.userError = null;
    },
    setUserRequest: (state, action: PayloadAction<boolean>) => {
      state.userRequest = action.payload;
    },
    setUserError: (state, action: PayloadAction<TError>) => {
      state.userError = action.payload;
    },
    setResetUserError: (state) => {
      state.userError = null;
    },
    refreshCart: (state, action: PayloadAction<any>) => {
      state.userData.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onRegister.pending, (state) => {
      state.registerRequest = true;
    });
    builder.addCase(onRegister.fulfilled, (state, action) => {
      state.userData.email = action.payload.email;
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.mobileNumber = action.payload.mobileNumber;
      state.userData.role = action.payload.role;
      state.userError = null;
      state.registerRequest = false;
    });
    builder.addCase(onRegister.rejected, (state, action) => {
      state.registerError = action.payload;
      state.registerRequest = false;
    });
    builder.addCase(onLogin.pending, (state) => {
      state.loginRequest = true;
    });
    builder.addCase(onLogin.fulfilled, (state, action) => {
      state.userData.email = action.payload.email;
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.mobileNumber = action.payload.mobileNumber;
      state.userData.role = action.payload.role;
      state.userError = null;
      state.loginRequest = false;
    });
    builder.addCase(onLogin.rejected, (state, action) => {
      state.loginError = action.payload;
      state.loginRequest = false;
    });
    builder.addCase(onLogout.pending, (state) => {
      state.logoutRequest = true;
    });
    builder.addCase(onLogout.fulfilled, (state) => {
      state.userData.email = "";
      state.userData.firstName = "";
      state.userData.lastName = "";
      state.userData.mobileNumber = "";
      state.userData.role = "";
      state.userUpdated = false;
      state.logoutRequest = false;
    });
    builder.addCase(onLogout.rejected, (state, action) => {
      state.logoutError = action.payload;
      state.logoutRequest = false;
    });
    builder.addCase(onUpdateUser.pending, (state) => {
      state.updateRequest = true;
    });
    builder.addCase(onUpdateUser.fulfilled, (state, action) => {
      state.userData.email = action.payload.email;
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.mobileNumber = action.payload.mobileNumber;
      state.userUpdated = true;
      state.updateRequest = false;
    });
    builder.addCase(onUpdateUser.rejected, (state, action) => {
      state.userError = action.payload;
      state.updateRequest = false;
    });
  },
});

export const {
  setAuthChecked,
  setResetUserError,
  setUserRequest,
  setUserError,
  setUser,
  refreshCart,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
