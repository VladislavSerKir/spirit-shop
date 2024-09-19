import { TError, TUser } from ".";

export type TUserState = {
  isAuthChecked: boolean;
  userData: { name: string; email: string };
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
  success: boolean;
  user: TUser;
} & TRefreshToken;

export type TRefreshToken = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};
