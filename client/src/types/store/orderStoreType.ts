import { TError } from "..";
import { ICartItem } from "./cartStoreType";

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
