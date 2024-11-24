import { getCookie } from "../utils/cookie";
import { config } from "../utils/api";

const reviewEndPoint = "review";

const reviewService = {
  getAllReviewsRequest: () => {
    return fetch(`${config.apiEndPoint}/${reviewEndPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });
  },

  rateProductRequest: ({
    productId,
    rate,
  }: {
    productId: number;
    rate: number;
  }) => {
    return fetch(`${config.apiEndPoint}/${reviewEndPoint}/rate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        productId,
        rate,
      }),
    });
  },

  commentProductRequest: ({
    productId,
    comment,
  }: {
    productId: number;
    comment: string;
  }) => {
    return fetch(`${config.apiEndPoint}/${reviewEndPoint}/comment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        productId,
        comment,
      }),
    });
  },
};

export default reviewService;
