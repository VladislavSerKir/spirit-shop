import React from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { deleteProduct } from "../../store/actions/productAction";

const CategoryTable = () => {
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.products.categories);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (id: number) => {};

  if (!categories.length) {
    return <h2 className="table__title">There is no categories to manage</h2>;
  }

  return (
    <div className="table__container">
      <table className="table">
        <thead>
          <tr>
            <th>Category name</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="table__info">{category.name}</td>
              <td>
                <button
                  className="button button--flex button--gap"
                  type="button"
                  onClick={() => handleEdit(category.id)}
                >
                  <i className="ri-pencil-line" />
                </button>
              </td>
              <td>
                <button
                  className="button button--flex button--gap"
                  type="button"
                  onClick={() => handleDelete(category.id)}
                >
                  <i className="ri-close-line" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
