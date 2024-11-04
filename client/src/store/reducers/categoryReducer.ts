import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory, ICategoryState } from "../../types/store/categoryStoreType";
import { getAllCategories } from "../actions/productAction";

const categoryState: ICategoryState = {
  categories: [],
  success: false,
  categoriesRequest: false,
  categoriesErrorMessage: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState: categoryState,
  reducers: {
    setCategoryRequest: (state, action: PayloadAction<boolean>) => {
      state.categoriesRequest = action.payload;
    },
    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = [...state.categories].filter(
        (item) => item.id !== action.payload
      );
    },
    refreshCategories: (state, action: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, action.payload];
    },
    updateCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories = [
        ...state.categories.filter((c) => c.id !== action.payload.id),
        action.payload,
      ];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.categoriesRequest = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.success = true;
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
  setCategoryRequest,
  removeCategory,
  refreshCategories,
  updateCategory,
} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
