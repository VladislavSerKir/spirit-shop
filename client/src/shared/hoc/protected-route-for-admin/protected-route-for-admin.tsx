import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useTypedSelector } from "../../../types";

interface IProtectedRouteForAdminProps {
  children: any;
  path: string;
}

const ProtectedRouteForAdmin: FC<IProtectedRouteForAdminProps> = ({
  children,
  ...props
}) => {
  const user = useTypedSelector((state) => state.user.userData.email);
  const role = useTypedSelector((state) => state.user.userData.role);
  const isAuthChecked = useTypedSelector((state) => state.user.isAuthChecked);

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthChecked && user && role === "admin" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRouteForAdmin;
