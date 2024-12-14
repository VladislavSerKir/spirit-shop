import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";
import { orderReducer } from "./reducers/orderReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { authReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";
import { reviewReducer } from "./reducers/reviewReducer";
import { serviceReducer } from "./reducers/serviceReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  category: categoryReducer,
  order: orderReducer,
  auth: authReducer,
  cart: cartReducer,
  review: reviewReducer,
  service: serviceReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export default createStore;
