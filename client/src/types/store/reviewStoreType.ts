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
  helpful: IReviewUser[] | [];
}

export interface IReviewUser {
  email: string | undefined;
}

export interface IReviewLikePayload {
  id: number;
  email: string;
}

export interface IRateResponse {
  id: number;
  rate: number;
}

export interface ICommentResponse {
  id: number;
  comment: string;
}

export interface GiveRateDto {
  productId: number;
  rate: number;
}

export interface GiveCommentDto {
  productId: number;
  comment: string;
}

export interface ILikeDislikeReviewResponse {
  id: number;
  email: string;
}
