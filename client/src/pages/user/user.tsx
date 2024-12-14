import React, { FC } from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import EditProfileForm from "../../components/edit-profile-form/edit-profile-form";
import { Order } from "../order/order";
import FavouriteProducts from "../favourite-products/favourite-products";
import { useTranslation } from "react-i18next";
import { useTypedDispatch, useTypedSelector } from "../../types";
import ManageCategories from "../../components/manage-categories/manage-categories";
import ManageProduct from "../../components/manage-product/manage-product";
import { ManageUsers } from "../admin/manage-users";
import { NotFound } from "../../shared/not-found/not-found";
import { useResize } from "../../hooks/useResize";
import MenuAccordeon from "../../components/menu-accordeon/menu-accordeon";
import { getUserOrders } from "../../store/actions/orderAction";

const User: FC = () => {
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  const user = useTypedSelector((state) => state.user.userData);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const { width } = useResize();

  return (
    <section className="section container">
      <div className={`profile`}>
        {width < 995 ? (
          <MenuAccordeon />
        ) : (
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
              {user.role === "admin" ? (
                <>
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
                </>
              ) : null}
            </ul>
          </nav>
        )}

        <article className={`profile__content`}>
          <Switch>
            <Route path={`${url}/profile`} exact>
              <EditProfileForm />
            </Route>
            <Route path={`${url}`} exact>
              <EditProfileForm />
            </Route>
            <Route path={`${url}/orders`} exact>
              <Order />
            </Route>
            <Route path={`${url}/favorites`} exact>
              <FavouriteProducts />
            </Route>
            {user.role === "admin" && (
              <Route path={`${url}/categories`} exact>
                <ManageCategories />
              </Route>
            )}
            {user.role === "admin" && (
              <Route path={`${url}/products`} exact>
                <ManageProduct />
              </Route>
            )}
            {user.role === "admin" && (
              <Route path={`${url}/users`} exact>
                <ManageUsers />
              </Route>
            )}
            <Route path="*" exact>
              <NotFound />
            </Route>
          </Switch>
        </article>
      </div>
    </section>
  );
};

export default User;
