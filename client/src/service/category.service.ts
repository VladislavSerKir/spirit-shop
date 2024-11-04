import { config } from "../utils/api";
import { getCookie } from "../utils/cookie";
import { ICategory, ICreateCategory } from "../types/store/categoryStoreType";

const categoryEndPoint = "category";

const categoryService = {
  createCategoryRequest: ({ name }: ICreateCategory) => {
    return fetch(`${config.apiEndPoint}/${categoryEndPoint}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        name,
      }),
    });
  },

  editCategoryRequest: ({ name, id }: ICategory) => {
    return fetch(`${config.apiEndPoint}/${categoryEndPoint}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        name,
        id,
      }),
    });
  },

  deleteCategoryRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${categoryEndPoint}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        id,
      }),
    });
  },
};

export default categoryService;
