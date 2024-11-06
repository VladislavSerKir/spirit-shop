import React, { FC } from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import EditProfileForm from "../../components/edit-profile-form/edit-profile-form";
import ManageCategories from "../../components/manage-categories/manage-categories";
import ManageProduct from "../../components/manage-product/manage-product";
import { Order } from "../order/order";
import FavouriteProducts from "../favourite-products/favourite-products";
import { ManageUsers } from "./manage-users";
import { useTranslation } from "react-i18next";

const Admin: FC = () => {
  const { url } = useRouteMatch();
  const { t } = useTranslation();

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
                {t("Profile")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/orders`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                {t("My orders")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/favorites`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                {t("Favorite products")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/categories`}
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                {t("Manage categories")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/products`}
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                {t("Manage products")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/users`}
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                {t("All users")}
              </NavLink>
            </li>
          </ul>
        </nav>

        <article className={`profile__content`}>
          <Switch>
            <Route path={`${url}/profile`} exact>
              <EditProfileForm />
            </Route>
            <Route path={`${url}/orders`} exact>
              <Order />
            </Route>
            <Route path={`${url}/favorites`} exact>
              <FavouriteProducts />
            </Route>
            <Route path={`${url}/categories`} exact>
              <ManageCategories />
            </Route>

            <Route path={`${url}/products`} exact>
              <ManageProduct />
            </Route>
            <Route path={`${url}/users`} exact>
              <ManageUsers />
            </Route>
          </Switch>
        </article>
      </div>
    </section>
  );
};

export default Admin;
