import { createAsyncThunk } from "@reduxjs/toolkit";
import // ICategory,
// ICreateCategory,
// IRemoveCategory,
"../../types/store/productStoreType";
import { TError } from "../../types";
import categoryService from "../../service/category.service";
import // refreshCategories,
// removeCategory,
// updateCategory,
"../reducers/productReducer";
import { toast } from "react-toastify";
import { getAllProducts } from "./productAction";
import {
  ICategory,
  ICreateCategory,
  IRemoveCategory,
} from "../../types/store/categoryStoreType";
import {
  refreshCategories,
  removeCategory,
  updateCategory,
} from "../reducers/categoryReducer";

export const createCategory = createAsyncThunk<
  ICreateCategory,
  ICreateCategory,
  { rejectValue: TError }
>("category/create", async function (category, { dispatch, rejectWithValue }) {
  const response = await categoryService.createCategoryRequest(category);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method createCategory",
    });
  }
  const data: ICategory = await response.json();
  dispatch(refreshCategories(data));
  toast.success(`Category ${data.name} created!`);
  return data;
});

export const editCategory = createAsyncThunk<
  ICategory,
  ICategory,
  { rejectValue: TError }
>("category/edit", async function (body, { dispatch, rejectWithValue }) {
  const response = await categoryService.editCategoryRequest(body);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method editCategory",
    });
  }
  const data: ICategory = await response.json();
  dispatch(updateCategory(data));
  dispatch(getAllProducts());
  toast.info(`Category name edited`);
  return data;
});

export const deleteCategory = createAsyncThunk<
  IRemoveCategory,
  number,
  { rejectValue: TError }
>("category/delete", async function (id, { dispatch, rejectWithValue }) {
  const response = await categoryService.deleteCategoryRequest(id);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method deleteCategory",
    });
  }
  const data: any = await response.json();
  dispatch(removeCategory(data.id));
  return data;
});
