import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderState, IPurchase } from "../../types/store/orderStoreType";
import { submitPurchase } from "../actions/orderAction";

const orderState: IOrderState = {
  purchase: [],
  orderError: null,
  orderRequest: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: orderState,
  reducers: {
    getOrders: (state, action: PayloadAction<IPurchase[]>) => {
      state.purchase = [...action.payload];
    },
    setPurchaseToNull: (state) => {
      state.purchase = [];
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

export const { getOrders, setPurchaseToNull } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
