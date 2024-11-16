import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderState, IPurchase } from "../../types/store/orderStoreType";
import { getUserOrders, submitPurchase } from "../actions/orderAction";

const orderState: IOrderState = {
  purchase: [],
  success: false,
  orderError: null,
  orderRequest: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: orderState,
  reducers: {
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

    builder.addCase(getUserOrders.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(
      getUserOrders.fulfilled,
      (state, action: PayloadAction<IPurchase[]>) => {
        state.purchase = action.payload;
        state.success = true;
        state.orderError = null;
        state.orderRequest = false;
      }
    );
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.orderError = action.payload;
      state.orderRequest = false;
    });
  },
});

export const { setPurchaseToNull } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
