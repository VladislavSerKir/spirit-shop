import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPurchase } from "../../types/orderType";
import { ICartParams } from "../../types/productType";
import { TError } from "../../types";
import orderService from "../../service/order.service";
import { refreshCart } from "../reducers/userReducer";
import { toast } from "react-toastify";

export const submitPurchase = createAsyncThunk<
  TPurchase,
  ICartParams,
  { rejectValue: TError }
>("order/purchase", async function (params, { dispatch, rejectWithValue }) {
  const response = await orderService.submitPurchaseRequest(params);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method submitPurchase",
    });
  }
  const data: TPurchase = await response.json();
  dispatch(refreshCart(data));
  toast.success(`Thank you for purchase`);
  return data;
});
