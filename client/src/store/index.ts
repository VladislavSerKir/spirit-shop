import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
});

const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export default store;
