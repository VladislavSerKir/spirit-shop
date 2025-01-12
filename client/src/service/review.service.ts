import { getCookie } from "../utils/cookie";
import { config } from "../utils/api";
import {
  EditReviewDto,
  GiveCommentDto,
  GiveRateDto,
} from "../types/store/reviewStoreType";

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

  rateProductRequest: ({ productId, rate }: GiveRateDto) => {
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

  commentProductRequest: ({ productId, comment }: GiveCommentDto) => {
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

  likeReviewRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${reviewEndPoint}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        id,
      }),
    });
  },

  dislikeReviewRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${reviewEndPoint}/dislike`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        id,
      }),
    });
  },

  deleteReviewRequest: (id: number) => {
    return fetch(`${config.apiEndPoint}/${reviewEndPoint}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        id,
      }),
    });
  },
  changeReviewRequest: ({ productId, comment, rate }: EditReviewDto) => {
    return fetch(`${config.apiEndPoint}/${reviewEndPoint}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({
        productId,
        rate,
        comment,
      }),
    });
  },
};

export default reviewService;
