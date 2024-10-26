import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder, TPurchase } from "../../types/orderType";
import { submitPurchase } from "../actions/productAction";

const orderState: TOrder = {
  purchase: [],
  orderError: null,
  orderRequest: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: orderState,
  reducers: {
    getOrders: (state, action: PayloadAction<TPurchase[]>) => {
      state.purchase = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitPurchase.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(submitPurchase.fulfilled, (state, action) => {
      state.purchase = [...state.purchase, action.payload];
      state.orderError = null;
      state.orderRequest = false;
    });
    builder.addCase(submitPurchase.rejected, (state, action) => {
      state.orderError = action.payload;
      state.orderRequest = false;
    });
  },
});

export const { getOrders } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
