import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllReviews } from "../actions/reviewAction";
import { IReview, IReviewState } from "../../types/store/reviewStoreType";

const reviewState: IReviewState = {
  review: [],
  success: false,
  reviewRequest: false,
  reviewErrorMessage: null,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState: reviewState,
  reducers: {
    setReviewRequest: (state, action: PayloadAction<boolean>) => {
      state.reviewRequest = action.payload;
    },
    updateReview: (state, action: PayloadAction<Partial<IReview>>) => {
      const updatedReview = state.review.filter(
        (c) => c.id === action.payload.id
      ) as any;
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

export const { setReviewRequest, updateReview } = reviewSlice.actions;
export const reviewReducer = reviewSlice.reducer;
