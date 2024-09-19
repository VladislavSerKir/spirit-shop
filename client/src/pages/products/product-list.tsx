import React, { useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
// import { getCategory, getCategoryError, getCategoryLoadingStatus } from '../../store/category';
// import { getProducts, getProductsError, getProductsLoadingStatus } from '../../store/products';
// import usePagination from "../../hooks/usePagination";
import Pagination from "../../shared/hoc/pagination/pagination";
import ProductCard from "../../shared/product-card/product-card";
import Accordeon from "../../shared/hoc/accordeon/accordeon";
import Loader from "../../shared/loader/loader";
import usePagination from "../../hooks/usePagination";

// type TSortBy = {} | { order: string };

const ProductsList = () => {
  //   const productsState = useSelector(getProducts());
  //   const productsError = useSelector(getProductsError());
  //   const productsLoading = useSelector(getProductsLoadingStatus());
  //   const categoryState = useSelector(getCategory());
  //   const categoryError = useSelector(getCategoryError());
  //   const categoryLoading = useSelector(getCategoryLoadingStatus());

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [sortBy, setSortBy] = useState({ order: "asc" }); // {}

  //   const handleSearch = ({ target }) => {
  //     setSearchValue(target.value);
  //   };

  //   const handleCategorySelect = (category) => {
  //     setSelectedCategory(category);
  //   };

  //   function searchProducts(data) {
  //     if (data) {
  //       if (selectedCategory) {
  //         const newData = [];
  //         data.forEach((p) => {
  //           if (p.categories.includes(selectedCategory)) {
  //             newData.push(p);
  //           }
  //         });
  //         return newData.filter((product) =>
  //           product.name.toLowerCase().includes(searchValue.toLowerCase())
  //         );
  //       }
  //       return data.filter((product) =>
  //         product.name.toLowerCase().includes(searchValue.toLowerCase())
  //       );
  //     }
  //     return [];
  //   }

  //   const productsList = searchProducts(productsState);

  const products = [
    {
      id: 1,
      name: "product.name",
      image: "product.image",
      price: 42,
    },
  ];

  //   const sortedProducts = sortBy?.order
  //     ? _.orderBy(products, "price", [sortBy.order])
  //     : products;

  const sortedProducts = products;

  const { currentPage, currentProducts, jump, maxPage, next, prev } =
    usePagination(products, 6);

  const categoryState = [{ name: "name", _id: "" }];
  //   const products = currentProducts();

  //   const handleSort = () => {
  //     const updated = {
  //       ...sortBy,
  //       order: sortBy?.order === "asc" ? "desc" : "asc",
  //     };
  //     setSortBy(updated);
  //   };

  //   const handleSkipSort = () => {
  //     setSortBy({});
  //   };

  //   if (productsLoading || categoryLoading) {
  //     return (
  //       <section className="product section container" id="products">
  //         <Loader />
  //       </section>
  //     );
  //   }

  //   if (productsError || categoryError) {
  //     return (
  //       <section className="product section container">
  //         <h3>{productsError || categoryError}</h3>
  //       </section>
  //     );
  //   }

  const handleSearch = () => {};

  const handleSort = () => {};

  const handleSkipSort = () => {};

  const handleCategorySelect = () => {};

  return (
    <section className="product section container">
      <h2 className="section__title-center">Our products</h2>
      <div className="search__container">
        <div className="footer__subscribe search__input">
          <input
            type="text"
            placeholder="Enter plant name..."
            className="footer__input"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <button
          type="button"
          className="button button--flex search__button"
          onClick={handleSort}
        >
          {sortBy?.order === "desc" ? (
            <i className="ri-arrow-down-s-line" />
          ) : (
            <i className="ri-arrow-up-s-line" />
          )}
        </button>
        {sortBy?.order ? (
          <button
            type="button"
            className="button button--flex search__button"
            onClick={handleSkipSort}
          >
            <i className="ri-close-line" />
          </button>
        ) : null}
      </div>
      <div className="accordeon__container">
        <Accordeon
          title="Categories"
          categoryProducts={categoryState}
          onCategorySelected={handleCategorySelect}
        />
      </div>
      {products.length ? (
        <>
          <div className="product__container grid">
            {products.map((product) => (
              <ProductCard
                categoryState={categoryState}
                product={product}
                key={product.id}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            jump={jump}
            maxPage={maxPage}
            next={next}
            prev={prev}
          />
        </>
      ) : (
        <h3 className="container-center">There are no products</h3>
      )}
    </section>
  );
};

export default ProductsList;
