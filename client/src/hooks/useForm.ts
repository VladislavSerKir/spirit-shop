import { useState } from "react";
import { GenericObject, useTypedDispatch } from "../types";
import { onUpdateUser } from "../store/actions/userAction";
import { onLogin, onRegister } from "../store/actions/authAction";
import { SigninDto, SignupDto } from "../types/store/userStoreType";

export const useForm = (
  inputValues: (GenericObject & SigninDto & SignupDto) | any
) => {
  const [values, setValues] = useState(inputValues);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const dispatch = useTypedDispatch();

  const handleChange = (event: GenericObject) => {
    setValues({ ...values, [event.name]: event.value });
    setIsFormEdited(true);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.email || values.password!.length < 6) {
      return;
    }

    dispatch(onLogin(values));
    setValues({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(onRegister(values));
    setValues({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email) {
      dispatch(onUpdateUser(values));
      setIsFormEdited(false);
    }
  };

  return {
    values,
    handleChange,
    isFormEdited,
    setIsFormEdited,
    handleLogin,
    handleRegister,
    handleUpdateUser,
  };
};
