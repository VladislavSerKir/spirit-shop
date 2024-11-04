import React, { FC } from "react";
import { IProduct } from "../../types/store/productStoreType";

interface ICartItemProps {
  product: IProduct;
  amount: number;
  onIncrement: Function;
  onDecrement: Function;
}

const CartItem: FC<ICartItemProps> = ({
  product,
  amount,
  onIncrement,
  onDecrement,
}) => {
  const handleIncrement = (product: IProduct) => {
    onIncrement(product);
  };

  const handleDecrement = (product: IProduct) => {
    onDecrement(product);
  };

  return (
    <>
      <h2>{product.name}</h2>
      <div className="cart-item">
        <img
          className="product__img-cart"
          src={product.image}
          alt={product.name}
        />
        <div className="cart-item__info">
          <button
            className="cart-button button--flex"
            type="button"
            onClick={() => handleIncrement(product)}
          >
            +
          </button>
          <span>{amount}</span>
          <button
            className="cart-button button--flex"
            type="button"
            onClick={() => handleDecrement(product)}
          >
            -
          </button>
        </div>
        <h2 className="cart-item__info">
          <span>
            {amount} x {product.price} = {(amount * product.price).toFixed(2)} $
          </span>
        </h2>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
