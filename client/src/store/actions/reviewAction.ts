import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError } from "../../types";
import { toast } from "react-toastify";
import { ii18n } from "../../i18n";
import { clearUserData } from "../reducers/userReducer";
import { setCartToNull } from "../reducers/cartReducer";
import { setPurchaseToNull } from "../reducers/orderReducer";
import reviewService from "../../service/review.service";
import {
  setDislikeReview,
  setLikeReview,
  updateCommentReview,
  updateRateReview,
} from "../reducers/reviewReducer";
import {
  GiveCommentDto,
  GiveRateDto,
  ICommentResponse,
  ILikeDislikeReviewResponse,
  IRateResponse,
  IReview,
} from "../../types/store/reviewStoreType";

export const getAllReviews = createAsyncThunk<
  IReview[],
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

  const data: IReview[] = await response.json();
  return data;
});

export const rateProduct = createAsyncThunk<
  IRateResponse,
  GiveRateDto,
  { rejectValue: TError }
>("review/rate", async function (body, { dispatch, rejectWithValue }) {
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

  const data: IRateResponse = await response.json();
  dispatch(updateRateReview(data));
  toast.info(`${ii18n.t("Product rated")}`);
  return data;
});

export const commentProduct = createAsyncThunk<
  ICommentResponse,
  GiveCommentDto,
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

    if (response.status === 403) {
      toast.warn(
        `${ii18n.t("You can not comment product you have not bought yet")}`
      );
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method commentProduct",
    });
  }

  const data: ICommentResponse = await response.json();
  dispatch(updateCommentReview(data));
  toast.info(`${ii18n.t("Product commented")}`);
  return data;
});

export const likeReview = createAsyncThunk<
  ILikeDislikeReviewResponse,
  number,
  { rejectValue: TError }
>("product/like", async function (body, { dispatch, rejectWithValue }) {
  const response = await reviewService.likeReviewRequest(body);

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Review has not been liked, check if you are logged in")}`
      );
    }

    if (response.status === 400) {
      toast.warn(`${ii18n.t("You can not like your own review")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method likeReview",
    });
  }
  const data: ILikeDislikeReviewResponse = await response.json();
  dispatch(setLikeReview(data));
  toast.info(`${ii18n.t("Review liked")}`);
  return data;
});

export const dislikeReview = createAsyncThunk<
  ILikeDislikeReviewResponse,
  number,
  { rejectValue: TError }
>("product/dislike", async function (body, { dispatch, rejectWithValue }) {
  const response = await reviewService.dislikeReviewRequest(body);

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method dislikeReview",
    });
  }
  const data: ILikeDislikeReviewResponse = await response.json();
  dispatch(setDislikeReview(data));
  return data;
});
