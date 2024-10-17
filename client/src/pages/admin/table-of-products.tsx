import React from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { deleteProduct } from "../../store/actions/productAction";
import { Link, useRouteMatch } from "react-router-dom";

const TableOfProducts = () => {
  const { url } = useRouteMatch();
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (id: number) => {};

  if (!products.length) {
    return <h2 className="table__title">There is no product to manage</h2>;
  }

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
            <td className="table__info table__info-image">
              <img
                src={product.image}
                alt={product.name}
                className="table__image"
              />
              {product.name}
            </td>
            <td className="table__info">{product.price}</td>
            <td className="table__info table__info-category">
              {product?.categories.map((category: any) => (
                <span className="product__category" key={category.id}>
                  {category.name}
                </span>
              ))}
            </td>
            <td>
              <Link
                className={`text text_type_main-small orders-feed__link`}
                key={product.id}
                to={{ pathname: `${url}/${product.id}` }}
              >
                <button
                  className="button button--flex button--gap"
                  type="button"
                  onClick={() => handleEdit(product.id)}
                >
                  <i className="ri-pencil-line" />
                </button>
              </Link>
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
