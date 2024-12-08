import { ICategory } from "./categoryStoreType";
import { IProduct } from "./productStoreType";

export interface ICartState {
  cart: ICart | null | any;
  purchase?: any;
  success: boolean;
  cartRequest: boolean;
  cartErrorMessage: null | undefined | string;
}

export interface ICart {
  id: number;
  cartItem: ICartItem[] | [];
}

export interface ICartItem {
  id: number;
  quantity: number;
  product: IProduct;
}

export interface AddToCartDto {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  categories: Array<ICategory>;
}
