import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICartParams } from "../../types/store/productStoreType";
import { TError } from "../../types";
import orderService from "../../service/order.service";
import { toast } from "react-toastify";
import { refreshCart, setCartToNull } from "../reducers/cartReducer";
import { IPurchase } from "../../types/store/orderStoreType";
import { ii18n } from "../../i18n";
import { clearUserData } from "../reducers/userReducer";
import { setPurchaseToNull } from "../reducers/orderReducer";

export const getUserOrders = createAsyncThunk<
  IPurchase[],
  undefined,
  { rejectValue: TError }
>("order/getUserOrders", async function (_, { dispatch, rejectWithValue }) {
  const response = await orderService.getUserOrdersRequest();
  if (!response.ok) {
    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getUserOrders",
    });
  }
  const data: IPurchase[] = await response.json();
  return data;
});

export const submitPurchase = createAsyncThunk<
  IPurchase,
  ICartParams,
  { rejectValue: TError }
>("order/purchase", async function (params, { dispatch, rejectWithValue }) {
  const response = await orderService.submitPurchaseRequest(params);

  if (!response.ok) {
    if (response.status === 400) {
      toast.error(`${ii18n.t("Error occured")}`);
    }

    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Order has not been placed, check if you are logged in")}`
      );
    }

    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method submitPurchase",
    });
  }
  const data: IPurchase = await response.json();
  dispatch(refreshCart(data));
  toast.success(`${ii18n.t("Thank you for purchase")}`);
  return data;
});
