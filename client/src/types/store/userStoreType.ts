import { TError, TUser } from "..";
import { IProduct } from "./productStoreType";

export interface IUserData {
  favourite: IProduct[] | null | "" | any;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role: string;
  avatar: string;
  purchase?: any;
  createdAt?: string;
}

export type TAvatar = {
  avatar: string;
};

export type TUserDataRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role?: string;
};

export interface IUserState {
  userData: IUserData;
  allUsersData: any;
  userUpdated: boolean;
  logoutError: null | undefined | TError;
  logoutRequest: boolean;
  updateError: null | undefined | TError;
  updateRequest: boolean;
  userError: null | undefined | TError;
  userRequest: boolean;
  usersRequest: boolean;
  usersError: null | undefined | TError;
}

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
  favourite: any;
} & TRefreshToken;

export type TRefreshToken = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};
