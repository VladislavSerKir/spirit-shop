import { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../types";
import { TUserDataRegister } from "../types/userType";
import { onLogin, onRegister, onUpdateUser } from "../store/actions/userAction";

export const useForm = (inputValues: TUserDataRegister) => {
  const store = useTypedSelector((store) => store);
  const [values, setValues] = useState(inputValues);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const dispatch = useTypedDispatch();

  const handleChange = (event: any) => {
    setValues({ ...values, [event.name]: event.value });
    setIsFormEdited(true);
  };

  //   const handleResetForm = () => {
  //     setValues({
  //       firstName: store.user.userData.firstName,
  //       lastName: store.user.userData.lastName,
  //       email: store.user.userData.email,
  //       password: "",
  //     });
  //     setIsFormEdited(false);
  //   };

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
    });
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email) {
      dispatch(onUpdateUser(values));
      setValues({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
      });
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
