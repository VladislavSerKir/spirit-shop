import { config } from "../utils/api";
import { ICategory, ICreateCategory } from "../types/productType";
import { getCookie } from "../utils/cookie";

const categoryEndPoint = "category";

const categoryService = {
  createCategoryRequest: ({ name }: ICreateCategory) => {
    return fetch(`${config.apiEndPoint}/${categoryEndPoint}/create`, {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name,
      }),
    });
  },

  editCategoryRequest: ({ name, id }: ICategory) => {
    return fetch(`${config.apiEndPoint}/${categoryEndPoint}/edit`, {
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
        name,
        id,
      }),
    });
  },

  deleteCategoryRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${categoryEndPoint}/delete`, {
      method: "DELETE",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        id,
      }),
    });
  },
};

export default categoryService;
