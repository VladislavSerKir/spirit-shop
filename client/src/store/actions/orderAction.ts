import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICartParams } from "../../types/store/productStoreType";
import { TError } from "../../types";
import orderService from "../../service/order.service";
import { toast } from "react-toastify";
import { refreshCart } from "../reducers/cartReducer";
import { IPurchase } from "../../types/store/orderStoreType";
import { ii18n } from "../../i18n";

export const submitPurchase = createAsyncThunk<
  IPurchase,
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
  const data: IPurchase = await response.json();
  dispatch(refreshCart(data));
  toast.success(`${ii18n.t("Thank you for purchase")}`);
  return data;
});
