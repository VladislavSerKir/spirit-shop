import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IShopStatisticsData,
  IServiceState,
} from "../../types/store/serviceStoreType";

const initialShopStatisticsData = {
  totalOrders: "",
  totalBoughtProducts: "",
  totalRevenue: "",
  averageOrderPrice: "",
  totalReviews: "",
  totalUsers: "",
  totalUsersActive: "",
  totalProducts: "",
  totalCategories: "",
  productStatistics: [],
};

const serviceState: IServiceState = {
  pathname: "",
  codeSent: false,
  resetEmail: "",
  resetPassword: false,
  shopStatisticsData: initialShopStatisticsData,
  shopStatisticsRequest: false,
  chartsDataRequest: false,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState: serviceState,
  reducers: {
    updatePathname: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
    setCodeSent: (state, action: PayloadAction<any>) => {
      state.codeSent = action.payload.success;
      state.resetEmail = action.payload.email;
    },
    setResetPassword: (state, action: PayloadAction<any>) => {
      state.resetPassword = action.payload.success;
    },
    setDefaultForm: (state) => {
      state.codeSent = false;
      state.resetEmail = "";
      state.resetPassword = false;
    },
    setCodeExpired: (state) => {
      state.codeSent = false;
      state.resetEmail = "";
    },
    setShopStatisticsInfo: (
      state,
      action: PayloadAction<IShopStatisticsData>
    ) => {
      state.shopStatisticsData.totalOrders = action.payload.totalOrders;
      state.shopStatisticsData.totalBoughtProducts =
        action.payload.totalBoughtProducts;
      state.shopStatisticsData.totalRevenue = action.payload.totalRevenue;
      state.shopStatisticsData.averageOrderPrice =
        action.payload.averageOrderPrice;
      state.shopStatisticsData.totalReviews = action.payload.totalReviews;
      state.shopStatisticsData.totalUsers = action.payload.totalUsers;
      state.shopStatisticsData.totalUsersActive =
        action.payload.totalUsersActive;
      state.shopStatisticsData.totalProducts = action.payload.totalProducts;
      state.shopStatisticsData.totalCategories = action.payload.totalCategories;
      state.shopStatisticsData.productStatistics =
        action.payload.productStatistics;
    },
    setShopStatisticsInfoToNull: (state) => {
      state.shopStatisticsData = initialShopStatisticsData;
    },
    setShopStatisticsInfoRequest: (state, action: PayloadAction<boolean>) => {
      state.shopStatisticsRequest = action.payload;
    },
    setChartsDataRequest: (state, action: PayloadAction<boolean>) => {
      state.chartsDataRequest = action.payload;
    },
  },
});

export const {
  setShopStatisticsInfo,
  setShopStatisticsInfoRequest,
  setShopStatisticsInfoToNull,
  updatePathname,
  setCodeSent,
  setResetPassword,
  setDefaultForm,
  setCodeExpired,
  setChartsDataRequest,
} = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
