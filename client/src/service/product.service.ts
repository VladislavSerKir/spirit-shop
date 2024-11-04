import { config } from "../utils/api";
import { ICreateProduct } from "../types/store/productStoreType";
import { getCookie } from "../utils/cookie";

const productEndPoint = "product";

const productService = {
  createProductRequest: ({
    categories,
    description,
    image,
    name,
    price,
  }: ICreateProduct) => {
    return fetch(`${config.apiEndPoint}/${productEndPoint}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        categories,
        description,
        image,
        name,
        price,
      }),
    });
  },

  editProductRequest: ({
    categories,
    description,
    image,
    name,
    price,
    id,
  }: ICreateProduct) => {
    return fetch(`${config.apiEndPoint}/${productEndPoint}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        categories,
        description,
        image,
        name,
        price,
        id,
      }),
    });
  },

  deleteProductRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${productEndPoint}/delete`, {
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

  likeProductRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${productEndPoint}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        id,
      }),
    });
  },

  dislikeProductRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${productEndPoint}/dislike`, {
      method: "PATCH",
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

export default productService;
