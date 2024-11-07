import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  refreshProducts,
  removeProduct,
  setProductRequest,
} from "../reducers/productReducer";
import { TError } from "../../types";
import { config } from "../../utils/api";
import {
  ICreateProduct,
  IProductWithCategories,
  IRemoveProduct,
} from "../../types/store/productStoreType";
import productService from "../../service/product.service";
import { toast } from "react-toastify";
import { setDislikeProduct, setLikeProduct } from "../reducers/userReducer";
import { ICategory } from "../../types/store/categoryStoreType";
import { setCategoryRequest } from "../reducers/categoryReducer";
import { ii18n } from "../../i18n";

export const getAllProducts = createAsyncThunk<
  IProductWithCategories[],
  undefined,
  { rejectValue: any }
>("product/getAllProducts", async function (_, { dispatch, rejectWithValue }) {
  dispatch(setProductRequest(true));
  const response = await fetch(`${config.apiEndPoint}/product`);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getAllProducts",
    });
  }
  const data: IProductWithCategories[] = await response.json();
  dispatch(setProductRequest(false));
  return data;
});

export const createProduct = createAsyncThunk<
  IProductWithCategories,
  ICreateProduct,
  { rejectValue: TError }
>("product/create", async function (product, { dispatch, rejectWithValue }) {
  const response = await productService.createProductRequest(product);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method createProduct",
    });
  }
  const data: IProductWithCategories = await response.json();
  dispatch(refreshProducts(data));
  toast.success(`${ii18n.t("Product created")}`);
  return data;
});

export const editProduct = createAsyncThunk<
  IProductWithCategories,
  ICreateProduct,
  { rejectValue: TError }
>("product/edit", async function (product, { dispatch, rejectWithValue }) {
  const response = await productService.editProductRequest(product);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method editProduct",
    });
  }
  const data: IProductWithCategories = await response.json();
  dispatch(refreshProducts(data));
  toast.warn(`${ii18n.t("Product edited")}`);
  return data;
});

export const deleteProduct = createAsyncThunk<
  any,
  number,
  { rejectValue: TError }
>("product/delete", async function (id, { dispatch, rejectWithValue }) {
  const response = await productService.deleteProductRequest(id);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method createProduct",
    });
  }
  const data: IRemoveProduct = await response.json();
  toast.error(`${ii18n.t("Product deleted")}`);
  dispatch(removeProduct(data.id));
});

export const getAllCategories = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: any }
>(
  "product/getAllCategories",
  async function (_, { dispatch, rejectWithValue }) {
    dispatch(setCategoryRequest(true));
    const response = await fetch(`${config.apiEndPoint}/category`);
    if (!response.ok) {
      return rejectWithValue({
        status: response.status,
        message: "Server Error, take a look on method getAllCategories",
      });
    }
    const data: ICategory[] = await response.json();
    dispatch(setProductRequest(false));
    return data;
  }
);

export const likeProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: TError }
>("category/delete", async function (body, { dispatch, rejectWithValue }) {
  const response = await productService.likeProductRequest(body);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method likeProduct",
    });
  }
  const data: any = await response.json();
  dispatch(setLikeProduct(data));
  toast.info(`${ii18n.t("Product added to favourites")}`);
  return data;
});

export const dislikeProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: TError }
>("category/delete", async function (body, { dispatch, rejectWithValue }) {
  const response = await productService.dislikeProductRequest(body);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method dislikeProduct",
    });
  }
  const data: any = await response.json();
  dispatch(setDislikeProduct(data));
  toast.info(`${ii18n.t("Product removed from favourites")}`);
  return data;
});
