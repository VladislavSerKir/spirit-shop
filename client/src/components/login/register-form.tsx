import React, { useState } from "react";
import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { GenericObject } from "../../types";
import { useForm } from "../../hooks/useForm";
import { useTranslation } from "react-i18next";
import Button from "../../shared/button/button";

const RegisterForm = () => {
  const { t } = useTranslation();
  const data = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "",
  };

  const [errors, setErrors] = useState<GenericObject>({});

  const { values, handleChange, handleRegister } = useForm(data);

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
    handleRegister(e);
  };

  return (
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
      <Button buttonStyle="arrow-up" textContent={t("Sign Up")} />
    </form>
  );
};

export default RegisterForm;
