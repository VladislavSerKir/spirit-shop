import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  removeProduct,
  setCategoryRequest,
  setProductRequest,
} from "../reducers/productReducer";
import { TError } from "../../types";
import { config } from "../../utils/api";
import {
  ICategory,
  ICreateProduct,
  IProduct,
  IRemoveProduct,
} from "../../types/productType";
import productService from "../../service/product.service";

export const getAllProducts = createAsyncThunk<
  IProduct[],
  undefined,
  { rejectValue: any }
>("products/getAllProducts", async function (_, { dispatch, rejectWithValue }) {
  dispatch(setProductRequest(true));
  const response = await fetch(`${config.apiEndPoint}/products`);
  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method getAllProducts",
    });
  }
  const data: IProduct[] = await response.json();
  dispatch(setProductRequest(false));
  return data;
});

export const createProduct = createAsyncThunk<
  ICreateProduct,
  ICreateProduct,
  { rejectValue: TError }
>("products/create", async function (product, { rejectWithValue }) {
  const response = await productService.createProductRequest(product);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method createProduct",
    });
  }
  const data: ICreateProduct = await response.json();

  return data;
});

export const deleteProduct = createAsyncThunk<
  any,
  number,
  { rejectValue: TError }
>("products/create", async function (id, { dispatch, rejectWithValue }) {
  const response = await productService.deleteProductRequest(id);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method createProduct",
    });
  }
  const data: IRemoveProduct = await response.json();
  dispatch(removeProduct(data.id));
  // return data;
});

export const getAllCategories = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: any }
>(
  "products/getAllCategories",
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
