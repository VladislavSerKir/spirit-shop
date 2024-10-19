import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ICategory, IProduct } from "../../types/productType";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { addProductToCart } from "../../store/actions/productAction";

interface IProductCard {
  product: IProduct;
  categories: ICategory[] | [] | undefined;
}

const ProductCard = ({ product, categories }: IProductCard) => {
  const user = useTypedSelector((state) => state.user.userData.email);
  const dispatch = useTypedDispatch();

  const handleAdd = (product: IProduct) => {
    if (user) {
      dispatch(addProductToCart(product));
    } else {
      toast.info("Sign in to add to cart!");
    }
  };

  return (
    <article className="product__card" key={product.id}>
      <div className="product__circle" />
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product__img" />
      </div>

      {categories ? (
        <>
          <Link to={`/products/${product.id}`}>
            <h3 className="product__title">{product.name}</h3>
          </Link>
          <div className="container-center">
            {product.categories.map((category: any) => (
              <span className="product__category" key={category.id}>
                {category.name}
              </span>
            ))}
          </div>
          <span className="product__price">${product.price}</span>

          <button
            className="button--flex product__button"
            type="button"
            onClick={() => handleAdd(product)}
          >
            <i className="ri-shopping-bag-line" />
          </button>
        </>
      ) : (
        <h3 className="product__title">{product.name}</h3>
      )}
    </article>
  );
};

export default ProductCard;
