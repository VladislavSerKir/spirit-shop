import { getCookie } from "../utils/cookie";
import { config } from "../utils/api";
import {
  AssignAdminDto,
  GetStatisticsPeriodDto,
  HideProfileDto,
  IUserData,
  ManageAccountDto,
  TAvatar,
} from "../types/store/userStoreType";

const userEndPoint = "user";

const userService = {
  editRequest: async ({
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
  }: IUserData) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        firstName,
        lastName,
        mobileNumber,
        email,
        password,
      }),
    });
  },

  getBasicUserInfoRequest: async (id: number) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });
  },

  editAvatarRequest: async ({ avatar }: TAvatar) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/avatar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ avatar }),
    });
  },

  getAllUsersRequest: async () => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });
  },

  assignAdminRequest: async ({ id, role }: AssignAdminDto) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ id, role }),
    });
  },

  manageAccountRequest: async ({ id, active }: ManageAccountDto) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/active`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ id, active }),
    });
  },

  toggleHideProfileRequest: async ({ hideProfile }: HideProfileDto) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/hide`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ hideProfile }),
    });
  },

  getShopStatisticsInfoRequest: async () => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/statistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });
  },

  getShopStatisticsPeriodInfoRequest: async ({
    startDate,
    endDate,
  }: GetStatisticsPeriodDto) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/period`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ startDate, endDate }),
    });
  },
};

export default userService;
