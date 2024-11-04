import React, { useState } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { IUseLocation, useTypedSelector } from "../../types";
import Spinner from "../../pages/spinner/spinner";

const LogIn = () => {
  const { type }: any = useParams();
  // const { state } = useLocation<IUseLocation>();
  const location = useLocation<IUseLocation>();
  const user = useTypedSelector((state) => state.user.userData.email);
  const isAuthChecked = useTypedSelector((state) => state.auth.isAuthChecked);

  const loginRequest = useTypedSelector((state) => state.auth.loginRequest);

  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState: string) =>
      prevState === "register" ? "login" : "register"
    );
  };

  if (isAuthChecked && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (loginRequest) {
    return <Spinner />;
  }

  return (
    <section className="login section container">
      <div className="login__container grid">
        <div className="login__box">
          <h2 className="section__title">
            "Happiness held is the seed
            <br />
            Happiness shared is the flower." <br />
            Let's share happiness together!
          </h2>

          <div className="login__data">
            <div className="login__information">
              {formType === "login" ? (
                <>
                  <h3 className="login__subtitle">Don't have an account?</h3>
                  <span
                    // type="button"
                    onClick={toggleFormType}
                    className="login__description"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  <h3 className="login__subtitle">Already have an account?</h3>
                  <span
                    // type="button"
                    onClick={toggleFormType}
                    className="login__description"
                  >
                    Sign In
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {formType === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </section>
  );
};

export default LogIn;
