import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useTypedSelector } from "../../types";

const MenuAccordeon = () => {
  const { t } = useTranslation();

  const { url } = useRouteMatch();
  const [active, setActive] = useState(false);
  const user = useTypedSelector((state) => state.user.userData);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = active
        ? `${divRef.current.scrollHeight + 20}px`
        : "0px";
    }
  }, [active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (
    <div className={`menu-accordeon__item${active ? " accordeon-open" : ""}`}>
      <header className="menu-accordeon__header" onClick={toggleAccordion}>
        <i className="ri-add-line menu-accordeon__icon" />
        <h1>{t("Menu")}</h1>
      </header>

      <div className="menu-accordeon__content" ref={divRef}>
        <nav className={`profile__menu`}>
          <ul className="profile__list">
            <li className="nav__item">
              <NavLink
                to={`${url}/profile`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
                onClick={toggleAccordion}
              >
                {t("Profile")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/personal-page`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
                onClick={toggleAccordion}
              >
                {t("My page")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/orders`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
                onClick={toggleAccordion}
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
                onClick={toggleAccordion}
              >
                {t("Favorite products")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={`${url}/reviews`}
                exact
                className={`nav__link`}
                activeClassName={`active-link`}
                onClick={toggleAccordion}
              >
                {t("My reviews")}
              </NavLink>
            </li>
            {user.role === "admin" ? (
              <>
                <li className="nav__item">
                  <NavLink
                    to={`${url}/categories`}
                    className={`nav__link`}
                    activeClassName={`active-link`}
                    onClick={toggleAccordion}
                  >
                    {t("Manage categories")}
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to={`${url}/products`}
                    className={`nav__link`}
                    activeClassName={`active-link`}
                    onClick={toggleAccordion}
                  >
                    {t("Manage products")}
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to={`${url}/users`}
                    className={`nav__link`}
                    activeClassName={`active-link`}
                    onClick={toggleAccordion}
                  >
                    {t("All users")}
                  </NavLink>
                </li>
                <li className="nav__item">
                  <NavLink
                    to={`${url}/statistics`}
                    className={`nav__link`}
                    activeClassName={`active-link`}
                    onClick={toggleAccordion}
                  >
                    {t("Shop statistic")}
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MenuAccordeon;
