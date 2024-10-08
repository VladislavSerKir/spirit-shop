import { FC } from "react";
import { useSelector } from "react-redux";
// import { getProductById } from "../../store/reducers/productReducer";
import { useTypedSelector } from "../../types";
// import { IProducts } from "../../store/actions/productAction";

interface IProduct {
  productId: string;
}

const Product: FC<IProduct> = ({ productId }) => {
  const products = useTypedSelector((state) => state.products.products);

  // const product = useSelector(getProductById(productId));
  //   const categoryState = useSelector(getCategory());

  const getProductById = (productId: string, products: any) =>
    products.find((p: any) => p.id === Number(productId));

  const currentProduct = getProductById(productId, products);

  const categoryState = [{ name: "name", _id: "" }];

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
            {/* {product.categories.map((p) => (
              <span className="product__category" key={p}>
                {categoryState.find((c) => c._id === p)?.name}
              </span>
            ))} */}
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
