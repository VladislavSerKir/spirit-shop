import { getCookie } from "../utils/cookie";
import { config } from "../utils/api";
import {} from "../types/store/reviewStoreType";

const serviceEndPoint = "service";

const serviceService = {
  getChartsDataRequest: () => {
    return fetch(`${config.apiEndPoint}/${serviceEndPoint}/charts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
    });
  },
};

export default serviceService;
