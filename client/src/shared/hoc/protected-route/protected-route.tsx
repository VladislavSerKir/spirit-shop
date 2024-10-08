import React, { FC } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { IUseLocation, useTypedSelector } from "../../../types";
// import { useTypedSelector } from "../../services/types";

export const ProtectedRoute: FC<{
  children: React.ReactNode;
  path: string;
}> = ({ children, ...props }) => {
  const location = useLocation<IUseLocation>();
  // const isAuthChecked = useTypedSelector((state) => state.user.isAuthChecked);
  const user = useTypedSelector((state) => state.user.userData.email);
  const isAuthChecked = useTypedSelector((state) => state.user.isAuthChecked);

  React.useEffect(() => {
    console.log(`user: ${user}, isAuthChecked: ${isAuthChecked}`);
  }, []);

  // React.useEffect(() => {
  //   console.log(isAuthChecked && user);
  // }, []);
  // const user = "user";
  // const isAuthChecked = true;

  // if (isAuthChecked && user) {
  //   return children;
  // } else {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/login",
  //         state: { from: location },
  //       }}
  //     />
  //   );
  // }

  // if (isAuthChecked && user) {
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   // return <Redirect to={from} />;
  //   return <Route {...props}>{children}</Route>;
  // }

  // if (!isAuthChecked && !user) {
  //   return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  // }

  // return <Route {...props}>{children}</Route>;

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

  // return (
  //   <Route
  //     {...props}
  //     render={({ location }) =>
  //       isAuthChecked && user ? (
  //         children
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/login",
  //             state: { from: location },
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
};
