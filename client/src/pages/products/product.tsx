import { FC } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { ICategory } from "../../types/productType";
import { addProductToCart } from "../../store/actions/productAction";
import { toast } from "react-toastify";

interface IProduct {
  productId: string;
}

const Product: FC<IProduct> = ({ productId }) => {
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);
  const user = useTypedSelector((state) => state.user.userData.email);

  const getProductById = (productId: string, products: any) =>
    products.find((p: any) => p.id === Number(productId));

  const currentProduct = getProductById(productId, products);

  const handleAdd = (product: any) => {
    if (user) {
      dispatch(addProductToCart(product));
    } else {
      toast.info("Sign in to add to cart!");
    }
  };

  return (
    <section className="container section">
      <h2 className="section__title-center">{currentProduct?.name}</h2>
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

        <button
          onClick={() => handleAdd(currentProduct)}
          className="button--flex product-solo__button"
          type="button"
        >
          <i className="ri-shopping-bag-line" />
        </button>
      </div>
    </section>
  );
};

export default Product;
