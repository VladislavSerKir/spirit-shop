import { getCookie } from "../utils/cookie";
import { config } from "../utils/api";
import { TAvatar, TUserData } from "../types/userType";

const userEndPoint = "user";

const userService = {
  editRequest: async ({
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
  }: TUserData) => {
    return fetch(`${config.apiEndPoint}/${userEndPoint}/profile`, {
      method: "PATCH",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
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
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ avatar }),
    });
  },
};

export default userService;
