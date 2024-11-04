import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  IUserData,
  IUserState,
  TAvatar,
} from "../../types/store/userStoreType";
import { TError } from "../../types";
import { getAllUsers, onUpdateUser } from "../actions/userAction";
import { onLogout } from "../actions/authAction";
import { IProduct } from "../../types/store/productStoreType";

const initalUserData = {
  firstName: "",
  lastName: "",
  mobileNumber: "",
  email: "",
  avatar: "",
  password: "",
  role: "",
  favourite: null,
};

const userState: IUserState = {
  userData: initalUserData,
  allUsersData: [],
  userUpdated: false,
  logoutError: null,
  logoutRequest: false,
  updateError: null,
  updateRequest: false,
  userError: null,
  userRequest: false,
  usersRequest: false,
  usersError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserData>) => {
      state.userData.email = action.payload.email;
      state.userData.firstName = action.payload.firstName;
      state.userData.lastName = action.payload.lastName;
      state.userData.mobileNumber = action.payload.mobileNumber;
      state.userData.avatar = action.payload.avatar;
      state.userData.role = action.payload.role;
      state.userData.favourite = action.payload.favourite.products;
      state.userError = null;
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
    setLikeProduct: (state, action: any) => {
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
    updateAdminRole: (state, action: PayloadAction<any>) => {
      const updatedUser = state.allUsersData.find(
        (user: any) => user.id === action.payload.id
      );
      updatedUser.role = action.payload.role;
      state.allUsersData = [
        ...state.allUsersData.filter(
          (user: any) => user.id !== action.payload.id
        ),
        updatedUser,
      ];
    },
    updateAccountActive: (state, action: PayloadAction<any>) => {
      const updatedUser = state.allUsersData.find(
        (user: any) => user.id === action.payload.id
      );
      updatedUser.active = action.payload.active;
      state.allUsersData = [
        ...state.allUsersData.filter(
          (user: any) => user.id !== action.payload.id
        ),
        updatedUser,
      ];
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
      state.usersRequest = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsersData = [...action.payload];
      state.usersRequest = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.usersError = action.payload;
      state.usersRequest = false;
    });
  },
});

export const {
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
} = userSlice.actions;
export const userReducer = userSlice.reducer;
