import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";
import { orderReducer } from "./reducers/orderReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  order: orderReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export default createStore;
