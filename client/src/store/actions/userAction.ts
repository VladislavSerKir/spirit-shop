import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError, TUser } from "../../types";
import {
  setAvatar,
  setUsersRequest,
  updateAccountActive,
  updateAdminRole,
} from "../reducers/userReducer";
import {
  IUserData,
  TAvatar,
  TUserEditResponse,
} from "../../types/store/userStoreType";
import { toast } from "react-toastify";
import userService from "../../service/user.service";
import { ii18n } from "../../i18n";

export const onUpdateUser = createAsyncThunk<
  TUserEditResponse,
  IUserData,
  { rejectValue: TError }
>("user/onUpdateUser", async function (user, { rejectWithValue }) {
  const response = await userService.editRequest(user);
  if (!response.ok) {
    toast.error(
      `${ii18n.t("Eather user with email exist or password is too short")}`
    );
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method onUpdateUser",
    });
  }
  const data: TUserEditResponse = await response.json();
  toast.success(`${ii18n.t("Profile changed")}`);
  return data;
});

export const editAvatar = createAsyncThunk<
  TAvatar,
  TAvatar,
  { rejectValue: TError }
>("user/editAvatar", async function (user, { dispatch, rejectWithValue }) {
  const response = await userService.editAvatarRequest(user);
  if (!response.ok) {
    toast.error(`${ii18n.t("Error to change avatar")}`);
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method editAvatar",
    });
  }
  const data: TAvatar = await response.json();
  dispatch(setAvatar(data));
  toast.success(`${ii18n.t("Avatar changed")}`);
  return data;
});

export const getAllUsers = createAsyncThunk<
  TUser[],
  undefined,
  { rejectValue: any }
>("user/getAllUsers", async function (_, { dispatch, rejectWithValue }) {
  dispatch(setUsersRequest(true));
  const response = await userService.getAllUsersRequest();
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getAllUsers",
    });
  }
  const data: TUser[] = await response.json();
  dispatch(setUsersRequest(false));
  return data;
});

export const assignAdmin = createAsyncThunk<
  { id: number; role: string },
  any,
  { rejectValue: any }
>("user/assignAdmin", async function (body, { dispatch, rejectWithValue }) {
  const response = await userService.assignAdminRequest(body);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method assignAdmin",
    });
  }
  const data: { id: number; role: string } = await response.json();
  dispatch(updateAdminRole(data));
  return data;
});

export const manageAccount = createAsyncThunk<
  { id: number; active: boolean },
  any,
  { rejectValue: any }
>("user/manageAccount", async function (body, { dispatch, rejectWithValue }) {
  const response = await userService.manageAccountRequest(body);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method manageAccount",
    });
  }
  const data: { id: number; active: boolean } = await response.json();
  dispatch(updateAccountActive(data));
  return data;
});
