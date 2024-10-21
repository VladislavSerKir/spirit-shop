import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useTypedSelector } from "../../../types";

export const ProtectedRoute: FC<{
  children: React.ReactNode;
  path: string;
}> = ({ children, ...props }) => {
  const user = useTypedSelector((state) => state.user.userData.email);
  const isAuthChecked = useTypedSelector((state) => state.user.isAuthChecked);

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthChecked && user ? (
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
