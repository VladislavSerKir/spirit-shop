import React, { FC, useState } from "react";
// import * as yup from "yup";
import { TUserError, useTypedDispatch, useTypedSelector } from "../../types";
import {} from "../../store/actions/productAction";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";
import { Link, useRouteMatch } from "react-router-dom";
import { IUserData } from "../../types/store/userStoreType";
import { useTranslation } from "react-i18next";

const EditProfileForm: FC = () => {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);
  const { url } = useRouteMatch();
  const { t } = useTranslation();

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    mobileNumber: user.mobileNumber,
    email: user.email,
    password: "",
  };

  const [errors, setErrors] = useState<IUserData | TUserError>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "",
  });

  const { values, handleChange, handleUpdateUser } = useForm(initialState);

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

  // const handleReturn = () => {
  //   history.replace("/admin");
  // };

  //   useEffect(() => {
  //     validate();
  //   }, [data]);

  // const errors = {
  //   name: "",
  //   description: "",
  //   image: "",
  //   categories: [],
  //   price: "",
  // };

  return (
    <div className="login__container">
      <h2 className="section__title-center">{t("Change profile")}</h2>
      <div className="profile__avatar-container">
        <Link
          className={`text text_type_main-small orders-feed__link`}
          to={{ pathname: `${url}/avatar` }}
        >
          <img src={user.avatar} alt="avatar" className="profile__avatar-img" />
        </Link>
      </div>
      <form className="login__form" onSubmit={handleUpdateUser}>
        <div className="login__inputs">
          <TextField
            label={t("First name")}
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <TextField
            label={t("Last name")}
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <TextField
            label={t("Mobile number")}
            name="mobileNumber"
            value={values.mobileNumber}
            onChange={handleChange}
            error={errors.mobileNumber}
          />
          <TextField
            label={t("Email")}
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label={t("Password")}
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <button className="button button--flex" type="submit">
          {t("Edit")}
          <i className="ri-add-line button__icon" />
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
