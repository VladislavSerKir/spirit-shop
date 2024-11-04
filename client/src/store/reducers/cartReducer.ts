import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState } from "../../types/store/cartStoreType";
import { getCart } from "../actions/cartAction";

const cartState: ICartState = {
  cart: null,
  success: false,
  cartRequest: false,
  cartErrorMessage: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    refreshCart: (state, action: PayloadAction<any>) => {
      state.cart.cartItem = action.payload;
    },
    setCartToNull: (state) => {
      state.cart = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.cartRequest = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.success = true;
      state.cartRequest = false;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.cartErrorMessage = action.payload;
      state.success = false;
      state.cart = [];
      state.cartRequest = false;
    });
  },
});

export const { refreshCart, setCartToNull } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
