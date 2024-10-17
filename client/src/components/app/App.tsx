import React from "react";
import { Header } from "../header/header";
import { Main } from "../main/main";
import { Footer } from "../footer/footer";
import { ScrollUp } from "../scroll-up/scroll-up";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import LogIn from "../login/login";
import ProductsList from "../../pages/products/product-list";
import Cart from "../../pages/cart/cart";
import { ProtectedRoute } from "../../shared/hoc/protected-route/protected-route";
import { IUseLocation, useTypedDispatch } from "../../types";
import { checkAuth } from "../../store/actions/userAction";
import ProductsLayout from "../../pages/products/product-layout";
import Admin from "../../pages/admin/admin";
import { ToastContainer } from "react-toastify";
import {
  getAllCategories,
  getAllProducts,
} from "../../store/actions/productAction";
import Modal from "../../shared/modal/modal";
import ChangeCategory from "../change-category/change-category";
import ChangeProduct from "../change-product/change-product";

function App() {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const location = useLocation<IUseLocation>();

  const background = location.state?.background;

  React.useEffect(() => {
    dispatch(checkAuth());
  }, []);

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleCloseModals = () => {
    history.goBack();
  };

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
      <ToastContainer />
      <ScrollUp />
      <>
        <ProtectedRoute path={`/admin/categories/:id`}>
          <Modal onClose={handleCloseModals}>
            <ChangeCategory />
          </Modal>
        </ProtectedRoute>
      </>
      <>
        <ProtectedRoute path={`/admin/products/:id`}>
          <Modal onClose={handleCloseModals}>
            <ChangeProduct />
          </Modal>
        </ProtectedRoute>
      </>
    </>
  );
}

export default App;
