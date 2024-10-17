import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICategory,
  IProductWithCategories,
  TProductData,
} from "../../types/productType";
import { getAllCategories, getAllProducts } from "../actions/productAction";

const productState: TProductData = {
  products: [],
  categories: [],
  success: false,
  productsRequest: false,
  categoriesRequest: false,
  productsErrorMessage: null,
  categoriesErrorMessage: null,
};

export const dataSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {
    setProductRequest: (state, action: PayloadAction<boolean>) => {
      state.productsRequest = action.payload;
    },
    setCategoryRequest: (state, action: PayloadAction<boolean>) => {
      state.categoriesRequest = action.payload;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = [...state.products].filter(
        (item) => item.id !== action.payload
      );
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = [...state.categories].filter(
        (item) => item.id !== action.payload
      );
    },
    refreshCategories: (state, action: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, action.payload];
    },
    refreshProducts: (state, action: PayloadAction<IProductWithCategories>) => {
      state.products = [
        ...state.products.filter((c) => c.id !== action.payload.id),
        action.payload,
      ];
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories = [
        ...state.categories.filter((c) => c.id !== action.payload.id),
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
    builder.addCase(getAllCategories.pending, (state) => {
      state.categoriesRequest = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.categoriesRequest = false;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.categoriesErrorMessage = action.payload;
      state.categories = [];
      state.categoriesRequest = false;
    });
  },
});

export const {
  setProductRequest,
  setCategoryRequest,
  removeProduct,
  removeCategory,
  refreshCategories,
  updateCategory,
  refreshProducts,
} = dataSlice.actions;
export const productReducer = dataSlice.reducer;
