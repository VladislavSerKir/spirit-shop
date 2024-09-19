import { TError, TUser } from ".";

export type TUserData = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  mobileNumber?: string;
};

export type TUserDataRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
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
  success: boolean;
  user: TUserData;
} & TRefreshToken;

export type TRefreshToken = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};
