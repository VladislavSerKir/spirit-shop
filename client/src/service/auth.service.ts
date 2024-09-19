import axios from "axios";
// import localStorageService from "./localStorage.service";
import { TError, TRefreshData, TUser } from "../types";
import { getCookie, setCookie } from "../utils/cookie";
import { config } from "../utils/api";

const authService = {
  checkResponse: (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  },

  onRefreshToken: async (url: string, options: RequestInit) => {
    return fetch(url, options)
      .then(authService.checkResponse)
      .catch(async (error: TError) => {
        if (error.message === "jwt expired") {
          const refreshData: TRefreshData =
            await authService.refreshTokenRequest();
          if (!refreshData.success) {
            Promise.reject(refreshData);
          }
          setCookie("accessToken", refreshData.accessToken, {});
          (options.headers as { [key: string]: string }).authorization =
            refreshData.accessToken;
          const res = await fetch(url, options);
          return await authService.checkResponse(res);
        } else {
          return Promise.reject(error);
        }
      });
  },

  userRequest: async () => {
    const url = `${config.apiEndPoint}/auth/user`;
    const options = {
      headers: {
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    };

    return fetch(url, options)
      .then(authService.checkResponse)
      .catch(async (error: TError) => {
        if (error.message === "jwt expired") {
          const refreshData: TRefreshData =
            await authService.refreshTokenRequest();
          if (!refreshData.success) {
            Promise.reject(refreshData);
          }
          setCookie("accessToken", refreshData.accessToken, {});
          (options.headers as { [key: string]: string }).authorization =
            refreshData.accessToken;
          const res = await fetch(url, options);
          return await authService.checkResponse(res);
        } else {
          return Promise.reject(error);
        }
      });
  },

  refreshTokenRequest: async () => {
    return fetch(`${config.apiEndPoint}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    }).then(authService.checkResponse);
  },

  registerRequest: ({ email, password, name }: TUser) => {
    return fetch(`${config.apiEndPoint}/auth/register`, {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });
  },

  loginRequest: async ({ email, password }: TUser) => {
    return fetch(`${config.apiEndPoint}/auth/login`, {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  },

  logoutRequest: async () => {
    return fetch(`${config.apiEndPoint}/auth/logout`, {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        token: getCookie("refreshToken"),
      }),
    });
  },

  editRequest: async ({ email, name, password }: TUser) => {
    return fetch(`${config.apiEndPoint}/auth/user`, {
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
        email: email,
        name: name,
        password: password,
      }),
    });
  },
};

export default authService;

// import { checkResponse } from "../utils/api";

// const httpAuth = axios.create({
//   baseURL: `${config.apiEndPoint}/auth/`,
// });
// const { data } = await httpAuth.post("/auth/user", {
//   headers: {
//     Authorization: "Bearer " + getCookie("accessToken"),
//   },
// });
