import React from "react";
import { useLocation } from "react-router-dom";
import { IUseLocation, useTypedDispatch, useTypedSelector } from "../../types";
import useBreadCrumbs from "../../hooks/useBreadCrumbs";
import BreadCrumb from "./bread-crumb";
import { updatePathname } from "../../store/reducers/serviceReducer";

const BreadCrumbs = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation<IUseLocation>();
  const pathname = useTypedSelector((state) => state.service.pathname);

  React.useEffect(() => {
    dispatch(updatePathname(location.pathname));
  }, [location.pathname]);

  const { getRoutes } = useBreadCrumbs(pathname);

  const routes = getRoutes();

  return (
    <div className="bread-crumbs">
      {routes.map((item, i) => {
        return <BreadCrumb key={i} index={i} routeName={item} />;
      })}
    </div>
  );
};

export default BreadCrumbs;
