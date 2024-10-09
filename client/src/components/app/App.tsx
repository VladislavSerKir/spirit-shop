import React, { useState } from "react";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Footer } from "../footer/footer";
import { ScrollUp } from "../scroll-up/scroll-up";
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  useLocation,
} from "react-router-dom";
import LogIn from "../login/login";
import ProductsList from "../../pages/products/product-list";
import Cart from "../../pages/cart/cart";
import { ProtectedRoute } from "../../shared/hoc/protected-route/protected-route";
import { IUseLocation, useTypedDispatch } from "../../types";
import { checkAuth } from "../../store/actions/userAction";
import ProductsLayout from "../../pages/products/product-layout";
import Admin from "../../pages/admin/admin";

function App() {
  const dispatch = useTypedDispatch();
  const location = useLocation<IUseLocation>();

  const [isAdmin, setIsAdmin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const background = location.state?.background;
  // const from = location.state?.from;

  React.useEffect(() => {
    dispatch(checkAuth());
  }, []);

  // React.useEffect(() => {
  //   console.log(location);
  //   console.log(`background App: ${background}`);
  // }, []);

  return (
    <>
      <Header />
      <Switch location={background || location}>
        <Route exact path="/" component={Main} />
        <Route exact path="/login/:type?" component={LogIn} />
        {/* <ProtectedRoute path="/login/:type?">
          <LogIn />
        </ProtectedRoute> */}
        <Route exact path="/products/:id?" component={ProductsLayout} />
        <Route exact path="/products" component={ProductsList} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/:id?" component={Admin} />
        <ProtectedRoute path="/cart">
          <Cart />
        </ProtectedRoute>
        {/* <Route exact path="/cart" component={Cart} /> */}
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
