import React, { FC, useState } from "react";
import * as yup from "yup";
import history from "../../utils/history";
import MultiSelectField from "./multi-select-field";
import TextField from "./text-field";
import TextArea from "./text-area";
import { GenericObject, useTypedDispatch, useTypedSelector } from "../../types";
import {
  createProduct,
  getAllCategories,
} from "../../store/actions/productAction";
import { ICreateProduct } from "../../types/store/productStoreType";
import { useTranslation } from "react-i18next";

interface IFormProps {
  type: string;
  productId?: string;
  changeAction?: () => void | undefined | any;
}

const Form: FC<IFormProps> = ({ type, changeAction }) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const categories = useTypedSelector((state) => state.category.categories);

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

  const [errors, setErrors] = useState<GenericObject>({});

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleChange = (target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    validate();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    const newData: ICreateProduct = {
      ...data,
      categories: data.categories.map((category: any): any => ({
        id: category.value,
        name: category.label,
      })),
    };

    dispatch(createProduct(newData));
    setData(initialState);
    if (changeAction) {
      changeAction();
    }
    setErrors({});
  };

  const validateScheme = yup.object().shape({
    categories: yup.array().min(1, t("Set minimum one category")),
    image: yup.string().required(t("Set url for image")),
    price: yup
      .string()
      .required(t("Set price"))
      .matches(/^[0-9]+\.?[0-9]*$/, t("Price entered incorrectly")),
    description: yup.string().required(t("Set description")),
    name: yup
      .string()
      .required(t("Set name"))
      .min(4, t("Name must be at least 4 characters long")),
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const handleReturn = () => {
    history.replace("/admin");
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
          <TextField
            label={t("Name")}
            name="name"
            value={data.name}
            error={errors.name}
            onChange={handleChange}
          />
          <TextArea
            label={t("Description")}
            name="description"
            value={data.description}
            error={errors.description}
            onChange={handleChange}
          />
          <TextField
            label={t("Price")}
            name="price"
            type="number"
            value={data.price}
            error={errors.price}
            onChange={handleChange}
          />
          <TextField
            label={t("Image")}
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
            label={t("Categories")}
            error={errors.categories}
          />
        </div>

        {type === "add" ? (
          <button className="button button--flex" type="submit">
            {t("Add")}
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
