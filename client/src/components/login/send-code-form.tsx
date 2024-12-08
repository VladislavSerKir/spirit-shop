import React, { useState } from "react";
import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";
import { useTranslation } from "react-i18next";
import { GenericObject, useTypedDispatch } from "../../types";
import { sendCode } from "../../store/actions/authAction";

export interface ISendCodeFormData {
  password: string;
}

const SendCodeForm = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const data: ISendCodeFormData = {
    password: "",
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
    dispatch(sendCode(values));
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
        </div>
        <button className="button button--flex" type="submit">
          {t("Send code")}
          <i className="ri-arrow-right-up-line button__icon" />
        </button>
      </form>
    </>
  );
};

export default SendCodeForm;
