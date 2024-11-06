import React, { useEffect, useState } from "react";
import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { TUserError, useTypedDispatch } from "../../types";
import { useForm } from "../../hooks/useForm";
import { IUserData } from "../../types/store/userStoreType";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  //   const loginError = useSelector(getAuthError());
  const data = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "",
  };

  const [errors, setErrors] = useState<IUserData | TUserError>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const { values, handleChange, handleRegister } = useForm(data);

  // const validateScheme = yup.object().shape({
  //   password: yup
  //     .string()
  //     .required("Password is required")
  //     .matches(/(?=.*[0-9])/, "Password must consist a number")
  //     .min(8, "Password must be at least 8 characters long"),
  //   email: yup
  //     .string()
  //     .required("Email is required")
  //     .email("Email entered incorrectly"),
  //   mobileNumber: yup
  //     .string()
  //     .required("Mobile is required")
  //     .matches(/^[0-9]+$/, "Mobile number entered incorrectly")
  //     .max(15, "Mobile number must be maximum 15 characters long")
  //     .min(7, "Mobile number must be at least 7 characters long"),
  //   lastName: yup
  //     .string()
  //     .required("Last name is required")
  //     .min(3, "Last name must be at least 3 characters long"),
  //   firstName: yup
  //     .string()
  //     .required("First name is required")
  //     .min(2, "First name must be at least 2 characters long"),
  // });

  // const validate = () => {
  //   validateScheme
  //     .validate(data)
  //     .then(() =>
  //       setErrors({
  //         firstName: "",
  //         lastName: "",
  //         mobileNumber: "",
  //         email: "",
  //         password: "",
  //       })
  //     )
  //     .catch((err) => setErrors({ [err.path]: err.message }));
  //   return Object.keys(errors).length === 0;
  // };

  // const handleChange = (target: TEventTarget) => {
  //   setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const isValid = validate();
    // console.log("work");
    // if (!isValid) return;
    // console.log("handleRegister");
    handleRegister(e);
  };

  // useEffect(() => {
  //   validate();
  // }, [data]);

  return (
    <form className="login__form" onSubmit={handleSubmit}>
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
      {/* {loginError && (
        <div className="login__checked-error">
          <span className="login__error-message">{loginError}</span>
        </div>
      )} */}
      <button className="button button--flex" type="submit">
        {t("Sign Up")}
        <i className="ri-arrow-right-up-line button__icon" />
      </button>
    </form>
  );
};

export default RegisterForm;
