import { TError, TUser } from "..";
import { IPurchase } from "./orderStoreType";
import { IProduct } from "./productStoreType";

export interface IUserData {
  id?: number;
  favourite: IProduct[] | null | "" | any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  role: string;
  avatar: string;
  purchase?: IPurchase;
  createdAt?: string | undefined;
  active?: boolean;
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
  allUsersData: IUserData[] | [];
  userUpdated: boolean;
  logoutError: null | undefined | TError;
  logoutRequest: boolean;
  updateError: null | undefined | TError;
  updateRequest: boolean;
  userError: null | undefined | TError;
  userRequest: boolean;
  usersRequest: boolean;
  allUsersRequest: boolean;
  usersError: null | undefined | TError;
  isFadingOut: boolean;
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
  favourite: IProduct[];
} & TRefreshToken;

export type TRefreshToken = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};

export interface SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
}

export interface SigninDto {
  email: string;
  password: string;
}

export interface LogoutDto {
  email: string;
}

export interface AssignAdminDto {
  id: number;
  role: string;
}

export interface IAssignAdminResponse extends AssignAdminDto {}

export interface ManageAccountDto {
  id: number;
  active: boolean;
}

export interface IManageAccountResponse extends ManageAccountDto {}

export interface ValidateCodeDto {
  code: string;
}

export interface LoginYandexDto {
  code: string;
}

export interface LoginGoogleDto {
  access_token: string;
}
