import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";
import { orderReducer } from "./reducers/orderReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { authReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  category: categoryReducer,
  order: orderReducer,
  auth: authReducer,
  cart: cartReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export default createStore;
