import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../service/auth.service";
// import axios from "axios";
import { TError, TResponseWithoutPayload } from "../../types";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  clearUserData,
  setAuthChecked,
  setAvatar,
  setUser,
  setUserError,
  setUserRequest,
} from "../reducers/userReducer";
import { TAvatar, TUserData, TUserEditResponse } from "../../types/userType";
import { toast } from "react-toastify";

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
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
  "user/getUser",
  async function (_, { dispatch }) {
    dispatch(setUserRequest(true));
    return authService
      .userRequest()
      .then((user: TUserData) => {
        console.log(user);
        dispatch(setUser(user));
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
>("user/onRegister", async function (user, { rejectWithValue }) {
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
>("user/onLogin", async function (user, { dispatch, rejectWithValue }) {
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
  "user/onLogout",
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

export const onUpdateUser = createAsyncThunk<
  TUserEditResponse,
  TUserData,
  { rejectValue: TError }
>("user/onUpdateUser", async function (user, { rejectWithValue }) {
  const response = await authService.editRequest(user);
  if (!response.ok) {
    toast.error(`Eather user with email exist or password is too short`);
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onUpdateUser",
    });
  }
  const data: TUserEditResponse = await response.json();
  toast.success(`Profile changed`);
  return data;
});

export const editAvatar = createAsyncThunk<
  TAvatar,
  TAvatar,
  { rejectValue: TError }
>("user/editAvatar", async function (user, { dispatch, rejectWithValue }) {
  const response = await authService.editAvatarRequest(user);
  if (!response.ok) {
    toast.error(`Error to change avatar`);
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method editAvatar",
    });
  }
  const data: TAvatar = await response.json();
  dispatch(setAvatar(data));
  toast.success(`Avatar changed`);
  return data;
});
