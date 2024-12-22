import React, { useCallback } from "react";
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
import ProductsLayout from "../../pages/products/product-layout";
import { ToastContainer } from "react-toastify";
import {
  getAllCategories,
  getAllProducts,
} from "../../store/actions/productAction";
import Modal from "../../shared/modal/modal";
import ChangeCategory from "../change-category/change-category";
import ChangeProduct from "../change-product/change-product";
import User from "../../pages/user/user";
import ChangeAvatar from "../change-avatar/change-avatar";
import { checkAuth } from "../../store/actions/authAction";
import { NotFound } from "../../shared/not-found/not-found";
import { getAllReviews } from "../../store/actions/reviewAction";
import AuthCallback from "../login/auth-callback";

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

  React.useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  const handleCloseModals = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <>
      <div className="bubbles-background"></div>
      <Header />
      <Switch location={background || location}>
        <Route exact path="/" component={Main} />
        <Route exact path="/login/:type?" component={LogIn} />
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/products/:id?" component={ProductsLayout} />
        <Route path="/oauth/callback" component={AuthCallback} />
        <ProtectedRoute path="/user">
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/cart">
          <Cart />
        </ProtectedRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
      <ToastContainer />
      <ScrollUp />
      {background && (
        <>
          <ProtectedRoute path={`/user/categories/:id`}>
            <Modal onClose={handleCloseModals}>
              <ChangeCategory onClose={handleCloseModals} />
            </Modal>
          </ProtectedRoute>
        </>
      )}
      {background && (
        <>
          <ProtectedRoute path={`/user/products/:id`}>
            <Modal onClose={handleCloseModals}>
              <ChangeProduct onClose={handleCloseModals} />
            </Modal>
          </ProtectedRoute>
        </>
      )}
      {background && (
        <>
          <ProtectedRoute path={`/user/profile/avatar`}>
            <Modal onClose={handleCloseModals}>
              <ChangeAvatar onClose={handleCloseModals} />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </>
  );
}

export default App;
