import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError } from "../../types";
import { toast } from "react-toastify";
import { ii18n } from "../../i18n";
import { clearUserData } from "../reducers/userReducer";
import { setCartToNull } from "../reducers/cartReducer";
import { setPurchaseToNull } from "../reducers/orderReducer";
import { setChartsDataRequest } from "../reducers/serviceReducer";
import serviceService from "../../service/service.service";

export const getChartsData = createAsyncThunk<
  any,
  undefined,
  { rejectValue: TError }
>("service/getChartsData", async function (_, { dispatch, rejectWithValue }) {
  dispatch(setChartsDataRequest(true));
  const response = await serviceService.getChartsDataRequest();

  if (!response.ok) {
    if (response.status === 400) {
      toast.error(`${ii18n.t("Error occured")}`);
    }

    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Error to get shop statistic, check if you are logged in")}`
      );
    }

    if (response.status === 403) {
      toast.error(`${ii18n.t("Action forbidden")}`);
    }

    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getChartsData",
    });
  }

  const data: any = await response.json();
  // dispatch(setChartsData(data));
  dispatch(setChartsDataRequest(false));
  return data;
});
