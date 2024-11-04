import { config } from "../utils/api";
import { IProduct } from "../types/store/productStoreType";
import { getCookie } from "../utils/cookie";

const cartEndPoint = "cart";

const cartService = {
  addProductToCartRequest: ({
    id,
    categories,
    description,
    image,
    name,
    price,
  }: IProduct) => {
    return fetch(`${config.apiEndPoint}/${cartEndPoint}/add`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        id,
        categories,
        description,
        image,
        name,
        price,
      }),
    });
  },

  removeProductFromCartRequest: ({
    id,
    categories,
    description,
    image,
    name,
    price,
  }: IProduct) => {
    return fetch(`${config.apiEndPoint}/${cartEndPoint}/remove`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        id,
        categories,
        description,
        image,
        name,
        price,
      }),
    });
  },

  clearCartRequest: () => {
    return fetch(`${config.apiEndPoint}/${cartEndPoint}/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });
  },

  getCartRequest: () => {
    return fetch(`${config.apiEndPoint}/${cartEndPoint}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });
  },
};

export default cartService;
