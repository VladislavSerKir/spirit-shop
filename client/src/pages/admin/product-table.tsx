import React from "react";
import { useParams } from "react-router-dom";
import Form from "../../shared/form/form";
import { IUseParams } from "../../types";
import TableOfProducts from "./table-of-products";

const ProductTable = () => {
  const { id } = useParams<IUseParams>();

  return id ? <Form type="edit" productId={id} /> : <TableOfProducts />;
};

export default ProductTable;
