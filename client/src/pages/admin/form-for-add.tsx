import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";
// import { getCategory } from "../../../store/category";
// import { createProduct, getProductsError } from "../../../store/products";
import TextArea from "../../shared/form/text-area";
import TextField from "../../shared/form/text-field";
import MultiSelectField from "../../shared/form/multi-select-field";

const FormForAdd = () => {
  //   const initialState = {
  //     name: "",
  //     description: "",
  //     image: "",
  //     categories: [],
  //     price: "",
  //   };

  //   const dispatch = useDispatch();
  //   const [data, setData] = useState(initialState);
  //   const [errors, setErrors] = useState({});
  //   const categories = useSelector(getCategory());

  //   const categoriesList = categories.map((c) => ({
  //     label: c.name,
  //     value: c._id,
  //   }));

  //   const productsErrors = useSelector(getProductsError());
  // const handleChange = (target) => {
  //   setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  // };

  //   const validateScheme = yup.object().shape({
  //     categories: yup.array().min(1, "Set minimun one category"),
  //     image: yup.string().required("Set url for image"),
  //     price: yup
  //       .string()
  //       .matches(/^[0-9]+\.?[0-9]*$/, "Price entered incorrectly")
  //       .required("Set price"),
  //     description: yup.string().required("Set description"),
  //     name: yup.string().required("Set name"),
  //   });

  //   const validate = () => {
  //     validateScheme
  //       .validate(data)
  //       .then(() => setErrors({}))
  //       .catch((err) => setErrors({ [err.path]: err.message }));
  //     return Object.keys(errors).length === 0;
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const isValid = validate();
  //     if (!isValid) return;
  //     const newData = {
  //       ...data,
  //       categories: data.categories.map((c) => c.value),
  //     };
  //     dispatch(createProduct(newData));
  //     setData(initialState);
  //     setErrors({});
  //   };

  //   useEffect(() => {
  //     validate();
  //   }, [data]);

  const handleChange = () => {};

  const handleSubmit = () => {};

  const data = {
    name: "",
    description: "",
    image: "",
    categories: [],
    price: "",
  };

  const errors = {
    name: "",
    description: "",
    image: "",
    categories: [],
    price: "",
  };

  const categoriesList = "";

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
          <TextField
            label="Name"
            name="name"
            value={data.name}
            error={errors.name}
            onChange={handleChange}
          />
          <TextArea
            label="Description"
            name="description"
            value={data.description}
            error={errors.description}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={data.price}
            error={errors.price}
            onChange={handleChange}
          />
          <TextField
            label="Image"
            name="image"
            value={data.image}
            error={errors.image}
            onChange={handleChange}
          />
          <MultiSelectField
            options={categoriesList}
            onChange={handleChange}
            defaultValue={data.categories}
            name="categories"
            label="Categories"
            error={errors.categories}
          />
        </div>

        {/* {productsErrors && (
          <div className="login__checked-error">
            <span className="login__error-message">{productsErrors}</span>
          </div>
        )} */}

        <div className="login__checked-error">
          <span className="login__error-message">productsErrors</span>
        </div>

        <button className="button button--flex" type="submit">
          Add
          <i className="ri-add-line button__icon" />
        </button>
      </form>
    </div>
  );
};

export default FormForAdd;
