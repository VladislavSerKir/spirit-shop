import { config } from "../utils/api";
import { ICreateProduct } from "../types/productType";
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
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
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
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
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

  likeProductRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${productEndPoint}/like`, {
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
        id,
      }),
    });
  },

  dislikeProductRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${productEndPoint}/dislike`, {
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
        id,
      }),
    });
  },
};

export default productService;
