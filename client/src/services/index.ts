import { configureStore, combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({});

const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export default store;
