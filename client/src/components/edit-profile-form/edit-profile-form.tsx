import React, { FC, useState } from "react";
import * as yup from "yup";
import { GenericObject, useTypedSelector } from "../../types";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../shared/button/button";

const EditProfileForm: FC = () => {
  const user = useTypedSelector((state) => state.user.userData);
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  const location = useLocation();

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    mobileNumber: user.mobileNumber,
    email: user.email,
    password: "",
  };

  const [errors, setErrors] = useState<GenericObject>({});

  const { values, handleChange, handleUpdateUser } = useForm(initialState);

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required(t("Password is required"))
      .min(2, t("Password must be at least 2 characters long")),
    email: yup
      .string()
      .required(t("Email is required"))
      .email(t("Email entered incorrectly")),
    mobileNumber: yup
      .string()
      .required(t("Mobile is required"))
      .matches(/^[0-9\s()+-]*$/, t("Mobile number entered incorrectly")),
    lastName: yup
      .string()
      .required(t("Last name is required"))
      .min(2, t("Last name must be at least 2 characters long"))
      .max(20, t("Last name must not exceed 20 characters")),
    firstName: yup
      .string()
      .required(t("First name is required"))
      .min(2, t("First name must be at least 2 characters long"))
      .max(20, t("First name must not exceed 20 characters")),
  });

  const validate = () => {
    validateScheme
      .validate(values)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const handleChangeFields = (e: React.FormEvent<HTMLFormElement>) => {
    validate();
    handleChange(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    if (values.mobileNumber.includes("_")) {
      return;
    }
    handleUpdateUser(e);
  };

  return (
    <div className="login__container">
      <h2 className="section__title-center">{t("Change profile")}</h2>
      <div className="profile__avatar-container">
        <Link
          className={`text text_type_main-small orders-feed__link`}
          to={{ pathname: `${url}/avatar`, state: { background: location } }}
        >
          <img src={user.avatar} alt="avatar" className="profile__avatar-img" />
        </Link>
      </div>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
          <TextField
            label={t("First name")}
            name="firstName"
            value={values.firstName}
            onChange={handleChangeFields}
            error={errors.firstName}
          />
          <TextField
            label={t("Last name")}
            name="lastName"
            value={values.lastName}
            onChange={handleChangeFields}
            error={errors.lastName}
          />
          <TextField
            label={t("Mobile number")}
            name="mobileNumber"
            value={values.mobileNumber}
            onChange={handleChangeFields}
            error={errors.mobileNumber}
            type_phone
          />
          <TextField
            label={t("Email")}
            name="email"
            value={values.email}
            onChange={handleChangeFields}
            error={errors.email}
          />
          <TextField
            label={t("Password")}
            name="password"
            type="password"
            value={values.password}
            onChange={handleChangeFields}
            error={errors.password}
          />
        </div>
        <Button buttonStyle="edit" textContent={t("Edit")} />
      </form>
    </div>
  );
};

export default EditProfileForm;
