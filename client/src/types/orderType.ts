import { TError } from ".";
import { TCartItem } from "./userType";

export type TOrder = {
  purchase: TPurchase[];
  orderError: null | undefined | TError;
  orderRequest: boolean;
};

export type TPurchase = {
  id: number;
  createdAt: string;
  number: number;
  comment: string;
  isNeedPackage: boolean;
  isNeedDelivery: boolean;
  purchase: TCartItem[];
};
