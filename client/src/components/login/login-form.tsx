import React, { useState } from "react";
import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";
import { useTranslation } from "react-i18next";
import { GenericObject, useTypedDispatch } from "../../types";
import { loginYandex, receiveInfoYandex } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import history from "../../utils/history";
import { config } from "../../utils/api";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

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
    window.location.replace(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${config.clientId}`
    );
  };

  const handleReceiveLogin = () => {
    dispatch(loginYandex());
  };

  const handleReceiveInfo = () => {
    dispatch(receiveInfoYandex());
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
        <button className="button button--flex" type="submit">
          {t("Sign In")}
          <i className="ri-arrow-right-up-line button__icon" />
        </button>

        <button
          className="button button--flex"
          onClick={handleYandexLogin}
          type="button"
        >
          Войти через Yandex
          <i className="ri-arrow-right-up-line button__icon" />
        </button>
        <button
          className="button button--flex"
          onClick={handleReceiveLogin}
          type="button"
        >
          Получить токен Yandex
          <i className="ri-arrow-right-up-line button__icon" />
        </button>
        <button
          className="button button--flex"
          onClick={handleReceiveInfo}
          type="button"
        >
          Получить информацию Yandex
          <i className="ri-arrow-right-up-line button__icon" />
        </button>
      </form>
    </>
  );
};

export default LoginForm;
