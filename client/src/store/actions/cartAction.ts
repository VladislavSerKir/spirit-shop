import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types/store/productStoreType";
import { TError } from "../../types";
import cartService from "../../service/cart.service";
import { toast } from "react-toastify";
import { refreshCart } from "../reducers/cartReducer";
import { ii18n } from "../../i18n";

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
  toast.success(`${ii18n.t("Product added to cart")}`);
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
  toast.success(`${ii18n.t("Product removed from cart")}`);
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
  toast.info(`${ii18n.t("Cart cleared")}`);
  return data;
});

export const getCart = createAsyncThunk<any, undefined, { rejectValue: any }>(
  "cart/getCart",
  async function (_, { dispatch, rejectWithValue }) {
    // dispatch(setProductRequest(true));
    const response = await cartService.getCartRequest();
    if (!response.ok) {
      return rejectWithValue({
        status: response.status,
        message: "Server Error, take a look on method getCart",
      });
    }
    const data: any = await response.json();
    // dispatch(setProductRequest(false));
    return data;
  }
);
