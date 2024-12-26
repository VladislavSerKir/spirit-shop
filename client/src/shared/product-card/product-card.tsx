import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IProduct } from "../../types/store/productStoreType";
import { useTypedDispatch, useTypedSelector } from "../../types";
import gradient from "../../assets/img/product-background.png";
import { addProductToCart } from "../../store/actions/cartAction";
import { dislikeProduct, likeProduct } from "../../store/actions/productAction";
import { ICategory } from "../../types/store/categoryStoreType";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { rateProduct } from "../../store/actions/reviewAction";
import { IReview } from "../../types/store/reviewStoreType";
import { ICartItem } from "../../types/store/cartStoreType";

interface IProductCardProps {
  product: IProduct;
  categories: ICategory[] | [] | undefined;
}

const ProductCard = ({ product, categories }: IProductCardProps) => {
  const { t } = useTranslation();
  const user = useTypedSelector((state) => state.user.userData);
  const cart = useTypedSelector((state) => state.cart.cart);
  const reviews = useTypedSelector((state) => state.review.review);
  const currentReviews = Array.isArray(reviews)
    ? reviews.filter((i) => i.product?.id === product?.id)
    : [];

  const dispatch = useTypedDispatch();
  const userLikedProducts = user?.favourite?.map((i: IProduct) => i.id);

  const handleAdd = (product: IProduct) => {
    if (user.email) {
      dispatch(addProductToCart(product));
    } else {
      toast.info(t("Sign in to add to cart"));
    }
  };

  const handleLike = (id: number) => {
    const likedProductsIds = user.favourite?.map((i: IProduct) => i.id);

    if (user.email && !likedProductsIds.includes(id)) {
      dispatch(likeProduct(id));
    } else if (user.email && likedProductsIds.includes(id)) {
      dispatch(dislikeProduct(id));
    } else {
      toast.info(t("Sign in to add product to favorites"));
    }
  };

  const handleRate = (id: number, rate: number) => {
    dispatch(rateProduct({ productId: id, rate }));
  };

  const countProducts = useMemo(() => {
    if (!cart?.cartItem?.length) return 0;
    const counter = cart?.cartItem?.find(
      (item: ICartItem) => item.product.id === product.id
    )?.quantity;
    return typeof counter === "number" ? counter : 0;
  }, [product.id, cart?.cartItem]);

  const countAverageRate = useMemo(() => {
    if (!currentReviews?.length) return 0;
    const counter =
      currentReviews?.reduce(
        (acc, item: IReview) => (acc += item.rate ? item.rate : 0),
        0
      ) / currentReviews?.length;
    return typeof counter === "number" ? counter : 0;
  }, [reviews?.length, currentReviews.length, handleRate]);

  return (
    <article className="product__card" key={product.id}>
      <Link
        to={{
          pathname: `/products/${product.id}`,
        }}
        className="product__link"
      >
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
            {product.categories.map((category: ICategory) => (
              <span className="product__category" key={category.id}>
                {category.name}
              </span>
            ))}
          </div>
          <div className="product__rating">
            <StarRatings
              rating={countAverageRate}
              starRatedColor="orange"
              changeRating={(rate) => handleRate(product.id, rate)}
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
            <span className="product__price">({currentReviews.length})</span>
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
