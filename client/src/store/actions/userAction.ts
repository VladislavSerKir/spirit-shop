import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../service/auth.service";
import history from "../../utils/history";
import axios from "axios";
import {
  TError,
  TResponseWithoutPayload,
  TUser,
  TUserFetchResponse,
} from "../../types";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  setAuthChecked,
  setUser,
  setUserError,
  setUserRequest,
} from "../reducers/userReducer";
import { TUserData, TUserEditResponse } from "../../types/userType";

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
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
  "user/getUser",
  async function (_, { dispatch }) {
    dispatch(setUserRequest(true));
    return authService
      .userRequest()
      .then((user: TUserFetchResponse) => {
        dispatch(setUser(user));
      })
      .catch((err: TError) => {
        dispatch(setUserError(err));
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
>("user/onLogin", async function (user, { rejectWithValue }) {
  const response = await authService.loginRequest(user);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onLogin",
    });
  }

  const data: TUserEditResponse = await response.json();
  const accessToken = data.accessToken.split("Bearer ")[1];
  const refreshToken = data.refreshToken;

  setCookie("accessToken", accessToken, {});
  setCookie("refreshToken", refreshToken, {});

  return data;
});

export const onLogout = createAsyncThunk<
  TResponseWithoutPayload,
  undefined,
  { rejectValue: TError }
>("user/onLogout", async function (_, { rejectWithValue }) {
  const response = await authService.logoutRequest();

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onLogout",
    });
  }

  deleteCookie("refreshToken");
  deleteCookie("accessToken");

  const data: TResponseWithoutPayload = await response.json();

  return data;
});

export const onUpdateUser = createAsyncThunk<
  TUserEditResponse,
  TUserData,
  { rejectValue: TError }
>("user/onUpdateUser", async function (user, { rejectWithValue }) {
  const response = await authService.editRequest(user);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onUpdateUser",
    });
  }
  const data: TUserEditResponse = await response.json();
  return data;
});

// export const refreshAccessToken = createAsyncThunk(
//   "auth/refreshAccessToken",
//   async (refreshToken, { dispatch, getState }) => {
//     try {
//       const response = await axios.post("/token", {
//         refreshToken,
//       });

//       const newAccessToken = response.data.accessToken;

//       dispatch(updateAccessToken(newAccessToken));

//       return newAccessToken;
//     } catch (error) {
//       dispatch(logout());
//       throw error;
//     }
//   }
// );

// const authRequested = createAction("users/authRequested");
