import { FC } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { ICategory, IProduct } from "../../types/productType";
import { toast } from "react-toastify";
import { addProductToCart } from "../../store/actions/cartAction";
import { dislikeProduct, likeProduct } from "../../store/actions/productAction";

interface IProductProps {
  productId: string;
}

const Product: FC<IProductProps> = ({ productId }) => {
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);
  const user = useTypedSelector((state) => state.user.userData);

  const userLikedProducts = user?.favourite?.map((i: any) => i.id);

  const getProductById = (productId: string, products: any) =>
    products.find((p: any) => p.id === Number(productId));

  const currentProduct = getProductById(productId, products);

  const handleAdd = (product: any) => {
    if (user.email) {
      dispatch(addProductToCart(product));
    } else {
      toast.info("Sign in to add to cart!");
    }
  };

  const handleLike = (id: number) => {
    const likedProductsIds = user.favourite?.map((i: IProduct) => i.id);

    if (user.email && !likedProductsIds.includes(id)) {
      dispatch(likeProduct(id));
    } else if (user.email && likedProductsIds.includes(id)) {
      dispatch(dislikeProduct(id));
    } else {
      toast.info("Sign in to add product to favorites");
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
          className={`button--flex product__like-button ${
            userLikedProducts?.includes(productId)
              ? "product__like-button-active"
              : null
          }`}
          type="button"
          onClick={() => handleLike(+productId)}
        >
          <i className="ri-heart-add-fill" />
        </button>
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
