import { config } from "../utils/api";
import { ICreateCategory, ICreateProduct } from "../types/productType";

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

  deleteProductRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/products/delete`, {
      method: "DELETE",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
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
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name,
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
