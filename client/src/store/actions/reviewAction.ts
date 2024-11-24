import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError } from "../../types";
import { toast } from "react-toastify";
import { ii18n } from "../../i18n";
import { clearUserData } from "../reducers/userReducer";
import { setCartToNull } from "../reducers/cartReducer";
import { setPurchaseToNull } from "../reducers/orderReducer";
import reviewService from "../../service/review.service";
import { updateReview } from "../reducers/reviewReducer";

export const getAllReviews = createAsyncThunk<
  any,
  undefined,
  { rejectValue: TError }
>("review/get", async function (_, { dispatch, rejectWithValue }) {
  const response = await reviewService.getAllReviewsRequest();

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getAllReviews",
    });
  }

  const data: any = await response.json();
  return data;
});

export const rateProduct = createAsyncThunk<any, any, { rejectValue: TError }>(
  "review/rate",
  async function (body, { dispatch, rejectWithValue }) {
    const response = await reviewService.rateProductRequest(body);

    if (!response.ok) {
      if (response.status === 401) {
        dispatch(clearUserData());
        dispatch(setCartToNull());
        dispatch(setPurchaseToNull());
        toast.warn(
          `${ii18n.t("Rate has not been added, check if you are logged in")}`
        );
      }

      if (response.status === 403) {
        toast.warn(
          `${ii18n.t("You can not rate product you have not bought yet")}`
        );
      }

      return rejectWithValue({
        status: response.status,
        message: "Server Error, take a look on method rateProduct",
      });
    }

    const data: any = await response.json();
    dispatch(updateReview(data));
    toast.info(`${ii18n.t("Product rated")}`);
    return data;
  }
);

export const commentProduct = createAsyncThunk<
  any,
  any,
  { rejectValue: TError }
>("review/comment", async function (body, { dispatch, rejectWithValue }) {
  const response = await reviewService.commentProductRequest(body);

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Comment has not been added, check if you are logged in")}`
      );
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method commentProduct",
    });
  }

  const data: any = await response.json();
  // dispatch(updateReview(data));
  toast.info(`${ii18n.t("Product commented")}`);
  return data;
});
