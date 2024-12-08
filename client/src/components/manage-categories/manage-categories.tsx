import React, { useCallback, useState } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import {
  createCategory,
  deleteCategory,
} from "../../store/actions/categoryAction";
import { ICategory } from "../../types/store/categoryStoreType";
import { useTranslation } from "react-i18next";

export interface IChangeCategoryFormData {
  name: string;
  value: string;
}

const ManageCategories = () => {
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.category.categories);
  const location = useLocation();

  const initialState = {
    name: "",
  };

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(categories, 4);

  const categoriesToShow = showCurrentEntity();

  const [data, setData] = useState(initialState);

  const handleChangeCategory = useCallback(
    (target: IChangeCategoryFormData) => {
      setData((prevState) => ({
        ...prevState,
        [target?.name]: target?.value,
      }));
    },
    []
  );

  const handleDelete = ({ id }: ICategory) => {
    dispatch(deleteCategory(id));
  };

  const handleSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCategory(data));

    setData(initialState);
  };

  return (
    <>
      <div>
        <h2 className="section__title-center">{t("Manage categories")} </h2>

        <form
          className="login__form form__container"
          onSubmit={handleSubmitCategory}
        >
          <div className="login__inputs">
            <TextField
              label={t("Name")}
              name="name"
              value={data.name}
              onChange={handleChangeCategory}
            />
          </div>
          <button className="button button--flex" type="submit">
            {t("Create")}
            <i className="ri-add-line button__icon" />
          </button>
        </form>
      </div>
      <div className="table__container">
        {categoriesToShow.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>{t("Category name")} </th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {categoriesToShow.map((category: ICategory) => (
                <tr key={category.id}>
                  <td className="table__info table__gap">
                    <Link
                      className={`text text_type_main-small orders-feed__link`}
                      key={category.id}
                      to={{
                        pathname: `${url}/${category.id}`,
                        state: { background: location },
                      }}
                    >
                      <TextField
                        label={t("Name")}
                        name="name"
                        value={category.name}
                        onChange={handleChangeCategory}
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      className={`text text_type_main-small orders-feed__link`}
                      key={category.id}
                      to={{
                        pathname: `${url}/${category.id}`,
                        state: { background: location },
                      }}
                    >
                      <button
                        className="button button--flex button--gap"
                        type="button"
                      >
                        <i className="ri-pencil-line" />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="button button--flex button--gap"
                      type="button"
                      onClick={() => handleDelete(category)}
                    >
                      <i className="ri-close-line" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        {!categoriesToShow.length ? (
          <h2 className="table__title">
            {t("There is no categories to manage")}
          </h2>
        ) : null}
      </div>
      {categoriesToShow?.length ? (
        <Pagination
          currentPage={currentPage}
          jump={jump}
          maxPage={maxPage}
          next={next}
          prev={prev}
        />
      ) : null}
    </>
  );
};

export default ManageCategories;
