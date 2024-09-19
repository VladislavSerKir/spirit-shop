import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loadCategory } from "../../store/category";
// import { getProductsLoadingStatus, loadProducts } from "../../store/products";
// import {
//   getQuestionsLoadingStatus,
//   loadQuestions,
// } from "../../store/questions";
// import { getIsLoggedIn } from "../../store/user";
// import localStorageService from "../../services/localStorage.service";
// import { loadUserCart } from "../../store/cart";
import Loader from "../../loader/loader";

interface IAppLoader {
  //   children: React.ReactNode;
  children: any;
}

const AppLoader: FC<IAppLoader> = ({ children }) => {
  //   const dispatch = useDispatch();
  //   const productsLoadingStatus = useSelector(getProductsLoadingStatus());
  //   const questionsLoadingStatus = useSelector(getQuestionsLoadingStatus());
  //   const isLoggedIn = useSelector(getIsLoggedIn());
  //   const userId = localStorageService.getUserId();
  //   useEffect(() => {
  //     dispatch(loadProducts());
  //     dispatch(loadCategory());
  //     dispatch(loadQuestions());
  //     if (isLoggedIn) {
  //       dispatch(loadUserCart(userId));
  //     }
  //   }, [isLoggedIn]);
  //   if (productsLoadingStatus || questionsLoadingStatus) {
  //     return <Loader />;
  //   }
  return children;
};

export default AppLoader;
