import { config } from "../utils/api";
import { IProduct } from "../types/productType";
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
        categories,
        description,
        image,
        name,
        price,
      }),
    });
  },
};

export default cartService;
