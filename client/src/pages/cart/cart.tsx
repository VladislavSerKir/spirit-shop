import React, { useCallback, useState } from "react";
import CartItem from "./cart-item";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { IProduct } from "../../types/store/productStoreType";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import TextArea from "../../shared/form/text-area";
import {
  addProductToCart,
  clearCart,
  removeProductFromCart,
} from "../../store/actions/cartAction";
import { submitPurchase } from "../../store/actions/orderAction";
import { ICartItem } from "../../types/store/cartStoreType";
import { useTranslation } from "react-i18next";

interface IComment {
  name: string;
  value: string;
}

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const cart = useTypedSelector((state) => state.cart.cart);

  const initialState = {
    comment: "",
    isNeedPackage: false,
    isNeedDelivery: false,
  };

  const [data, setData] = useState(initialState);

  const handleChangeComment = useCallback((target: IComment) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  }, []);

  const handleChangeToggle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    },
    []
  );

  const getTotalSum = () => {
    if (cart && cart.cartItem.length) {
      const totalSum = (cart?.cartItem as ICartItem[]).reduce(
        (acc: number, item: ICartItem) => {
          const sum = item.product.price * item.quantity;
          return acc + sum;
        },
        0
      );
      return totalSum ? totalSum.toFixed(2) : 0;
    }
    return 0;
  };

  const onIncrement = (product: IProduct) => {
    dispatch(addProductToCart(product));
  };

  const onDecrement = (product: IProduct) => {
    dispatch(removeProductFromCart(product));
  };

  const handleSubmitCart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(submitPurchase(data));
    setData(initialState);
  };

  const handleClearCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(clearCart());
    setData(initialState);
  };

  return (
    <section className="section container">
      {!cart?.cartItem?.length ? (
        <h1 className="section__title-center">{t("Your cart is empty")}</h1>
      ) : (
        <>
          <h2 className="section__title-center">{t("Cart")}</h2>
          {cart?.cartItem?.map((item: ICartItem) => (
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
                {t("Total")}:<span>{getTotalSum()}$</span>
              </p>
              <div className="cart__toggle-container">
                <Toggle
                  name="isNeedDelivery"
                  id="is-need-delivery"
                  defaultChecked={false}
                  aria-labelledby="biscuit-label"
                  onChange={handleChangeToggle}
                />
                <h3 id="is-need-delivery">{t("Need delivery")}</h3>
              </div>
              <div className="cart__toggle-container">
                <Toggle
                  name="isNeedPackage"
                  id="is-need-package"
                  defaultChecked={false}
                  aria-labelledby="biscuit-label"
                  onChange={handleChangeToggle}
                />
                <h3 id="is-need-package">{t("Need package")}</h3>
              </div>
              <TextArea
                label={t("Additional comment")}
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
                  {t("Buy")}
                </button>
                <button
                  className="button button--flex cart-button-fixed"
                  type="button"
                  onClick={handleClearCart}
                >
                  {t("Clear cart")}
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
