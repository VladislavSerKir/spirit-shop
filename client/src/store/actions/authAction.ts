import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  clearUserData,
  setAuthChecked,
  setUser,
  setUserError,
  setUserRequest,
} from "../reducers/userReducer";
import authService from "../../service/auth.service";
import { TUserData, TUserEditResponse } from "../../types/userType";
import { getOrders } from "../reducers/orderReducer";
import { TError, TResponseWithoutPayload } from "../../types";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async function (_, { dispatch }) {
    if (getCookie("accessToken") !== null) {
      dispatch(getUser());
      dispatch(setAuthChecked(true));
    } else {
      // dispatch(onLogout());
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
      .then((user: TUserData) => {
        dispatch(setUser(user));
        dispatch(getOrders(user.purchase));
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
  TUserData,
  { rejectValue: TError }
>("auth/onRegister", async function (user, { rejectWithValue }) {
  const response = await authService.registerRequest(user);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onRegister",
    });
  }

  const data: TUserEditResponse = await response.json();
  const accessToken = data.accessToken.split("Bearer ")[1];
  const refreshToken = data.refreshToken;

  setCookie("accessToken", accessToken, {});
  setCookie("refreshToken", refreshToken, {});

  return data;
});

export const onLogin = createAsyncThunk<
  TUserEditResponse,
  TUserData,
  { rejectValue: TError }
>("auth/onLogin", async function (user, { dispatch, rejectWithValue }) {
  const response = await authService.loginRequest(user);

  if (!response.ok) {
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
    const data: TResponseWithoutPayload = await response.json();

    return data;
  }
);
