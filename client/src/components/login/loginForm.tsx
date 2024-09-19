import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import * as yup from "yup";
import TextField from "../../sharedComponents/form/textField";
import { TEventTarget } from "./types";
// import { getAuthError, signIn } from "../../../store/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const loginError = useSelector(getAuthError());

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  //   const validateScheme = yup.object().shape({
  //     password: yup.string().required("Password is required"),
  //     email: yup
  //       .string()
  //       .required("Email is required")
  //       .email("Email entered incorrectly"),
  //   });

  //   const validate = () => {
  //     validateScheme
  //       .validate(data)
  //       .then(() => setErrors({}))
  //       .catch((err) => setErrors({ [err.path]: err.message }));
  //     return Object.keys(errors).length === 0;
  //   };

  const handleChange = (target: TEventTarget) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const isValid = validate();
  //     if (!isValid) return;
  //     const redirect = history.location.state
  //       ? history.location.state.from.pathname
  //       : "/";
  //     dispatch(signIn({ ...data, redirect }));
  //   };

  //   useEffect(() => {
  //     validate();
  //   }, [data]);

  return (
    // <form className="login__form" onSubmit={handleSubmit}>
    <form className="login__form">
      <div className="login__inputs">
        <TextField
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={data.password}
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
        Sign In
        <i className="ri-arrow-right-up-line button__icon" />
      </button>
    </form>
  );
};

export default LoginForm;
