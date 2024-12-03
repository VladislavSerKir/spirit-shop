import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types/store/productStoreType";
import { ISuccessResponse, TError } from "../../types";
import cartService from "../../service/cart.service";
import { toast } from "react-toastify";
import { refreshCart, setCartToNull } from "../reducers/cartReducer";
import { ii18n } from "../../i18n";
import { clearUserData } from "../reducers/userReducer";
import { setPurchaseToNull } from "../reducers/orderReducer";
import { ICart } from "../../types/store/cartStoreType";

export const addProductToCart = createAsyncThunk<
  IProduct,
  IProduct,
  { rejectValue: TError }
>("cart/add", async function (product, { dispatch, rejectWithValue }) {
  const response = await cartService.addProductToCartRequest(product);

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Product has not been added to cart, check if you are logged in")}`
      );
    }

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
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Product has not been removed from cart, check if you are logged in")}`
      );
    }

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
  ISuccessResponse,
  undefined,
  { rejectValue: TError }
>("cart/clear", async function (_, { dispatch, rejectWithValue }) {
  const response = await cartService.clearCartRequest();

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Cart has not been cleared, check if you are logged in")}`
      );
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method clearCart",
    });
  }

  const data: ISuccessResponse = await response.json();
  dispatch(refreshCart(data));
  toast.info(`${ii18n.t("Cart cleared")}`);
  return data;
});

export const getCart = createAsyncThunk<ICart, undefined, { rejectValue: any }>(
  "cart/getCart",
  async function (_, { dispatch, rejectWithValue }) {
    const response = await cartService.getCartRequest();
    if (!response.ok) {
      return rejectWithValue({
        status: response.status,
        message: "Server Error, take a look on method getCart",
      });
    }
    const data: any = await response.json();
    return data;
  }
);
