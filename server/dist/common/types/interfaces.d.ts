import { Review } from 'src/datalake/review/entities/review.entity';
export interface IAccessToken {
    access_token: string;
}
export declare class UpdatedAccessTokenResponse {
    updatedAccessToken: string;
}
export interface IAccessRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}
export declare class AccessRefreshTokenResponse {
    accessToken: string;
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
export declare class SuccessResponse {
    success: boolean;
}
export declare class LikeDislikeProductResponse {
    id: number;
    email: string;
}
export declare class LikeDislikeReviewResponse extends LikeDislikeProductResponse {
}
export interface IRemoveProduct {
    id: number;
}
export interface IRemoveCategory {
    id: number;
}
export declare class RemoveProduct {
    id: number;
}
export declare class RemoveCategory extends RemoveProduct {
}
export declare class RemoveReview extends RemoveProduct {
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
declare enum ContentType {
    FORM_URLENCODED = "application/x-www-form-urlencoded",
    JSON = "application/json",
    TEXT = "text/plain"
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
export declare class BasicUserInfoHiddenResponse {
    id: number;
    hideProfile: boolean;
}
export declare class BasicUserInfoResponse {
    id: number | null;
    firstName: string;
    lastName: string;
    avatar: string;
    whenRegistered: string | Date;
    firstOrderDate: string | Date;
    totalOrders: number;
    totalReviews: number;
    helpfulReviews: number;
    totalBoughtProducts: number;
    mostBuyableProduct: IMostBuyableProduct | null;
    userReviews: Review[] | null;
    userOrders: IUserOrders[] | [];
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
export interface IChartDataPeriodResponse {
    startDate: string;
    endDate: string;
    revenue: number;
    soldProducts: number;
    reviews: number;
    newUser: number;
}
export {};
