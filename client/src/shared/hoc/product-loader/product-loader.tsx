import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getDataStatus, loadProducts } from '../../store/products';
import Loader from "../../loader/loader";

interface IProductLoader {
  //   children: React.ReactNode;
  children: any;
}

const ProductLoader: FC<IProductLoader> = ({ children }) => {
  //   const dispatch = useDispatch();
  //   const dataStatus = useSelector(getDataStatus());
  //   useEffect(() => {
  //     if (!dataStatus) {
  //       dispatch(loadProducts());
  //     }
  //   }, []);

  //   if (!dataStatus) {
  //     return <Loader />;
  //   }

  return children;
};

export default ProductLoader;
