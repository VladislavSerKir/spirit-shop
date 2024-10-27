import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError } from "../../types";
import { setAvatar } from "../reducers/userReducer";
import { TAvatar, TUserData, TUserEditResponse } from "../../types/userType";
import { toast } from "react-toastify";
import userService from "../../service/user.service";

export const onUpdateUser = createAsyncThunk<
  TUserEditResponse,
  TUserData,
  { rejectValue: TError }
>("user/onUpdateUser", async function (user, { rejectWithValue }) {
  const response = await userService.editRequest(user);
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
  const response = await userService.editAvatarRequest(user);
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
