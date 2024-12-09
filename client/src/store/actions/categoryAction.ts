import { createAsyncThunk } from "@reduxjs/toolkit";
import { TError } from "../../types";
import categoryService from "../../service/category.service";
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
import { ii18n } from "../../i18n";
import { clearUserData } from "../reducers/userReducer";
import { setCartToNull } from "../reducers/cartReducer";
import { setPurchaseToNull } from "../reducers/orderReducer";

export const createCategory = createAsyncThunk<
  ICreateCategory,
  ICreateCategory,
  { rejectValue: TError }
>("category/create", async function (category, { dispatch, rejectWithValue }) {
  const response = await categoryService.createCategoryRequest(category);

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Category has not been created, check if you are logged in")}`
      );
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method createCategory",
    });
  }

  const data: ICategory = await response.json();
  dispatch(refreshCategories(data));
  toast.success(`${ii18n.t("Category created")}`);
  return data;
});

export const editCategory = createAsyncThunk<
  ICategory,
  ICategory,
  { rejectValue: TError }
>("category/edit", async function (body, { dispatch, rejectWithValue }) {
  const response = await categoryService.editCategoryRequest(body);

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Category has not been edited, check if you are logged in")}`
      );
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method editCategory",
    });
  }

  const data: ICategory = await response.json();
  dispatch(updateCategory(data));
  dispatch(getAllProducts());
  toast.info(`${ii18n.t("Category name edited")}`);
  return data;
});

export const deleteCategory = createAsyncThunk<
  IRemoveCategory,
  number,
  { rejectValue: TError }
>("category/delete", async function (id, { dispatch, rejectWithValue }) {
  const response = await categoryService.deleteCategoryRequest(id);

  if (!response.ok) {
    if (response.status === 401) {
      dispatch(clearUserData());
      dispatch(setCartToNull());
      dispatch(setPurchaseToNull());
      toast.warn(
        `${ii18n.t("Category has not been deleted, check if you are logged in")}`
      );
    }

    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method deleteCategory",
    });
  }
  const data: IRemoveCategory = await response.json();
  dispatch(removeCategory(data.id));
  toast.info(`${ii18n.t("Category has been deleted")}`);
  return data;
});
