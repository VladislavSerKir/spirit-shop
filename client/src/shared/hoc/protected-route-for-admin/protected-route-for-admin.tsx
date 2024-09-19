import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
// import { getUserRole } from "../../services/localStorage.service";

interface IProtectedRouteForAdmin {
  //   children: React.ReactNode;
  children: any;
  component: any;
}

const ProtectedRouteForAdmin: FC<IProtectedRouteForAdmin> = ({
  component: Component,
  children,
  ...rest
}) => {
  //   const isAdmin = getUserRole();

  return (
    <Route
      {...rest}
      render={(props) => {
        // if (isAdmin !== "admin") {
        //   return (
        //     <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        //   );
        // }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRouteForAdmin;
