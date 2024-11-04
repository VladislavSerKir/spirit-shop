import { config } from "../utils/api";
import { ICartParams } from "../types/store/productStoreType";
import { getCookie } from "../utils/cookie";

const orderEndPoint = "order";

const orderService = {
  submitPurchaseRequest: ({
    comment,
    isNeedPackage,
    isNeedDelivery,
  }: ICartParams) => {
    return fetch(`${config.apiEndPoint}/${orderEndPoint}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        comment,
        isNeedPackage,
        isNeedDelivery,
      }),
    });
  },
};

export default orderService;
