import { IProduct } from "./productStoreType";

export interface ICartState {
  cart: ICartItem | null | "" | any;
  purchase?: any;
  success: boolean;
  cartRequest: boolean;
  cartErrorMessage: null | undefined | string;
}

export interface ICartItem {
  id: number;
  quantity: number;
  product: IProduct;
}
