import { ApiProperty } from '@nestjs/swagger';
import { Review } from 'src/datalake/review/entities/review.entity';

export interface IAccessToken {
  access_token: string;
}

export class UpdatedAccessTokenResponse {
  @ApiProperty()
  updatedAccessToken: string;
}

export interface IAccessRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export class AccessRefreshTokenResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export interface IHeadersAuthorizationRequest {
  headers: {
    authorization?: string;
  };
}

export interface ISuccessResponse {
  success: boolean;
}

export class SuccessResponse {
  @ApiProperty()
  success: boolean;
}

export class LikeDislikeProductResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}

export class LikeDislikeReviewResponse extends LikeDislikeProductResponse {}

export interface IRemoveProduct {
  id: number;
}

export interface IRemoveCategory {
  id: number;
}

export class RemoveProduct {
  @ApiProperty()
  id: number;
}

export class RemoveCategory extends RemoveProduct {}

export class RemoveReview extends RemoveProduct {}

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

enum ContentType {
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  JSON = 'application/json',
  TEXT = 'text/plain',
}

export interface IYandexAuthConfig {
  'Content-type': ContentType.FORM_URLENCODED;
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

export class BasicUserInfoHiddenResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  hideProfile: boolean;
}

export class BasicUserInfoResponse {
  @ApiProperty()
  id: number | null;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  whenRegistered: string | Date;

  @ApiProperty()
  firstOrderDate: string | Date;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalReviews: number;

  @ApiProperty()
  helpfulReviews: number;

  @ApiProperty()
  totalBoughtProducts: number;

  @ApiProperty()
  mostBuyableProduct: IMostBuyableProduct | null;

  @ApiProperty()
  userReviews: Review[] | null;

  @ApiProperty()
  userOrders: IUserOrders[] | [];

  @ApiProperty()
  hideProfile: boolean;
}

export interface IMostBuyableProduct {
  name: string;
  image: string;
  times: number;
}

export interface IUserOrders {
  id: number;
  quantity: number;
}
