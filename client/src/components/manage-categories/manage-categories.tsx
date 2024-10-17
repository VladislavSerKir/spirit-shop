import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import {
  createCategory,
  deleteCategory,
} from "../../store/actions/productAction";
import { toast } from "react-toastify";
import { ICategory } from "../../types/productType";

const ManageCategories = () => {
  const { url } = useRouteMatch();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.products.categories);

  const initialState = {
    name: "",
  };

  const [data, setData] = useState(initialState);

  const handleChangeCategory = (target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleDelete = ({ id, name }: ICategory) => {
    dispatch(deleteCategory(id));
    toast.error(`Category ${name} deleted!`);
  };

  const handleSubmitCategory = (e: any) => {
    e.preventDefault();
    dispatch(createCategory(data));

    setData(initialState);
    // setErrors({});
  };

  return (
    <>
      <div>
        <h2 className="section__title-center">Manage categories</h2>

        <form
          className="login__form form__container"
          onSubmit={handleSubmitCategory}
        >
          <div className="login__inputs">
            <TextField
              label="Name"
              name="name"
              value={data.name}
              onChange={handleChangeCategory}
            />
          </div>
          <button className="button button--flex" type="submit">
            Create
            <i className="ri-add-line button__icon" />
          </button>
        </form>
      </div>
      <div className="table__container">
        {categories.length ? (
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
                  <td className="table__info table__gap">
                    <Link
                      className={`text text_type_main-small orders-feed__link`}
                      key={category.id}
                      to={{ pathname: `${url}/${category.id}` }}
                    >
                      <TextField
                        label="Name"
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
                      to={{ pathname: `${url}/${category.id}` }}
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
        {!categories.length ? (
          <h2 className="table__title">There is no categories to manage</h2>
        ) : null}
      </div>
    </>
  );
};

export default ManageCategories;
