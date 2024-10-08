import { TError } from ".";

export type TProductData = {
  products: Array<IProduct>;
  categories: Array<ICategory>;
  success: boolean;
  productsRequest: boolean;
  categoriesRequest: boolean;
  productsErrorMessage: null | undefined | string;
  categoriesErrorMessage: null | undefined | string;
};

export interface IProduct {
  id: number;
  categories: string[];
  description: string;
  image: string;
  name: string;
  price: number;
}

export interface ICreateProduct {
  categories: string[];
  description: string;
  image: string;
  name: string;
  price: string;
}

export interface ICategory {
  id: number;
  name: string;
}
