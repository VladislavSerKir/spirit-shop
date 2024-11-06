import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useTypedSelector } from "../../types";
import history from "../../utils/history";
import shoppingCart from "../../assets/img/shopping-cart.png";
import shoppingCartDark from "../../assets/img/shopping-cart-dark.png";
import { useResize } from "../../hooks/useResize";
import { onLogout } from "../../store/actions/authAction";
import { ICartItem } from "../../types/store/cartStoreType";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(false);
  const divRef = useRef<any>();

  const dispatch = useDispatch();
  const userData = useTypedSelector((store) => store.user.userData);
  const cart = useTypedSelector((store) => store.cart.cart);

  const countProductsInCart = () => {
    return cart?.cartItem?.length
      ? cart?.cartItem?.reduce((acc: number, item: ICartItem) => {
          const sum = item.quantity;
          return acc + sum;
        }, 0)
      : 0;
  };

  const [iconTheme, setIconTheme] = useState("ri-moon-line");
  const [showMenu, setShowMenu] = useState({
    status: false,
    style: "nav__menu",
  });

  const clickToShowMenu = () => {
    if (showMenu.status) {
      setShowMenu({ status: false, style: "nav__menu" });
    } else {
      setShowMenu({ status: true, style: "nav__menu show-menu" });
    }
  };

  const changeTheme = () => {
    const darkTheme = "dark-theme";

    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? "dark" : "light";
    const getCurrentIcon = () =>
      iconTheme === "ri-sun-line" ? "ri-moon-line" : "ri-sun-line";

    document.body.classList.toggle(darkTheme);
    document.querySelector(".modal")?.classList.toggle(darkTheme);
    setIconTheme(getCurrentIcon());
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  };

  React.useEffect(() => {
    localStorage.removeItem("language");
    i18n.changeLanguage(localStorage.getItem("language") as string);
  }, []);

  const handleChangeLang = () => {
    const currentLanguge = localStorage.getItem("language");
    currentLanguge === "RU"
      ? localStorage.setItem("language", "EN")
      : localStorage.setItem("language", "RU");

    i18n.changeLanguage(currentLanguge as string);
  };

  const switchLanguage = () => {
    const currentLanguge = localStorage.getItem("language");
    return currentLanguge === "RU" ? "EN" : "RU";
  };

  const switchToLanguage = switchLanguage();

  React.useEffect(() => {
    const initLanguage = localStorage.getItem("language");
    if (!initLanguage) {
      localStorage.setItem("language", "RU");
    }

    i18n.changeLanguage(localStorage.getItem("language") as string);
  }, [switchToLanguage]);

  const getTheme = () => {
    return localStorage.getItem("selected-theme");
  };

  const isLoggedIn = useTypedSelector((state) => state.user.userData.email);

  const handleLogOut = (event: any) => {
    event.preventDefault();
    dispatch(onLogout(userData));
    history.push("/");
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = active
        ? `${divRef.current.scrollHeight + 20}px`
        : "0px";
    }
  }, [active]);

  const toggleAccordeon = () => {
    setActive(!active);
  };

  const { width } = useResize();

  return (
    <header className="header scroll-header" id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          <i className="ri-leaf-line nav__logo-icon" /> Spirit
        </Link>

        <div className={showMenu.style} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                exact
                to="/"
                className="nav__link"
                activeClassName="active-link"
                onClick={clickToShowMenu}
              >
                {t("Home")}
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/products"
                className="nav__link"
                activeClassName="active-link"
                onClick={clickToShowMenu}
              >
                {t("Products")}
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                {width < 767 ? (
                  <li className="nav__item">
                    <NavLink
                      to="/cart"
                      className="nav__link"
                      activeClassName="active-link"
                      onClick={clickToShowMenu}
                    >
                      {t("Cart")}
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav__item">
                    <NavLink
                      to="/cart"
                      className="nav__link"
                      activeClassName="active-link"
                      onClick={clickToShowMenu}
                    >
                      <div className="header__cart">
                        <img
                          src={
                            getTheme() === "light"
                              ? shoppingCart
                              : shoppingCartDark
                          }
                          alt="shoppingCart"
                          className="header__cart-img"
                        />
                        {countProductsInCart() !== 0 ? (
                          <div className="header__cart-counter" role="status">
                            {countProductsInCart()}
                          </div>
                        ) : null}
                      </div>
                    </NavLink>
                  </li>
                )}
                {userData.email && width > 767 && (
                  <NavLink
                    to={
                      userData.role === "admin"
                        ? "/admin/profile"
                        : "/user/profile"
                    }
                    className="nav__link"
                    onClick={clickToShowMenu}
                  >
                    <li className="nav__item nav__img header__block">
                      <div
                        className={`header__item${
                          active ? " accordion-open" : ""
                        }`}
                      >
                        <header
                          className="header__header"
                          onClick={toggleAccordeon}
                        >
                          <div className="header__user-button nav__link">
                            <p>
                              {userData.firstName}, {userData.lastName}
                            </p>
                            <img
                              src={userData.avatar}
                              alt="avatar"
                              className="header__avatar-img"
                            />
                          </div>
                        </header>
                      </div>
                    </li>
                  </NavLink>
                )}
                {width < 767 && (
                  <>
                    {userData.role === "admin" ? (
                      <li className="nav__item">
                        <NavLink
                          to="/admin/profile"
                          className="nav__link"
                          activeClassName="active-link"
                          onClick={clickToShowMenu}
                        >
                          {t("Admin")}
                        </NavLink>
                      </li>
                    ) : (
                      <li className="nav__item">
                        <NavLink
                          to="/user/profile"
                          className="nav__link"
                          activeClassName="active-link"
                          onClick={clickToShowMenu}
                        >
                          {t("User")}
                        </NavLink>
                      </li>
                    )}
                    <li className="nav__item">
                      <NavLink
                        to="/logout"
                        className="nav__link"
                        activeClassName="active-link"
                        onClick={handleLogOut}
                      >
                        {t("Logout")}
                      </NavLink>
                    </li>
                    <li className="nav__item nav__img">
                      <img
                        src={userData.avatar}
                        alt="avatar"
                        className="header__avatar-img"
                      />
                    </li>
                  </>
                )}
              </>
            ) : (
              <li className="nav__item">
                <NavLink
                  to="/login"
                  className="nav__link"
                  activeClassName="active-link"
                  onClick={clickToShowMenu}
                >
                  {t("LogIn")}
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav__close" id="nav-close" onClick={clickToShowMenu}>
            <i className="ri-close-line" />
          </div>
        </div>

        <div className="nav__btns">
          <p
            className="nav__item nav__link nav__lang-switch"
            onClick={handleChangeLang}
          >
            {switchToLanguage}
          </p>
          <i
            className={`${iconTheme} change-theme`}
            id="theme-button"
            onClick={changeTheme}
          />
          {userData.email && (
            <i
              className={`ri-logout-box-r-line change-theme`}
              id="theme-button"
              onClick={handleLogOut}
            />
          )}

          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={clickToShowMenu}
          >
            <i className="ri-menu-line" />
          </div>
        </div>
      </nav>
    </header>
  );
};
