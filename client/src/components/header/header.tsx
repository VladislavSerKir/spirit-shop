import React, { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header: FC = () => {
  const [showMenu, setShowMenu] = useState({
    status: false,
    style: "header__menu",
  });
  const [iconTheme, setIconTheme] = useState("ri-moon-line");
  const clickToShowMenu = () => {
    if (showMenu.status) {
      setShowMenu({ status: false, style: "header__menu" });
    } else {
      setShowMenu({ status: true, style: "header__menu header__show-menu" });
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

  return (
    <header className={`header scroll-header`} id="header">
      <nav className={`header__nav container`}>
        <Link to="/" className={`header__nav-logo`}>
          <i className="header__nav-logo-icon ri-hand-heart-line" /> Spirit
        </Link>
        <div className={`${showMenu.style}`} id="nav-menu">
          <ul className="header__links">
            <li>
              <NavLink
                exact
                to="/"
                className="header__link"
                activeClassName="header__link-active"
                onClick={clickToShowMenu}
              >
                Home
              </NavLink>
            </li>
            {/* <div className={`header__links`}> */}
            <li>
              <NavLink
                to="/products"
                className="header__link"
                activeClassName="header__link-active"
                onClick={clickToShowMenu}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="header__link"
                activeClassName="header__link-active"
                onClick={clickToShowMenu}
              >
                LogIn
              </NavLink>
            </li>

            {/* </div> */}
          </ul>
          <div
            className="header__close-button"
            // className="nav__close"
            id="nav-close"
            onClick={clickToShowMenu}
          >
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
            className="header__toggle"
            // className="nav__toggle"
            id="header__toggle"
            onClick={clickToShowMenu}
          >
            <i className="ri-menu-line" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
