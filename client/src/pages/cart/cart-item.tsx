import React, { FC } from "react";
import { useSelector } from "react-redux";
// import { getProductById } from '../../../store/products';

interface ICartItem {
  productId: string;
  amount: number;
  onIncrement: Function;
  onDecrement: Function;
}

const CartItem: FC<ICartItem> = ({
  productId,
  amount,
  onIncrement,
  onDecrement,
}) => {
  //   const product = useSelector(getProductById(productId));

  //   const handleIncrement = (id) => {
  //     onIncrement(id);
  //   };

  //   const handleDecrement = (id) => {
  //     onDecrement(id);
  //   };

  const handleIncrement = (id: string) => {};

  const handleDecrement = (id: string) => {};

  const product = {
    id: 1,
    name: "product.name",
    image: "product.image",
    price: 42,
  };

  return (
    <>
      <h4>{product.name}</h4>
      <div className="cart-item">
        <img className="product__img" src={product.image} alt={product.name} />
        <div className="cart-item__info">
          <button
            className="cart-button button--flex"
            type="button"
            onClick={() => handleIncrement(productId)}
          >
            +
          </button>
          <span>{amount}</span>
          <button
            className="cart-button button--flex"
            type="button"
            onClick={() => handleDecrement(productId)}
          >
            -
          </button>
        </div>
        <div className="cart-item__info">
          <span>{(amount * product.price).toFixed(2)}$</span>
        </div>
      </div>
    </>
  );
};

export default CartItem;
