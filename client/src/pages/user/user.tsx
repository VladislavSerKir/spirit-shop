import React, { FC } from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import EditProfileForm from "../../components/edit-profile-form/edit-profile-form";
import { Order } from "../order/order";

const User: FC = () => {
  const { url } = useRouteMatch();

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
                to={`${url}/orders`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                My orders
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/favorites`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
              >
                Favorite products
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
            <Route path={`${url}/favorites`} exact></Route>
          </Switch>
        </article>
      </div>
    </section>
  );
};

export default User;
