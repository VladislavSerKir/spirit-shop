import { TError } from "..";
import { IProduct } from "../product";

export type IReviewState = {
  review: Array<IReview>;
  success: boolean;
  reviewRequest: boolean;
  reviewErrorMessage: null | undefined | string | TError;
};

export interface IReview {
  id: number;
  user: {
    id?: number;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  rate?: number;
  comment?: string;
  product: IProduct;
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

export interface DeleteReviewDto {
  id: number;
}

export interface IDeleteReviewResponse extends DeleteReviewDto {}
