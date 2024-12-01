import React, { useState } from "react";
import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";
import { useTranslation } from "react-i18next";
import { GenericObject } from "../../types";
import { config } from "../../utils/api";

const LoginForm = () => {
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

  const { values, handleChange, handleLogin } = useForm(data);

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required(t("Password is required"))
      .min(2, t("Password must be at least 2 characters long")),
    email: yup
      .string()
      .required(t("Email is required"))
      .email(t("Email entered incorrectly")),
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    handleLogin(e);
  };

  const handleYandexLogin = () => {
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${config.clientId}`;
  };

  return (
    <>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
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
        <div className="login__buttons">
          <button className="button button--flex" type="submit">
            {t("Sign In")}
            <i className="ri-arrow-right-up-line button__icon" />
          </button>

          <button
            className="button button__yandex button--flex"
            onClick={handleYandexLogin}
            type="button"
          >
            {t("Sign In via Yandex")}
            <i className="ri-arrow-right-up-line button__icon" />
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
