import React, { useCallback, useState } from "react";
import CartItem from "./cart-item";
import { useTypedDispatch, useTypedSelector } from "../../types";
import {} from "../../store/actions/productAction";
import { IProduct } from "../../types/productType";
import { TCartItem } from "../../types/userType";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import TextArea from "../../shared/form/text-area";
import history from "../../utils/history";
import {
  addProductToCart,
  clearCart,
  removeProductFromCart,
} from "../../store/actions/cartAction";
import { submitPurchase } from "../../store/actions/orderAction";

const Cart = () => {
  const dispatch = useTypedDispatch();
  const cart = useTypedSelector((state) => state.user.userData.cart);
  const role = useTypedSelector((state) => state.user.userData.role);

  const initialState = {
    comment: "",
    isNeedPackage: false,
    isNeedDelivery: false,
  };

  const [data, setData] = useState(initialState);

  const handleChangeComment = useCallback((target: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }, []);

  const handleChangeToggle = useCallback((event: any) => {
    setData((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  }, []);

  const getTotalSum = () => {
    const totalSum = cart.cartItem.reduce((acc: number, item: TCartItem) => {
      const sum = item.product.price * item.quantity;
      return acc + sum;
    }, 0);
    return totalSum.toFixed(2);
  };

  const onIncrement = (product: IProduct) => {
    dispatch(addProductToCart(product));
  };

  const onDecrement = (product: IProduct) => {
    dispatch(removeProductFromCart(product));
  };

  const handleSubmitCart = (e: any) => {
    e.preventDefault();
    dispatch(submitPurchase(data));
    setData(initialState);
    role === "admin"
      ? history.replace("/admin/orders")
      : history.replace("/user/orders");
  };

  const handleClearCart = (e: any) => {
    e.preventDefault();
    dispatch(clearCart());
    setData(initialState);
  };

  return (
    <section className="section container">
      {!cart?.cartItem?.length ? (
        <h1 className="section__title-center">Your cart is empty</h1>
      ) : (
        <>
          <h2 className="section__title-center">Cart</h2>
          {cart?.cartItem?.map((item: any) => (
            <CartItem
              key={item.id}
              amount={item.quantity}
              product={item.product}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
          <hr />
          <form onSubmit={handleSubmitCart}>
            <div className="cart__total">
              <p className="cart__total_sum">
                Total:<span>{getTotalSum()}$</span>
              </p>
              <div className="cart__toggle-container">
                <Toggle
                  name="isNeedDelivery"
                  id="is-need-delivery"
                  defaultChecked={false}
                  aria-labelledby="biscuit-label"
                  onChange={handleChangeToggle}
                />
                <h3 id="is-need-delivery">Need delivery</h3>
              </div>
              <div className="cart__toggle-container">
                <Toggle
                  name="isNeedPackage"
                  id="is-need-package"
                  defaultChecked={false}
                  aria-labelledby="biscuit-label"
                  onChange={handleChangeToggle}
                />
                <h3 id="is-need-package">Need package</h3>
              </div>
              <TextArea
                label="Additional comment"
                name="comment"
                value={data.comment}
                error={""}
                onChange={handleChangeComment}
              />
              <div className="cart__buttons">
                <button
                  className="button button--flex cart-button-fixed"
                  type="submit"
                >
                  Buy
                </button>
                <button
                  className="button button--flex cart-button-fixed"
                  type="button"
                  onClick={handleClearCart}
                >
                  Clear cart
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default Cart;
