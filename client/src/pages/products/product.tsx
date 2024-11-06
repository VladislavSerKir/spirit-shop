import { FC, useMemo } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { IProduct } from "../../types/store/productStoreType";
import { toast } from "react-toastify";
import { addProductToCart } from "../../store/actions/cartAction";
import { dislikeProduct, likeProduct } from "../../store/actions/productAction";
import { ICategory } from "../../types/store/categoryStoreType";

interface IProductProps {
  productId: string;
}

const Product: FC<IProductProps> = ({ productId }) => {
  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);
  const user = useTypedSelector((state) => state.user.userData);
  const cart = useTypedSelector((state) => state.cart.cart);

  const userLikedProducts = user.favourite?.map((i: any) => i.id);

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

  const countProducts = useMemo(() => {
    if (!cart?.cartItem?.length) return 0;
    const counter = cart?.cartItem?.find(
      (item: any) => item.product.id === +productId
    )?.quantity;
    return typeof counter === "number" ? counter : 0;
  }, [productId, cart?.cartItem]);

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
          className={`button--flex product-solo__like-button ${
            userLikedProducts?.includes(+productId)
              ? "product-solo__like-button-active"
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
          {countProducts !== 0 ? (
            <div className="product-solo__cart-counter" role="status">
              {countProducts}
            </div>
          ) : null}
        </button>
      </div>
    </section>
  );
};

export default Product;
