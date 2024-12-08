import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTypedDispatch } from "../../types";
import { loginYandex } from "../../store/actions/authAction";
import history from "../../utils/history";

const AuthCallback = () => {
  const location = useLocation();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    // Функция для получения параметров из URL
    const getQueryParams = (url: string) => {
      const params = new URLSearchParams(url);
      return {
        code: params.get("code"),
        error: params.get("error"),
      };
    };

    const { code, error } = getQueryParams(location.search);

    if (code) {
      dispatch(loginYandex({ code }));
      history.push("/");
    } else if (error) {
      throw new Error(`Ошибка авторизации: ${error}`);
    }
  }, [location]);

  return (
    <div>
      <h1>Обработка авторизации</h1>
      <p>Пожалуйста, подождите...</p>
    </div>
  );
};

export default AuthCallback;
