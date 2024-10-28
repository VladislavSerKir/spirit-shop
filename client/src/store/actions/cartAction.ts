import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types/productType";
import { TError } from "../../types";
import cartService from "../../service/cart.service";
import { refreshCart } from "../reducers/userReducer";
import { toast } from "react-toastify";

export const addProductToCart = createAsyncThunk<
  IProduct,
  IProduct,
  { rejectValue: TError }
>("cart/add", async function (product, { dispatch, rejectWithValue }) {
  const response = await cartService.addProductToCartRequest(product);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method addProductToCart",
    });
  }
  const data: IProduct = await response.json();
  dispatch(refreshCart(data));
  toast.success(`Product added to cart`);
  return data;
});

export const removeProductFromCart = createAsyncThunk<
  IProduct,
  IProduct,
  { rejectValue: TError }
>("cart/remove", async function (product, { dispatch, rejectWithValue }) {
  const response = await cartService.removeProductFromCartRequest(product);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method removeProductFromCart",
    });
  }
  const data: IProduct = await response.json();
  dispatch(refreshCart(data));
  toast.info(`Product removed from cart`);
  return data;
});

export const clearCart = createAsyncThunk<
  { success: true },
  undefined,
  { rejectValue: TError }
>("cart/clear", async function (_, { dispatch, rejectWithValue }) {
  const response = await cartService.clearCartRequest();

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method clearCart",
    });
  }
  const data: { success: true } = await response.json();
  dispatch(refreshCart(data));
  toast.info(`Cart cleared`);
  return data;
});
