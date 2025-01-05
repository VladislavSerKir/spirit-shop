import { TError } from "..";
import { ICartItem } from "./cartStoreType";
import { ICategory } from "./categoryStoreType";

export interface IOrderState {
  purchase: IPurchase[];
  success: boolean;
  orderError: null | undefined | TError;
  orderRequest: boolean;
}

export interface IPurchase {
  id: number;
  createdAt: string;
  number: number;
  comment: string;
  isNeedPackage: boolean;
  isNeedDelivery: boolean;
  purchase: ICartItem[];
}

export interface IUserOrders {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  categories: ICategory[] | [];
}
