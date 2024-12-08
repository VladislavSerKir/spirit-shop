import { ICategory } from "./categoryStoreType";
import { IUserData } from "./userStoreType";

export interface IProductState {
  products: Array<IProductWithCategories>;
  success: boolean;
  productsRequest: boolean;
  productsErrorMessage: null | undefined | string;
}

export interface IProduct {
  id: number;
  categories: ICategory[];
  description: string;
  image: string;
  name: string;
  price: number;
  favourites?: IUserData[];
}

export interface ICartParams {
  comment: string;
  isNeedDelivery: boolean;
  isNeedPackage: boolean;
}

export interface IProductWithCategories {
  id: number;
  categories: ICategory[];
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
  id?: number;
}

export interface IRemoveProduct {
  id: number;
}

export type ILikeProductResponse = {
  id: number;
} & void;
