import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError } from "../../types";
import {
  clearUserData,
  setAvatar,
  setBasicUserInfo,
  setBasicUserInfoRequest,
  setShopStatisticsInfoPeriod,
  setUsersRequest,
  updateAccountActive,
  updateAccountHideProfile,
  updateAdminRole,
} from "../reducers/userReducer";
import {
  AssignAdminDto,
  GetStatisticsPeriodDto,
  HideProfileDto,
  IAssignAdminResponse,
  IHideProfileResponse,
  IInitialBasicUserInfoData,
  IManageAccountResponse,
  IUserData,
  ManageAccountDto,
  TAvatar,
  TUserEditResponse,
} from "../../types/store/userStoreType";
import { toast } from "react-toastify";
import userService from "../../service/user.service";
import { ii18n } from "../../i18n";
import { setCartToNull } from "../reducers/cartReducer";
import { setPurchaseToNull } from "../reducers/orderReducer";
import { IShopStatisticsData } from "../../types/store/serviceStoreType";
import {
  setShopStatisticsInfo,
  setShopStatisticsInfoRequest,
} from "../reducers/serviceReducer";

export const onUpdateUser = createAsyncThunk<
  TUserEditResponse,
  IUserData,
  { rejectValue: TError }
>("user/onUpdateUser", async function (user, { rejectWithValue }) {
  const response = await userService.editRequest(user);
  if (!response.ok) {
    if (response.status === 400) {
      toast.error(
        `${ii18n.t("Eather user with email exist or password is too short")}`
      );
    }

    if (response.status === 403) {
      toast.error(`${ii18n.t("User deactivated")}`);
    }

    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

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
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.error(`${ii18n.t("Error to change avatar")}`);
    }

    if (response.status === 403) {
      toast.error(`${ii18n.t("User deactivated")}`);
    }

    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

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
  IUserData[],
  undefined,
  { rejectValue: TError }
>("user/getAllUsers", async function (_, { dispatch, rejectWithValue }) {
  dispatch(setUsersRequest(true));
  const response = await userService.getAllUsersRequest();
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getAllUsers",
    });
  }
  const data: IUserData[] = await response.json();
  dispatch(setUsersRequest(false));
  return data;
});

export const assignAdmin = createAsyncThunk<
  IAssignAdminResponse,
  AssignAdminDto,
  { rejectValue: TError }
>("user/assignAdmin", async function (body, { dispatch, rejectWithValue }) {
  const response = await userService.assignAdminRequest(body);

  if (!response.ok) {
    if (response.status === 400) {
      toast.error(`${ii18n.t("Error occured")}`);
    }

    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Admin has not been assigned or not assigned, check if you are logged in")}`
      );
    }

    if (response.status === 403) {
      toast.error(`${ii18n.t("Action forbidden")}`);
    }

    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method assignAdmin",
    });
  }

  const data: IAssignAdminResponse = await response.json();
  dispatch(updateAdminRole(data));
  toast.info(`${ii18n.t("Admin has been assigned or not assigned")}`);
  return data;
});

export const manageAccount = createAsyncThunk<
  IManageAccountResponse,
  ManageAccountDto,
  { rejectValue: TError }
>("user/manageAccount", async function (body, { dispatch, rejectWithValue }) {
  const response = await userService.manageAccountRequest(body);

  if (!response.ok) {
    if (response.status === 400) {
      toast.error(`${ii18n.t("Error occured")}`);
    }

    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("User has not been activeted or deactivated, check if you are logged in")}`
      );
    }

    if (response.status === 403) {
      toast.error(`${ii18n.t("Action forbidden")}`);
    }

    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method manageAccount",
    });
  }

  const data: IManageAccountResponse = await response.json();
  dispatch(updateAccountActive(data));
  toast.info(`${ii18n.t("User has been activeted or deactivated")}`);
  return data;
});

export const getBasicUserInfo = createAsyncThunk<
  IInitialBasicUserInfoData,
  any,
  { rejectValue: TError }
>("user/:id", async function (id, { dispatch, rejectWithValue }) {
  dispatch(setBasicUserInfoRequest(true));
  const response = await userService.getBasicUserInfoRequest(id);

  if (!response.ok) {
    if (response.status === 500) {
      toast.error(`${ii18n.t("Internal server error")}`);
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getBasicUserInfo",
    });
  }

  const data: IInitialBasicUserInfoData = await response.json();
  dispatch(setBasicUserInfo(data));
  dispatch(setBasicUserInfoRequest(false));
  return data;
});

export const toggleHideProfile = createAsyncThunk<
  IHideProfileResponse,
  HideProfileDto,
  { rejectValue: TError }
>(
  "user/toggleHideProfile",
  async function (body, { dispatch, rejectWithValue }) {
    const response = await userService.toggleHideProfileRequest(body);

    if (!response.ok) {
      if (response.status === 400) {
        toast.error(`${ii18n.t("Error occured")}`);
      }

      if (response.status === 401) {
        dispatch(clearUserData());
        dispatch(setCartToNull());
        dispatch(setPurchaseToNull());
        toast.warn(
          `${ii18n.t("Profile visibility has not been changed, check if you are logged in")}`
        );
      }

      if (response.status === 500) {
        toast.error(`${ii18n.t("Internal server error")}`);
      }

      return rejectWithValue({
        status: response.status,
        message: "Server Error, take a look on method toggleHideProfile",
      });
    }

    const data: IHideProfileResponse = await response.json();
    dispatch(updateAccountHideProfile(data));
    toast.info(`${ii18n.t("Profile visibility changed")}`);
    return data;
  }
);

export const getShopStatisticsInfo = createAsyncThunk<
  IShopStatisticsData,
  undefined,
  { rejectValue: TError }
>(
  "user/getShopStatisticsInfo",
  async function (_, { dispatch, rejectWithValue }) {
    dispatch(setShopStatisticsInfoRequest(true));
    dispatch(setShopStatisticsInfoPeriod(false));
    const response = await userService.getShopStatisticsInfoRequest();

    if (!response.ok) {
      if (response.status === 400) {
        toast.error(`${ii18n.t("Error occured")}`);
      }

      if (response.status === 401) {
        dispatch(clearUserData());
        dispatch(setCartToNull());
        dispatch(setPurchaseToNull());
        toast.warn(
          `${ii18n.t("Error to get shop statistic, check if you are logged in")}`
        );
      }

      if (response.status === 403) {
        toast.error(`${ii18n.t("Action forbidden")}`);
      }

      if (response.status === 500) {
        toast.error(`${ii18n.t("Internal server error")}`);
      }

      return rejectWithValue({
        status: response.status,
        message: "Server Error, take a look on method getShopStatisticsInfo",
      });
    }

    const data: IShopStatisticsData = await response.json();
    dispatch(setShopStatisticsInfo(data));
    dispatch(setShopStatisticsInfoRequest(false));
    return data;
  }
);

export const getShopStatisticsPeriodInfo = createAsyncThunk<
  IShopStatisticsData,
  GetStatisticsPeriodDto,
  { rejectValue: TError }
>(
  "user/getShopStatisticsPeriodInfo",
  async function (body, { dispatch, rejectWithValue }) {
    dispatch(setShopStatisticsInfoRequest(true));
    const response = await userService.getShopStatisticsPeriodInfoRequest(body);

    if (!response.ok) {
      if (response.status === 400) {
        toast.error(`${ii18n.t("Error occured")}`);
      }

      if (response.status === 401) {
        dispatch(clearUserData());
        dispatch(setCartToNull());
        dispatch(setPurchaseToNull());
        toast.warn(
          `${ii18n.t("Error to get shop statistic, check if you are logged in")}`
        );
      }

      if (response.status === 403) {
        toast.error(`${ii18n.t("Action forbidden")}`);
      }

      if (response.status === 500) {
        toast.error(`${ii18n.t("Internal server error")}`);
      }

      return rejectWithValue({
        status: response.status,
        message:
          "Server Error, take a look on method getShopStatisticsPeriodInfo",
      });
    }

    const data: IShopStatisticsData = await response.json();
    dispatch(setShopStatisticsInfo(data));
    dispatch(setShopStatisticsInfoRequest(false));
    dispatch(setShopStatisticsInfoPeriod(true));
    return data;
  }
);
