import { TError } from "..";

export type IReviewState = {
  review: Array<IReview>;
  success: boolean;
  reviewRequest: boolean;
  reviewErrorMessage: null | undefined | string | TError;
};

export interface IReview {
  id: number;
  rate?: number;
  comment?: string;
  product: { id: number };
}
