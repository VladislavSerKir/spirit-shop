import React, { useState } from "react";
import {} from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import {
  createCategory,
  deleteCategory,
} from "../../store/actions/productAction";
import { toast } from "react-toastify";
import { ICategory } from "../../types/productType";

const ManageCategories = () => {
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.products.categories);

  const initialState = {
    name: "",
  };

  const [data, setData] = useState(initialState);

  const handleChange = (target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleDelete = ({ id, name }: ICategory) => {
    dispatch(deleteCategory(id));
    toast.error(`Category ${name} deleted!`);
  };

  const handleEdit = (id: number) => {};

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
    // const newData: ICreateProduct = {
    //   ...data,
    //   categories: data.categories.map((category: any): any => ({
    //     id: category.value,
    //     name: category.label,
    //   })),
    //   categories: data.categories.map((category: any) => category?.value),
    // };
    // console.log(newData);
    dispatch(createCategory(data));
    // toast.info(`Category created!`);

    setData(initialState);
    // setErrors({});
  };

  // if (!categories.length) {
  //   return <h2 className="table__title">There is no categories to manage</h2>;
  // }

  return (
    <>
      <div>
        <h2 className="section__title-center">Manage categories</h2>

        <form className="login__form form__container" onSubmit={handleSubmit}>
          <div className="login__inputs">
            <TextField
              label="Name"
              name="name"
              value={data.name}
              onChange={handleChange}
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
                    <TextField
                      label="Name"
                      name="name"
                      value={category.name}
                      onChange={handleChange}
                    />
                  </td>
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
