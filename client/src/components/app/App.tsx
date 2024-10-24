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
import ProtectedRouteForAdmin from "../../shared/hoc/protected-route-for-admin/protected-route-for-admin";
import User from "../../pages/user/user";
import ChangeAvatar from "../change-avatar/change-avatar";

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
        <Route exact path="/products/:id?" component={ProductsLayout} />
        <Route exact path="/products" component={ProductsList} />
        <ProtectedRoute path="/user">
          <User />
        </ProtectedRoute>
        <ProtectedRouteForAdmin path="/admin">
          <Admin />
        </ProtectedRouteForAdmin>
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
      <>
        <ProtectedRoute path={`/user/profile/avatar`}>
          <Modal onClose={handleCloseModals}>
            <ChangeAvatar />
          </Modal>
        </ProtectedRoute>
      </>
      <>
        <ProtectedRouteForAdmin path={`/admin/profile/avatar`}>
          <Modal onClose={handleCloseModals}>
            <ChangeAvatar />
          </Modal>
        </ProtectedRouteForAdmin>
      </>
    </>
  );
}

export default App;
