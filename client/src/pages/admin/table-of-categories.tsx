import React from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { deleteProduct } from "../../store/actions/productAction";
import { useTranslation } from "react-i18next";

const TableOfCategories = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.category.categories);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (!categories.length) {
    return <h2 className="table__title">There is no categories to manage</h2>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>{t("Category name")} </th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className="table__info">{category.name}</td>
            <td>
              <button className="button button--flex button--gap" type="button">
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
  );
};

export default TableOfCategories;
