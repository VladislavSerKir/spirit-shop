import React, { useState } from "react";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Footer } from "../footer/footer";
import { ScrollUp } from "../scroll-up/scroll-up";
import { NavLink, Route, Router, Switch } from "react-router-dom";
import LogIn from "../login/login";

function App() {
  const [isAdmin, setIsAdmin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/login/:type?" component={LogIn} exact />
      </Switch>
      {/* {!isLoggedIn && <NavLink to="/login" replace={true} />}
      {!isLoggedIn && <NavLink to="/register" replace={true} />} */}
      {/* <Main /> */}
      <Footer />
      <ScrollUp />
    </>
  );
}

export default App;
