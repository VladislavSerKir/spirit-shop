import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getCategory } from "../../../store/category";
// import { deleteProduct, getProducts } from "../../../store/products";
import history from "../../utils/history";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { ICategory } from "../../types/productType";
import { deleteProduct } from "../../store/actions/productAction";

const TableOfProducts = () => {
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);
  const categories = useTypedSelector((state) => state.products.categories);
  //   const dispatch = useDispatch();
  //   const products = useSelector(getProducts());
  //   const categories = useSelector(getCategory());

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  //   const handleEdit = (id) => {
  //     history.push(`/admin/${id}`);
  //   };

  // const products = [
  //   {
  //     id: 1,
  //     name: "product.name",
  //     image: "product.image",
  //     price: 42,
  //     categories: [],
  //   },
  // ];

  // const categories: any = [];

  const handleEdit = (id: number) => {};

  // const handleDelete = (id: number) => {
  //   console.log(id);
  // };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Categories</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="table__info">{product.name}</td>
            <td className="table__info">{product.price}</td>
            <td className="table__info table__info-category">
              {product?.categories.map((category: any) => (
                // <span className="product__category" key={p}>
                //   {categories.find((category: any) => category.id === p)?.name}
                // </span>
                <span className="product__category" key={category.id}>
                  {category.name}
                </span>
              ))}
            </td>
            <td>
              <button
                className="button button--flex button--gap"
                type="button"
                onClick={() => handleEdit(product.id)}
              >
                <i className="ri-pencil-line" />
              </button>
            </td>
            <td>
              <button
                className="button button--flex button--gap"
                type="button"
                onClick={() => handleDelete(product.id)}
              >
                <i className="ri-close-line" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOfProducts;
