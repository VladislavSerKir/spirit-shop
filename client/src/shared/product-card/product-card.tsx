import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IProduct } from "../../types/store/productStoreType";
import { useTypedDispatch, useTypedSelector } from "../../types";
import gradient from "../../assets/img/product-background.png";
import { addProductToCart } from "../../store/actions/cartAction";
import { dislikeProduct, likeProduct } from "../../store/actions/productAction";
import { ICategory } from "../../types/store/categoryStoreType";

interface IProductCardProps {
  product: IProduct;
  categories: ICategory[] | [] | undefined;
}

const ProductCard = ({ product, categories }: IProductCardProps) => {
  const user = useTypedSelector((state) => state.user.userData);
  const cart = useTypedSelector((state) => state.cart.cart);
  const dispatch = useTypedDispatch();
  const userLikedProducts = user?.favourite?.map((i: IProduct) => i.id);

  const handleAdd = (product: IProduct) => {
    if (user.email) {
      dispatch(addProductToCart(product));
    } else {
      toast.info("Sign in to add to cart");
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
    if (!cart?.cartItem.length) return 0;
    const counter = cart?.cartItem?.find(
      (item: any) => item.product.id === product.id
    )?.quantity;
    return typeof counter === "number" ? counter : 0;
  }, [product.id, cart?.cartItem]);

  return (
    <article className="product__card" key={product.id}>
      <Link to={`/products/${product.id}`} className="product__link">
        <img src={gradient} alt={product.name} className="product__circle" />

        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product__img"
          />
        </div>
      </Link>

      {categories ? (
        <>
          <h3 className="product__title">{product.name}</h3>
          <div className="container-center">
            {product.categories.map((category: any) => (
              <span className="product__category" key={category.id}>
                {category.name}
              </span>
            ))}
          </div>
          <span className="product__price">${product.price}</span>

          <button
            className={`button--flex product__like-button ${
              userLikedProducts?.includes(product.id)
                ? "product__like-button-active"
                : null
            }`}
            type="button"
            onClick={() => handleLike(product.id)}
          >
            <i className="ri-heart-add-fill" />
          </button>
          <button
            className="button--flex product__button"
            type="button"
            onClick={() => handleAdd(product)}
          >
            <i className="ri-shopping-bag-line" />
            {countProducts !== 0 ? (
              <div className="product__cart-counter" role="status">
                {countProducts}
              </div>
            ) : null}
          </button>
        </>
      ) : (
        <h3 className="product__title">{product.name}</h3>
      )}
    </article>
  );
};

export default ProductCard;
