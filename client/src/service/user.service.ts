import { getCookie } from "../utils/cookie";
import { config } from "../utils/api";
import { IUserData, TAvatar } from "../types/store/userStoreType";

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

  assignAdminRequest: async ({ id, role }: { id: number; role: string }) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ id, role }),
    });
  },

  manageAccountRequest: async ({
    id,
    active,
  }: {
    id: number;
    active: boolean;
  }) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/active`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ id, active }),
    });
  },
};

export default userService;
