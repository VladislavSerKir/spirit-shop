import { getCookie } from "../utils/cookie";
import { config } from "../utils/api";
import {} from "../types/store/reviewStoreType";
import { GetChartsPeriodDto } from "../types/store/userStoreType";

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

  getChartsBetweenPeriodDataRequest: async ({
    startDate,
    endDate,
  }: GetChartsPeriodDto) => {
    return fetch(`${config.apiEndPoint}/${serviceEndPoint}/charts-period`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify({ startDate, endDate }),
    });
  },
};

export default serviceService;
