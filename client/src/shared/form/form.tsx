import React, { FC, useEffect, useState } from "react";
// import * as yup from "yup";
import history from "../../utils/history";
import MultiSelectField from "./multi-select-field";
import TextField from "./text-field";
import TextArea from "./text-area";
import { useTypedDispatch, useTypedSelector } from "../../types";
import {
  createProduct,
  getAllCategories,
} from "../../store/actions/productAction";
import { ICreateProduct } from "../../types/productType";

interface IForm {
  type: string;
  productId?: string;
  changeAction?: () => void | undefined | any;
}

const Form: FC<IForm> = ({ type, productId, changeAction }) => {
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.products.categories);
  const categoriesList = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const initialState = {
    name: "",
    description: "",
    image: "",
    categories: [],
    price: "",
  };

  const [data, setData] = useState(initialState);

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleChange = (target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newData: ICreateProduct = {
      ...data,
      categories: data.categories.map((category: any): any => ({
        id: category.value,
        name: category.label,
      })),
      // categories: data.categories.map((category: any) => category?.value),
    };
    console.log(newData);
    dispatch(createProduct(newData));
    setData(initialState);
    if (changeAction) {
      changeAction();
    }
    // setErrors({});
  };

  //   const product = useSelector(getProductById(productId));
  //   const categories = useSelector(getCategory());
  // const initialState = productId
  //   ? {
  //       ...product,
  //       price: String(product.price),
  //       categories: [
  //         ...product.categories.map((category: ICategory) => ({
  //           label: categories.find((c) => c.id === category)?.name,
  //           value: category,
  //         })),
  //       ],
  //     }
  //   : {
  //       name: "",
  //       description: "",
  //       image: "",
  //       categories: [],
  //       price: "",
  //     };

  //   const dispatch = useDispatch();
  //   const [errors, setErrors] = useState({});

  //   const categoriesList = categories.map(c => ({ label: c.name, value: c._id }));
  //   const productsErrors = useSelector(getProductsError());

  //   const validateScheme = yup.object().shape({
  //     categories: yup.array().min(1, 'Set minimun one category'),
  //     image: yup.string().required('Set url for image'),
  //     price: yup
  //       .string()
  //       .matches(/^[0-9]+\.?[0-9]*$/, 'Price entered incorrectly')
  //       .required('Set price'),
  //     description: yup.string().required('Set description'),
  //     name: yup.string().required('Set name'),
  //   });

  //   const validate = () => {
  //     validateScheme
  //       .validate(data)
  //       .then(() => setErrors({}))
  //       .catch(err => setErrors({ [err.path]: err.message }));
  //     return Object.keys(errors).length === 0;
  //   };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   const isValid = validate();
  //   if (!isValid) return;
  //   const newData = {
  //     ...data,
  //     categories: data.categories.map((category: ICategory) => category.value),
  //   };
  //   if (type === "add") {
  //     dispatch(createProduct(newData));
  //     setData(initialState);
  //     setErrors({});
  //   } else {
  //     dispatch(updateProduct(newData));
  //     history.replace("/admin");
  //   }
  // };

  const handleReturn = () => {
    history.replace("/admin");
  };

  //   useEffect(() => {
  //     validate();
  //   }, [data]);

  const errors = {
    name: "",
    description: "",
    image: "",
    categories: [],
    price: "",
  };

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

        {/* <div className="login__checked-error">
          <span className="login__error-message">productsErrors</span>
        </div> */}

        {type === "add" ? (
          <button className="button button--flex" type="submit">
            Add
            <i className="ri-add-line button__icon" />
          </button>
        ) : (
          <div className="container-center">
            <button className="button button--flex" type="submit">
              Update
              <i className="ri-refresh-line button__icon" />
            </button>
            <span> </span>
            <button
              className="button button--flex"
              type="button"
              onClick={handleReturn}
            >
              Return
              <i className="ri-arrow-go-back-line button__icon" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
