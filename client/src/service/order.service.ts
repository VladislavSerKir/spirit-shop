import { config } from "../utils/api";
import { ICartParams } from "../types/productType";
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
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        comment,
        isNeedPackage,
        isNeedDelivery,
      }),
    });
  },
};

export default orderService;
