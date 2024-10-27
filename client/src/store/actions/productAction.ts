import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  refreshProducts,
  removeProduct,
  setCategoryRequest,
  setProductRequest,
} from "../reducers/productReducer";
import { TError } from "../../types";
import { config } from "../../utils/api";
import {
  ICategory,
  ICreateProduct,
  IProductWithCategories,
  IRemoveProduct,
} from "../../types/productType";
import productService from "../../service/product.service";
import { toast } from "react-toastify";

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
  toast.success(`Product ${data.name} with price ${data.price} created!`);
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
  toast.warn(`Product edited`);
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
  toast.error(`Product deleted`);
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
