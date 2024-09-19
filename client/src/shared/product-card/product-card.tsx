import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IProduct } from "../../types/product";
// import { getUserCart, updateCart } from "../store/cart";
// import { getIsLoggedIn } from "../store/user";

interface IProductCard {
  product: IProduct;
  categoryState: any;
}

const ProductCard = ({ product, categoryState }: IProductCard) => {
  // const userId = useSelector(getIsLoggedIn());
  // const dispatch = useDispatch();
  // const cart = useSelector(getUserCart());
  // const handleAdd = (id) => {
  //     if (userId) {
  //         const newCart = { ...cart };
  //         if (newCart?.products) {
  //             const isExists = newCart.products.findIndex(
  //                 (p) => p.product === id
  //             );
  //             if (isExists !== -1) {
  //                 const updateProduct = {
  //                     product: id,
  //                     amount: newCart.products[isExists].amount + 1,
  //                 };
  //                 newCart.products = [
  //                     ...newCart.products.filter((p) => p.product !== id),
  //                     updateProduct,
  //                 ];
  //                 dispatch(updateCart(newCart, "add"));
  //                 return;
  //             }
  //         }
  //         newCart.products = [
  //             ...newCart.products,
  //             { product: id, amount: 1 },
  //         ];
  //         dispatch(updateCart(newCart, "add"));
  //     } else if (localStorage.getItem("selected-theme") === "dark") {
  //         toast.info("Sign in to add to cart!", { theme: "dark" });
  //     } else {
  //         toast.info("Sign in to add to cart!");
  //     }
  // };

  return (
    <article className="product__card" key={product.id}>
      <div className="product__circle" />
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product__img" />
      </div>

      {categoryState ? (
        <>
          <Link to={`/products/${product.id}`}>
            <h3 className="product__title">{product.name}</h3>
          </Link>
          <div className="container-center">
            {/* {product.categories.map((p) => (
                            <span className="product__category" key={p}>
                                {categoryState.find((c) => c._id === p).name}
                            </span>
                        ))} */}
          </div>
          <span className="product__price">${product.price}</span>

          <button
            className="button--flex product__button"
            type="button"
            // onClick={() => handleAdd(product._id)}
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
