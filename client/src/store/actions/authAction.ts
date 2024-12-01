import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  clearUserData,
  setUser,
  setUserError,
  setUserRequest,
} from "../reducers/userReducer";
import authService from "../../service/auth.service";
import { IUserData, TUserEditResponse } from "../../types/store/userStoreType";
import { setPurchaseToNull } from "../reducers/orderReducer";
import { TError, TResponseWithoutPayload } from "../../types";
import { setAuthChecked } from "../reducers/authReducer";
import { getCart } from "./cartAction";
import { setCartToNull } from "../reducers/cartReducer";
import { toast } from "react-toastify";
import { ii18n } from "../../i18n";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async function (_, { dispatch }) {
    if (getCookie("accessToken") !== null) {
      dispatch(getUser());
      dispatch(setAuthChecked(true));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async function (_, { dispatch }) {
    dispatch(setUserRequest(true));
    return authService
      .userRequest()
      .then((user: IUserData) => {
        dispatch(setUser(user));
        dispatch(getCart());
      })
      .catch((err: any) => {
        dispatch(setUserError(err.message));
      })
      .finally(() => {
        dispatch(setUserRequest(false));
      });
  }
);

export const onRegister = createAsyncThunk<
  TUserEditResponse,
  IUserData,
  { rejectValue: TError }
>("auth/onRegister", async function (user, { dispatch, rejectWithValue }) {
  const response = await authService.registerRequest(user);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onRegister",
    });
  }

  const data: TUserEditResponse = await response.json();
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;

  setCookie("accessToken", accessToken, {});
  setCookie("refreshToken", refreshToken, {});

  dispatch(getUser());
  dispatch(setAuthChecked(true));

  return data;
});

export const onLogin = createAsyncThunk<
  TUserEditResponse,
  IUserData,
  { rejectValue: TError }
>("auth/onLogin", async function (user, { dispatch, rejectWithValue }) {
  const response = await authService.loginRequest(user);

  if (!response.ok) {
    if (response.status === 401) {
      toast.error(`${ii18n.t("Incorrect email or password")}`);
    }

    if (response.status === 403) {
      toast.error(`${ii18n.t("User deactivated")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onLogin",
    });
  }

  const data: TUserEditResponse = await response.json();
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;

  setCookie("accessToken", accessToken, {});
  setCookie("refreshToken", refreshToken, {});

  dispatch(getUser());
  dispatch(setAuthChecked(true));
  return data;
});

export const onLogout = createAsyncThunk<
  TResponseWithoutPayload,
  any,
  { rejectValue: TError }
>(
  "auth/onLogout",
  async function (user: string, { dispatch, rejectWithValue }) {
    const response = await authService.logoutRequest(user);
    if (!response.ok) {
      return rejectWithValue({
        status: response.status,
        message: "Server Error, take a look on method onLogout",
      });
    }

    deleteCookie("refreshToken");
    deleteCookie("accessToken");

    dispatch(clearUserData());
    dispatch(setCartToNull());
    dispatch(setPurchaseToNull());
    const data: TResponseWithoutPayload = await response.json();

    return data;
  }
);

export const sendCode = createAsyncThunk<
  TUserEditResponse,
  any,
  { rejectValue: TError }
>("auth/send-code", async function (body, { dispatch, rejectWithValue }) {
  const response = await authService.sendCodeRequest(body);

  if (!response.ok) {
    if (response.status === 403) {
      toast.error(`${ii18n.t("User deactivated")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method sendCode",
    });
  }

  const data: TUserEditResponse = await response.json();
  return data;
});

export const loginYandex = createAsyncThunk<
  TUserEditResponse,
  any,
  { rejectValue: TError }
>("auth/login-yandex", async function (body, { dispatch, rejectWithValue }) {
  const response = await authService.loginYandexRequest(body);

  if (!response.ok) {
    if (response.status === 403) {
      toast.error(`${ii18n.t("User deactivated")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method loginYandex",
    });
  }

  const data: TUserEditResponse = await response.json();
  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;

  setCookie("accessToken", accessToken, {});
  setCookie("refreshToken", refreshToken, {});

  dispatch(getUser());
  dispatch(setAuthChecked(true));
  return data;
});
