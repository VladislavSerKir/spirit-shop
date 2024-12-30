import React, { useState } from "react";
import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";
import { useTranslation } from "react-i18next";
import { GenericObject, useTypedDispatch } from "../../types";
import { config } from "../../utils/api";
import { loginGoogle } from "../../store/actions/authAction";
import { useGoogleLogin } from "@react-oauth/google";
import Button from "../../shared/button/button";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    handleLogin(e);
  };

  const handleYandexLogin = () => {
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${config.clientId}`;
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(loginGoogle({ access_token: tokenResponse.access_token }));
    },
  });

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
          <Button buttonStyle="arrow-up" textContent={t("Sign In")} />
          <Button
            buttonStyle="yandex"
            textContent={t("Sign In with Yandex")}
            buttonHandler={() => handleYandexLogin()}
          />
          <Button
            buttonStyle="google"
            textContent={t("Sign In with Google")}
            buttonHandler={() => handleGoogleLogin()}
          />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
