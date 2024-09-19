import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { getDataStatus, getUserCart, updateCart } from "../../store/cart";
// import { getProducts } from "../../store/products";
import Loader from "../../shared/loader/loader";
import CartItem from "./cart-item";

const Cart = () => {
  //   const dispatch = useDispatch();
  //   const dataStatus = useSelector(getDataStatus());
  //   const cart = useSelector(getUserCart());
  //   const products = useSelector(getProducts());

  //   const getTotalSum = () => {
  //     const totalSum = cart.products.reduce((acc, product) => {
  //       const sum =
  //         products.find((p) => p._id === product.product).price * product.amount;
  //       return acc + sum;
  //     }, 0);
  //     return totalSum.toFixed(2);
  //   };

  //   const onIncrement = (id) => {
  //     const updatedCart = {
  //       ...cart,
  //       products: cart.products.reduce((acc, p) => {
  //         if (p.product === id) {
  //           return [...acc, { ...p, amount: p.amount + 1 }];
  //         }
  //         return [...acc, p];
  //       }, []),
  //     };
  //     dispatch(updateCart(updatedCart));
  //   };

  //   const onDecrement = (id) => {
  //     const updatedCart = {
  //       ...cart,
  //       products: cart.products.reduce((acc, p) => {
  //         if (p.product === id) {
  //           if (p.amount === 1) {
  //             if (localStorage.getItem("selected-theme") === "dark") {
  //               toast.error("Item was deleted", { theme: "dark" });
  //             } else {
  //               toast.error("Item was deleted");
  //             }
  //             return [...acc];
  //           }
  //           return [...acc, { ...p, amount: p.amount - 1 }];
  //         }
  //         return [...acc, p];
  //       }, []),
  //     };
  //     dispatch(updateCart(updatedCart));
  //   };

  //   if (!dataStatus) {
  //     return <Loader />;
  //   }

  const cart = { products: [] };

  if (!cart.products.length) {
    return (
      <section className="section container">
        <h1 className="section__title-center">Your cart is empty</h1>
      </section>
    );
  }

  const onIncrement = () => {};

  const onDecrement = () => {};

  return (
    <section className="section container">
      {cart.products.map((product: any) => (
        <CartItem
          key={product._id}
          amount={product.amount}
          productId={product.product}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
      <hr />
      <div className="cart__total">
        <p className="cart__total_sum">
          Total:<span>getTotalSum</span>
          {/* Total:<span>{getTotalSum()}$</span> */}
        </p>

        <button className="button button--flex" type="button">
          Buy
        </button>
      </div>
    </section>
  );
};

export default Cart;
