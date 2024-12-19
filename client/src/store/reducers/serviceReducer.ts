import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IServiceState {
  pathname: string;
  codeSent: boolean;
  resetEmail: string;
  resetPassword: boolean;
}

const serviceState: IServiceState = {
  pathname: "",
  codeSent: false,
  resetEmail: "",
  resetPassword: false,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState: serviceState,
  reducers: {
    updatePathname: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
    setCodeSent: (state, action: PayloadAction<any>) => {
      state.codeSent = action.payload.success;
      state.resetEmail = action.payload.email;
    },
    setResetPassword: (state, action: PayloadAction<any>) => {
      state.resetPassword = action.payload.success;
    },
    setDefaultForm: (state) => {
      state.codeSent = false;
      state.resetEmail = "";
      state.resetPassword = false;
    },
    setCodeExpired: (state) => {
      state.codeSent = false;
      state.resetEmail = "";
    },
  },
});

export const {
  updatePathname,
  setCodeSent,
  setResetPassword,
  setDefaultForm,
  setCodeExpired,
} = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
