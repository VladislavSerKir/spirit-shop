import React, { useState } from "react";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Footer } from "../footer/footer";
import { ScrollUp } from "../scroll-up/scroll-up";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import LogIn from "../login/login";
import ProductsList from "../../pages/products/product-list";
import Cart from "../../pages/cart/cart";
import { ProtectedRoute } from "../../shared/hoc/protected-route/protected-route";
import { useTypedDispatch } from "../../types";
import { checkAuth } from "../../store/actions/userAction";

function App() {
  const dispatch = useTypedDispatch();

  const [isAdmin, setIsAdmin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login/:type?" component={LogIn} />
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/cart" component={Cart} />
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
