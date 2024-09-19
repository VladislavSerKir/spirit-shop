import React from "react";
import { useParams } from "react-router-dom";
import Product from "./product";
import ProductLoader from "../../shared/hoc/product-loader/product-loader";
import { IUseParams } from "../../types";
import ProductsList from "./product-list";

const ProductsLayout = () => {
  const { id } = useParams<IUseParams>();
  return (
    <ProductLoader>
      {id ? <Product productId={id} /> : <ProductsList />}
    </ProductLoader>
  );
};

export default ProductsLayout;
