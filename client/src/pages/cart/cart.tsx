import React from "react";
import CartItem from "./cart-item";
import { useTypedDispatch, useTypedSelector } from "../../types";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../store/actions/productAction";
import { IProduct } from "../../types/productType";
import { TCartItem } from "../../types/userType";

const Cart = () => {
  const dispatch = useTypedDispatch();
  const cart = useTypedSelector((state) => state.user.userData.cart);

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
          <div className="cart__total">
            <p className="cart__total_sum">
              Total:<span>{getTotalSum()}$</span>
            </p>

            <button className="button button--flex" type="button">
              Buy
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
