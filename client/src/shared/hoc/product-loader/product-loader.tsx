import React, { FC } from "react";
import Loader from "../../loader/loader";
import { useTypedSelector } from "../../../types";

interface IProductLoaderProps {
  children: any;
}

const ProductLoader: FC<IProductLoaderProps> = ({ children }) => {
  const productsLoading = useTypedSelector(
    (state) => state.products.productsRequest
  );

  if (productsLoading) {
    return <Loader />;
  }

  return children;
};

export default ProductLoader;
