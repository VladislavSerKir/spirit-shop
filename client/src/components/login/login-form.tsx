import React, { useEffect, useState } from "react";
// import * as yup from "yup";
import TextField from "../../shared/form/text-field";
import { useForm } from "../../hooks/useForm";

const LoginForm = () => {
  const data = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    role: "",
  };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { values, handleChange, handleLogin } = useForm(data);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__inputs">
          <TextField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label="Password"
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
          Sign In
          <i className="ri-arrow-right-up-line button__icon" />
        </button>
      </form>
    </>
  );
};

export default LoginForm;
