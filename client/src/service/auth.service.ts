import { deleteCookie, getCookie, setCookie } from "../utils/cookie";
import { config } from "../utils/api";
import { IUserData } from "../types/store/userStoreType";
import { GenericObject } from "../types";

const authEndPoint = "auth";

const authService = {
  checkResponse: async (res: any) => {
    if (res.ok) {
      return res.json();
    }
    const errorData = await res.json();
    return Promise.reject(errorData);
  },

  userRequest: async () => {
    const url = `${config.apiEndPoint}/${authEndPoint}/me`;
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("accessToken"),
        "Content-Type": "application/json",
      },
    };

    return fetch(url, options)
      .then((res) => {
        return authService.checkResponse(res);
      })
      .catch(async (error: any) => {
        if (error.error.message.message === "Access token has expired") {
          const refreshData: any = await authService.refreshTokenRequest();
          setCookie("accessToken", refreshData.updatedAccessToken, {});
          options.headers.Authorization = "Bearer " + getCookie("accessToken");
          const res = await fetch(url, options);
          return await authService.checkResponse(res);
        } else {
          return Promise.reject(error);
        }
      });
  },

  refreshTokenRequest: async () => {
    return fetch(`${config.apiEndPoint}/${authEndPoint}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        refreshToken: getCookie("refreshToken"),
      }),
    })
      .then(authService.checkResponse)
      .catch((error) => {
        if (error.error.message.message === "Refresh token expired") {
          deleteCookie("refreshToken");
          deleteCookie("accessToken");
        }
        throw new Error("Access denied");
      });
  },

  registerRequest: ({
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
  }: IUserData) => {
    return fetch(`${config.apiEndPoint}/${authEndPoint}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
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

  loginRequest: async ({ email, password }: IUserData) => {
    return fetch(`${config.apiEndPoint}/${authEndPoint}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  },

  logoutRequest: async ({ email }: any) => {
    return fetch(`${config.apiEndPoint}/${authEndPoint}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  },

  sendCodeRequest: async ({ email }: IUserData) => {
    return fetch(`${config.apiEndPoint}/${authEndPoint}/send-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  },

  loginYandexRequest: async () => {
    const data: GenericObject = {
      grant_type: "authorization_code",
      code: "jpdtgtvxt5dcwvqr",
      client_id: config.clientId,
      client_secret: config.clientSecret,
    };

    const formBody = Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
    return fetch(`https://oauth.yandex.ru/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": "1024",
      },
      body: formBody,
    });
  },

  receiveInfoYandexRequest: async () => {
    return fetch(`https://login.yandex.ru/info?format=json`, {
      method: "GET",
      headers: {
        Authorization:
          "OAuth y0_AgAAAAAE78NKAAze-QAAAAEaj6j4AAA3EsijxEhKZIAgo6OcChLOoHpmYQ",
      },
    });
  },
};

export default authService;
