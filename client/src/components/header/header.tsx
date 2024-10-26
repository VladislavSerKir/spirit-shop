import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useTypedSelector } from "../../types";
import { onLogout } from "../../store/actions/userAction";
import history from "../../utils/history";
import shoppingCart from "../../assets/img/shopping-cart.png";
import { TCartItem } from "../../types/userType";
import { useResize } from "../../hooks/useResize";

export const Header = () => {
  const dispatch = useDispatch();
  const userData = useTypedSelector((store) => store.user.userData);

  const countProductsInCart = () => {
    return userData?.cart?.cartItem?.length
      ? userData?.cart?.cartItem?.reduce((acc: number, item: TCartItem) => {
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
    setIconTheme(getCurrentIcon());
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
  };

  const isLoggedIn = useTypedSelector((state) => state.user.userData.email);

  const handleLogOut = (event: any) => {
    event.preventDefault();
    dispatch(onLogout(userData));
    history.push("/");
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
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/products"
                className="nav__link"
                activeClassName="active-link"
                onClick={clickToShowMenu}
              >
                Products
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
                      Cart
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
                          src={shoppingCart}
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
                {userData.role === "admin" ? (
                  <li className="nav__item">
                    <NavLink
                      to="/admin/profile"
                      className="nav__link"
                      activeClassName="active-link"
                      onClick={clickToShowMenu}
                    >
                      Admin
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
                      User
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
                    Logout
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
            ) : (
              <li className="nav__item">
                <NavLink
                  to="/login"
                  className="nav__link"
                  activeClassName="active-link"
                  onClick={clickToShowMenu}
                >
                  LogIn
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav__close" id="nav-close" onClick={clickToShowMenu}>
            <i className="ri-close-line" />
          </div>
        </div>

        <div className="nav__btns">
          <i
            className={`${iconTheme} change-theme`}
            id="theme-button"
            onClick={changeTheme}
          />
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
