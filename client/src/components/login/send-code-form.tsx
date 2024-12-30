import React, { useState } from "react";
import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";
import { useTranslation } from "react-i18next";
import { GenericObject, useTypedDispatch, useTypedSelector } from "../../types";
import {
  getCode,
  sendCode,
  sendPassword,
} from "../../store/actions/authAction";
import Button from "../../shared/button/button";

export interface ISendCodeFormData {
  email: string;
  code: string;
  newPassword: string;
}

const SendCodeForm = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const sentCode = useTypedSelector((state) => state.service.codeSent);
  const resetPassword = useTypedSelector(
    (state) => state.service.resetPassword
  );

  const data: ISendCodeFormData = {
    email: "",
    code: "",
    newPassword: "",
  };

  const [errors, setErrors] = useState<GenericObject>({});

  const { values, handleChange } = useForm(data);

  const validateScheme = yup.object().shape({
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

    if (values.email && !values.code) {
      dispatch(getCode(values));
      return;
    }

    if (values.code && !values.newPassword) {
      dispatch(sendCode(values));
      return;
    }

    if (values.newPassword) {
      dispatch(sendPassword(values));
      values.email = "";
      values.code = "";
      values.newPassword = "";
      return;
    }
  };

  return (
    <>
      <form className="login__form" onSubmit={handleSubmit}>
        {!sentCode ? (
          <>
            <div className="login__inputs">
              <TextField
                label={t("Email")}
                name="email"
                value={values.email}
                onChange={handleChangeFields}
                error={errors.email}
              />
            </div>
            <Button buttonStyle="arrow-up" textContent={t("Get code")} />
          </>
        ) : !resetPassword ? (
          <>
            <div className="login__inputs">
              <TextField
                label={t("Code")}
                name="code"
                value={values.code}
                onChange={handleChangeFields}
                error={errors.code}
              />
            </div>
            <Button buttonStyle="arrow-up" textContent={t("Send code")} />
          </>
        ) : (
          <>
            <div className="login__inputs">
              <TextField
                label={t("New password")}
                name="newPassword"
                value={values.newPassword}
                onChange={handleChangeFields}
                error={errors.newPassword}
              />
            </div>
            <Button buttonStyle="arrow-up" textContent={t("Reset password")} />
          </>
        )}
      </form>
    </>
  );
};

export default SendCodeForm;
