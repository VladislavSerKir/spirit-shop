import { config } from "../utils/api";
import { ICreateProduct } from "../types/productType";

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
};

export default productService;
