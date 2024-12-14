import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IServiceState {
  pathname: string;
}

const serviceState: IServiceState = {
  pathname: "",
};

export const serviceSlice = createSlice({
  name: "service",
  initialState: serviceState,
  reducers: {
    updatePathname: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
  },
});

export const { updatePathname } = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
