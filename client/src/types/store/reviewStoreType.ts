import { TError } from "..";

export type IReviewState = {
  review: Array<IReview>;
  success: boolean;
  reviewRequest: boolean;
  reviewErrorMessage: null | undefined | string | TError;
};

export interface IReview {
  id: number;
  user: { email: string; avatar: string; firstName: string; lastName: string };
  createdAt: string;
  rate?: number;
  comment?: string;
  product: { id: number };
}
