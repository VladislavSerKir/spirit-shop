import { useTypedDispatch, useTypedSelector } from "../../types";
import { deleteProduct } from "../../store/actions/productAction";
import { useTranslation } from "react-i18next";
import Button from "../../shared/button/button";

const TableOfCategories = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.category.categories);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (!categories.length) {
    return (
      <h2 className="table__title">{t("There is no categories to manage")}</h2>
    );
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
              <Button buttonStyle="edit" buttonType="button" />
            </td>
            <td>
              <Button
                buttonStyle="close"
                buttonType="button"
                buttonHandler={() => handleDelete(category.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableOfCategories;
