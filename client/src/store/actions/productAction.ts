import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  refreshCategories,
  refreshProducts,
  removeCategory,
  removeProduct,
  setCategoryRequest,
  setProductRequest,
  updateCategory,
} from "../reducers/productReducer";
import { TError } from "../../types";
import { config } from "../../utils/api";
import {
  ICartParams,
  ICategory,
  ICreateCategory,
  ICreateProduct,
  IProduct,
  IProductWithCategories,
  IRemoveCategory,
  IRemoveProduct,
} from "../../types/productType";
import productService from "../../service/product.service";
import { toast } from "react-toastify";
import { refreshCart } from "../reducers/userReducer";
import { TPurchase } from "../../types/orderType";

export const getAllProducts = createAsyncThunk<
  IProductWithCategories[],
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
  const data: IProductWithCategories[] = await response.json();
  dispatch(setProductRequest(false));
  return data;
});

export const createProduct = createAsyncThunk<
  IProductWithCategories,
  ICreateProduct,
  { rejectValue: TError }
>("products/create", async function (product, { dispatch, rejectWithValue }) {
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
>("products/edit", async function (product, { dispatch, rejectWithValue }) {
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
>("products/delete", async function (id, { dispatch, rejectWithValue }) {
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

export const createCategory = createAsyncThunk<
  ICreateCategory,
  ICreateCategory,
  { rejectValue: TError }
>("category/create", async function (category, { dispatch, rejectWithValue }) {
  const response = await productService.createCategoryRequest(category);

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
  const response = await productService.editCategoryRequest(body);

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
  const response = await productService.deleteCategoryRequest(id);

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

export const addProductToCart = createAsyncThunk<
  IProduct,
  IProduct,
  { rejectValue: TError }
>("cart/add", async function (product, { dispatch, rejectWithValue }) {
  const response = await productService.addProductToCartRequest(product);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method addProductToCart",
    });
  }
  const data: IProduct = await response.json();
  dispatch(refreshCart(data));
  toast.success(`Product added to cart`);
  return data;
});

export const removeProductFromCart = createAsyncThunk<
  IProduct,
  IProduct,
  { rejectValue: TError }
>("cart/remove", async function (product, { dispatch, rejectWithValue }) {
  const response = await productService.removeProductFromCartRequest(product);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method removeProductFromCart",
    });
  }
  const data: IProduct = await response.json();
  dispatch(refreshCart(data));
  toast.warning(`Product removed from cart`);
  return data;
});

export const submitPurchase = createAsyncThunk<
  TPurchase,
  ICartParams,
  { rejectValue: TError }
>("cart/purchase", async function (params, { dispatch, rejectWithValue }) {
  const response = await productService.submitPurchaseRequest(params);

  if (!response.ok) {
    return rejectWithValue({
      status: response.status,
      message: "Server Error, take a look on method submitPurchase",
    });
  }
  const data: TPurchase = await response.json();
  dispatch(refreshCart(data));
  toast.success(`Thank you for purchase`);
  return data;
});
