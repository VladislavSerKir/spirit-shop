import React, { FC } from "react";
import { useSelector } from "react-redux";
// import { getProductById } from "../../store/products";
// import { getCategory } from "../../store/category";

interface IProduct {
  productId: string;
}

const Product: FC<IProduct> = ({ productId }) => {
  //   const product = useSelector(getProductById(productId));
  //   const categoryState = useSelector(getCategory());

  const product = {
    name: "product.name",
    image: "product.image",
    description: "product.description",
    price: 42,
    categories: [],
  };

  const categoryState = [{ name: "name", _id: "" }];

  return (
    <section className="container section">
      <h3 className="product-solo__title">{product.name}</h3>
      <div className="product-solo__container">
        <div className="container-center">
          <img
            src={product.image}
            alt={product.name}
            className="product-solo__img"
          />

          <div>
            {product.categories.map((p) => (
              <span className="product__category" key={p}>
                {categoryState.find((c) => c._id === p)?.name}
              </span>
            ))}
          </div>
        </div>
        <p className="product-solo__description">{product.description}</p>
      </div>

      <div className="container-center">
        <span className="product__price">${product.price}</span>

        <button className="button--flex product-solo__button" type="button">
          <i className="ri-shopping-bag-line" />
        </button>
      </div>
    </section>
  );
};

export default Product;
