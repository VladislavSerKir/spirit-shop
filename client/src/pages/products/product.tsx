import { FC } from "react";
import { useTypedSelector } from "../../types";
import { ICategory } from "../../types/productType";

interface IProduct {
  productId: string;
}

const Product: FC<IProduct> = ({ productId }) => {
  const products = useTypedSelector((state) => state.products.products);

  const getProductById = (productId: string, products: any) =>
    products.find((p: any) => p.id === Number(productId));

  const currentProduct = getProductById(productId, products);

  return (
    <section className="container section">
      <h3 className="product-solo__title">{currentProduct?.name}</h3>
      <div className="product-solo__container">
        <div className="container-center">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="product-solo__img"
          />

          <div>
            {currentProduct?.categories.map((category: ICategory) => (
              <span className="product__category" key={category.id}>
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <p className="product-solo__description">
          {currentProduct?.description}
        </p>
      </div>

      <div className="container-center">
        <span className="product__price">${currentProduct?.price}</span>

        <button className="button--flex product-solo__button" type="button">
          <i className="ri-shopping-bag-line" />
        </button>
      </div>
    </section>
  );
};

export default Product;
