export interface IAccessToken {
  access_token: string;
}

export interface IHeadersAuthorizationRequest {
  headers: {
    authorization?: string;
  };
}

export interface ISuccessResponse {
  success: boolean;
}

export interface ILikeDislikeProductResponse {
  id: number;
  email: string;
}

export interface ILikeDislikeReviewResponse
  extends ILikeDislikeProductResponse {}

export interface IRemoveProduct {
  id: number;
}

export interface IRemoveCategory {
  id: number;
}

export interface YandexResponseOKInterface {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface YandexUserResponseOKInterface {
  id: string;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  sex: string;
  default_email: string;
  emails: [string];
  psuid: string;
}

export interface GoogleUserResponseOKInterface {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}
