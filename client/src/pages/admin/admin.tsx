import React, { FC, useState } from "react";
import Form from "../../shared/form/form";
import ProductTable from "./product-table";
import {
  NavLink,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { IUseLocation } from "../../types";
import ManageProduct from "../../components/manage-product/manage-product";
import EditProfileForm from "../../components/edit-profile-form/edit-profile-form";

const Admin: FC = () => {
  const { url } = useRouteMatch();
  const location = useLocation<IUseLocation>();
  const [actionType, setActionType] = useState("edit");

  const toggleActionType = () => {
    setActionType((prevState) => (prevState === "add" ? "edit" : "add"));
  };

  return (
    <section className="section container">
      <div className={`profile`}>
        <nav className={`profile__menu`}>
          <ul className="profile__list">
            <li className="nav__item">
              <NavLink
                to={`${url}/profile`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                Profile
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/favorites`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                Favorites
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/categories`}
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                Categories
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/products`}
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                Products
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/users`}
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>

        <article className={`profile__content`}>
          <Switch>
            <Route path={`${url}/profile`} exact>
              <EditProfileForm />
            </Route>
            <Route path={`${url}/favorites`} exact></Route>
            <Route path={`${url}/categories`} exact></Route>

            <Route path={`${url}/products`} exact>
              <ManageProduct />
            </Route>
            <Route path={`${url}/users`} exact></Route>
          </Switch>
        </article>

        {/* {actionType === "add" ? (
          <>
            <div className="container-center">
              <button
                className="button button--flex"
                type="button"
                onClick={toggleActionType}
              >
                Edit
                <i className="ri-arrow-left-right-line button__icon" />
              </button>
            </div>
            <Form type="add" />
          </>
        ) : (
          <>
            <div className="container-center">
              <button
                className="button button--flex"
                type="button"
                onClick={toggleActionType}
              >
                Add
                <i className="ri-arrow-left-right-line button__icon" />
              </button>
            </div>
            <ProductTable />
          </>
        )} */}
      </div>
    </section>
  );
};

export default Admin;
