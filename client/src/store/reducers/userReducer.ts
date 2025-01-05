import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IAssignAdminResponse,
  IHideProfileResponse,
  IInitialBasicUserInfoData,
  IManageAccountResponse,
  IUserData,
  IUserState,
  TAvatar,
} from "../../types/store/userStoreType";
import { TError } from "../../types";
import { getAllUsers, onUpdateUser } from "../actions/userAction";
import { onLogout } from "../actions/authAction";
import {
  ILikeProductResponse,
  IProduct,
} from "../../types/store/productStoreType";

const initalUserData = {
  id: null,
  firstName: "",
  lastName: "",
  mobileNumber: "",
  email: "",
  avatar: "",
  password: "",
  role: "",
  favourite: null,
  hideProfile: false,
};

const initialBasicUserInfoData = {
  id: null,
  firstName: "",
  lastName: "",
  avatar: "",
  whenRegistered: "",
  firstOrderDate: "",
  totalOrders: "",
  totalReviews: "",
  helpfulReviews: "",
  totalBoughtProducts: "",
  mostBuyableProduct: null,
  userReviews: null,
  userOrders: [],
  hideProfile: false,
};

const userState: IUserState = {
  userData: initalUserData,
  basicUserInfoData: initialBasicUserInfoData,
  basicUserInfoRequest: false,
  allUsersData: [],
  userUpdated: false,
  logoutError: null,
  logoutRequest: false,
  updateError: null,
  updateRequest: false,
  userError: null,
  userRequest: false,
  usersRequest: false,
  allUsersRequest: false,
  usersError: null,
  isFadingOut: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.userData.id = action.payload.id;
      state.userData.email = action.payload.email;
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.mobileNumber = action.payload.mobileNumber;
      state.userData.avatar = action.payload.avatar;
      state.userData.role = action.payload.role;
      state.userData.hideProfile = action.payload.hideProfile;
      state.userData.favourite = action.payload.favourite.products;
      state.userError = null;
    },
    setBasicUserInfo: (
      state,
      action: PayloadAction<IInitialBasicUserInfoData>
    ) => {
      state.basicUserInfoData.id = action.payload.id;
      state.basicUserInfoData.firstName = action.payload.firstName;
      state.basicUserInfoData.lastName = action.payload.lastName;
      state.basicUserInfoData.avatar = action.payload.avatar;
      state.basicUserInfoData.whenRegistered = action.payload.whenRegistered;
      state.basicUserInfoData.firstOrderDate = action.payload.firstOrderDate;
      state.basicUserInfoData.totalOrders = action.payload.totalOrders;
      state.basicUserInfoData.totalReviews = action.payload.totalReviews;
      state.basicUserInfoData.helpfulReviews = action.payload.helpfulReviews;
      state.basicUserInfoData.totalBoughtProducts =
        action.payload.totalBoughtProducts;
      state.basicUserInfoData.mostBuyableProduct =
        action.payload.mostBuyableProduct;
      state.basicUserInfoData.userReviews = action.payload.userReviews;
      state.basicUserInfoData.userOrders = action.payload.userOrders;
      state.basicUserInfoData.hideProfile = action.payload.hideProfile;
    },
    setBasicUserInfoToNull: (state) => {
      state.basicUserInfoData = initialBasicUserInfoData;
    },
    setBasicUserInfoRequest: (state, action: PayloadAction<boolean>) => {
      state.basicUserInfoRequest = action.payload;
    },
    clearUserData: (state) => {
      state.userData = initalUserData;
    },
    setUserRequest: (state, action: PayloadAction<boolean>) => {
      state.userRequest = action.payload;
    },
    setUserError: (state, action: PayloadAction<TError>) => {
      state.userError = action.payload;
    },
    setResetUserError: (state) => {
      state.userError = null;
    },
    setAvatar: (state, action: PayloadAction<TAvatar>) => {
      state.userData.avatar = action.payload.avatar;
    },
    setLikeProduct: (state, action: PayloadAction<ILikeProductResponse>) => {
      state.userData.favourite = [...state.userData.favourite, action.payload];
    },
    setDislikeProduct: (state, action: PayloadAction<number>) => {
      state.userData.favourite = state.userData.favourite.filter(
        (product: IProduct) => product.id !== action.payload
      );
    },
    setUsersRequest: (state, action: PayloadAction<boolean>) => {
      state.usersRequest = action.payload;
    },
    updateAdminRole: (state, action: PayloadAction<IAssignAdminResponse>) => {
      state.allUsersData = state.allUsersData.map((user: IUserData) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            role: action.payload.role,
          };
        }

        return user;
      });
    },
    updateAccountActive: (
      state,
      action: PayloadAction<IManageAccountResponse>
    ) => {
      state.allUsersData = state.allUsersData.map((user: IUserData) => {
        if (user.id === action.payload.id) {
          return { ...user, active: action.payload.active };
        }
        return user;
      });
    },
    updateAccountHideProfile: (
      state,
      action: PayloadAction<IHideProfileResponse>
    ) => {
      state.userData.hideProfile = action.payload.hideProfile;
    },
    setIsFadingOut: (state, action) => {
      state.isFadingOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(onLogout.pending, (state) => {
      state.logoutRequest = true;
    });
    builder.addCase(onLogout.fulfilled, (state) => {
      state.userData.email = "";
      state.userData.firstName = "";
      state.userData.lastName = "";
      state.userData.mobileNumber = "";
      state.userData.role = "";
      state.allUsersData = [];
      state.userUpdated = false;
      state.logoutRequest = false;
    });
    builder.addCase(onLogout.rejected, (state, action) => {
      state.logoutError = action.payload;
      state.logoutRequest = false;
    });
    builder.addCase(onUpdateUser.pending, (state) => {
      state.updateRequest = true;
    });
    builder.addCase(onUpdateUser.fulfilled, (state, action) => {
      state.userData.email = action.payload.email;
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.mobileNumber = action.payload.mobileNumber;
      state.userUpdated = true;
      state.updateRequest = false;
    });
    builder.addCase(onUpdateUser.rejected, (state, action) => {
      state.userError = action.payload;
      state.updateRequest = false;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.allUsersRequest = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsersData = [...action.payload];
      state.allUsersRequest = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.usersError = action.payload;
      state.allUsersRequest = false;
    });
  },
});

export const {
  setBasicUserInfo,
  setBasicUserInfoToNull,
  setBasicUserInfoRequest,
  setResetUserError,
  setUserRequest,
  setAvatar,
  setUserError,
  setUser,
  clearUserData,
  setLikeProduct,
  setDislikeProduct,
  setUsersRequest,
  updateAdminRole,
  updateAccountActive,
  updateAccountHideProfile,
  setIsFadingOut,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
