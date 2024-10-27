import { useState } from "react";
import { useTypedDispatch } from "../types";
import { onUpdateUser } from "../store/actions/userAction";
import { onLogin, onRegister } from "../store/actions/authAction";

export const useForm = (inputValues: any) => {
  const [values, setValues] = useState(inputValues);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const dispatch = useTypedDispatch();

  const handleChange = (event: any) => {
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
      console.log(values);
      dispatch(onUpdateUser(values));
      setIsFormEdited(false);
    }
  };

  return {
    values,
    handleChange,
    isFormEdited,
    setIsFormEdited,
    // handleResetForm,
    handleLogin,
    handleRegister,
    handleUpdateUser,
  };
};
