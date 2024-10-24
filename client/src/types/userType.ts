import { TError, TUser } from ".";
import { IProduct } from "./productType";

export type TUserData = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role: string;
  avatar: string;
  cart: TCartItem | null | "" | any;
};

export type TCartItem = {
  id: number;
  quantity: number;
  product: IProduct;
};

export type TUserDataRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role?: string;
};

export type TUserState = {
  isAuthChecked: boolean;
  userData: TUserData;
  userUpdated: boolean;
  registerError: null | undefined | TError;
  registerRequest: boolean;
  loginError: null | undefined | TError;
  loginRequest: boolean;
  logoutError: null | undefined | TError;
  logoutRequest: boolean;
  updateError: null | undefined | TError;
  updateRequest: boolean;
  userError: null | undefined | TError;
  userRequest: boolean;
};

export type TUserFetchResponse = {
  success: boolean;
  user: TUser;
};

export type TUserEditResponse = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role: string;
} & TRefreshToken;

export type TRefreshToken = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};
