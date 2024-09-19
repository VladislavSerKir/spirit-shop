import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getCategory } from "../../../store/category";
// import { deleteProduct, getProducts } from "../../../store/products";
import history from "../../utilits/history";

const TableOfProducts = () => {
  //   const dispatch = useDispatch();
  //   const products = useSelector(getProducts());
  //   const categories = useSelector(getCategory());

  //   const handleDelete = (id) => {
  //     dispatch(deleteProduct(id));
  //   };

  //   const handleEdit = (id) => {
  //     history.push(`/admin/${id}`);
  //   };

  const products = [
    {
      id: 1,
      name: "product.name",
      image: "product.image",
      price: 42,
      categories: [],
    },
  ];

  const categories: any = [];

  const handleEdit = (id: number) => {};

  const handleDelete = (id: number) => {};

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
              {product.categories.map((p) => (
                <span className="product__category" key={p}>
                  {categories.find((c: any) => c._id === p).name}
                </span>
              ))}
            </td>
            <td>
              <button
                className="button button--flex"
                type="button"
                onClick={() => handleEdit(product.id)}
              >
                <i className="ri-pencil-line" />
              </button>
            </td>
            <td>
              <button
                className="button button--flex"
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
