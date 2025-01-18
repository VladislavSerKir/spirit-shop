import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllReviews } from "../actions/reviewAction";
import {
  IReview,
  IReviewLikePayload,
  IReviewState,
} from "../../types/store/reviewStoreType";

const reviewState: IReviewState = {
  review: [],
  success: false,
  reviewRequest: false,
  reviewErrorMessage: null,
  filterRate: null,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState: reviewState,
  reducers: {
    setReviewRequest: (state, action: PayloadAction<boolean>) => {
      state.reviewRequest = action.payload;
    },
    setFilterRate: (state, action: PayloadAction<number>) => {
      state.filterRate = action.payload;
    },
    setFilterRateToNull: (state) => {
      state.filterRate = null;
    },
    updateRateReview: (state, action: PayloadAction<Partial<IReview>>) => {
      const updatedReview = state.review.filter(
        (c) => c.id === action.payload.id
      );
      if (updatedReview.length === 0) {
        state.review = [...state.review, { ...action.payload } as IReview];
      } else {
        updatedReview[0].rate = action.payload.rate;

        state.review = [
          ...state.review.filter((c) => c.id !== action.payload.id),
          { ...updatedReview[0] } as IReview,
        ];
      }
    },
    updateCommentReview: (state, action: PayloadAction<Partial<IReview>>) => {
      const updatedReview = state.review.filter(
        (c) => c.id === action.payload.id
      );
      if (updatedReview.length === 0) {
        state.review = [...state.review, { ...action.payload } as IReview];
      } else {
        updatedReview[0].comment = action.payload.comment;

        state.review = [
          ...state.review.filter((c) => c.id !== action.payload.id),
          { ...updatedReview[0] } as IReview,
        ];
      }
    },
    updateReview: (state, action: PayloadAction<Partial<IReview>>) => {
      const updatedReview = state.review.filter(
        (c) => c.id === action.payload.id
      );
      if (updatedReview.length === 0) {
        state.review = [...state.review, { ...action.payload } as IReview];
      } else {
        updatedReview[0].comment = action.payload.comment;
        updatedReview[0].rate = action.payload.rate;

        state.review = [
          ...state.review.filter((c) => c.id !== action.payload.id),
          { ...updatedReview[0] } as IReview,
        ];
      }
    },
    setLikeReview: (
      state,
      action: PayloadAction<Partial<IReviewLikePayload>>
    ) => {
      const updatedReview = state.review.map((review) => {
        if (review.id === action.payload.id) {
          return {
            ...review,
            helpful: [...review.helpful, { email: action.payload.email }],
          };
        }

        return review;
      });

      state.review = updatedReview;
    },
    setDislikeReview: (
      state,
      action: PayloadAction<Partial<IReviewLikePayload>>
    ) => {
      const updatedReview = state.review.map((review) => {
        if (review.id === action.payload.id) {
          const newUserLikesArr = review.helpful.filter(
            (user) => user.email !== action.payload.email
          );

          return {
            ...review,
            helpful: newUserLikesArr,
          };
        }

        return review;
      });

      state.review = updatedReview;
    },
    removeReview: (state, action: PayloadAction<number>) => {
      state.review = [...state.review].filter(
        (item) => item.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllReviews.pending, (state) => {
      state.reviewRequest = true;
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.review = action.payload;
      state.success = true;
      state.reviewRequest = false;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.reviewErrorMessage = action.payload;
      state.review = [];
      state.reviewRequest = false;
    });
  },
});

export const {
  setReviewRequest,
  updateRateReview,
  updateCommentReview,
  updateReview,
  setLikeReview,
  setDislikeReview,
  removeReview,
  setFilterRate,
  setFilterRateToNull,
} = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;
