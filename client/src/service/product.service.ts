import { config } from "../utils/api";
import {
  ICartParams,
  ICategory,
  ICreateCategory,
  ICreateProduct,
  IProduct,
} from "../types/productType";
import { getCookie } from "../utils/cookie";

const productService = {
  createProductRequest: ({
    categories,
    description,
    image,
    name,
    price,
  }: ICreateProduct) => {
    return fetch(`${config.apiEndPoint}/products/create`, {
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
    return fetch(`${config.apiEndPoint}/products/edit`, {
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
    return fetch(`${config.apiEndPoint}/products/delete`, {
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

  createCategoryRequest: ({ name }: ICreateCategory) => {
    return fetch(`${config.apiEndPoint}/category/create`, {
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
    return fetch(`${config.apiEndPoint}/category/edit`, {
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
    return fetch(`${config.apiEndPoint}/category/delete`, {
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

  addProductToCartRequest: ({
    id,
    categories,
    description,
    image,
    name,
    price,
  }: IProduct) => {
    return fetch(`${config.apiEndPoint}/cart/add`, {
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
    return fetch(`${config.apiEndPoint}/cart/remove`, {
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

  submitPurchaseRequest: ({
    comment,
    isNeedPackage,
    isNeedDelivery,
  }: ICartParams) => {
    return fetch(`${config.apiEndPoint}/order/purchase`, {
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
        comment,
        isNeedPackage,
        isNeedDelivery,
      }),
    });
  },
};

export default productService;
