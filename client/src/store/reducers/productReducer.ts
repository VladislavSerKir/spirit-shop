import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IProductState,
  IProductWithCategories,
} from "../../types/store/productStoreType";
import { getAllProducts } from "../actions/productAction";

const productState: IProductState = {
  products: [],
  success: false,
  productsRequest: false,
  productsErrorMessage: null,
};

export const dataSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {
    setProductRequest: (state, action: PayloadAction<boolean>) => {
      state.productsRequest = action.payload;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = [...state.products].filter(
        (item) => item.id !== action.payload
      );
    },
    refreshProducts: (state, action: PayloadAction<IProductWithCategories>) => {
      state.products = [
        ...state.products.filter((c) => c.id !== action.payload.id),
        action.payload,
      ];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.productsRequest = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.success = true;
      state.productsRequest = false;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.productsErrorMessage = action.payload;
      state.success = false;
      state.products = [];
      state.productsRequest = false;
    });
  },
});

export const { setProductRequest, removeProduct, refreshProducts } =
  dataSlice.actions;
export const productReducer = dataSlice.reducer;
