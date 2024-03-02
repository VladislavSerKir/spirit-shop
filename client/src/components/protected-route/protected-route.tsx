import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useTypedSelector } from "../../services/types";

export const ProtectedRoute: FC<{
  children: React.ReactNode;
  // path: string;
}> = ({ children, ...props }) => {
  const location = useLocation();
  //   const isAuthChecked = useTypedSelector((state) => state.user.isAuthChecked);
  // const user = useTypedSelector((state) => state.user.userData.name);
  const user = "user";
  const isAuthChecked = true;

  if (isAuthChecked && user) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};
