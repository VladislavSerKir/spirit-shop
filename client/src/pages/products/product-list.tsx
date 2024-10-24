import React, { useState } from "react";
import _ from "lodash";
import Pagination from "../../shared/hoc/pagination/pagination";
import ProductCard from "../../shared/product-card/product-card";
import Accordeon from "../../shared/hoc/accordeon/accordeon";
import Loader from "../../shared/loader/loader";
import usePagination from "../../hooks/usePagination";
import { useTypedSelector } from "../../types";
import {} from "../../store/actions/productAction";
import { IProduct } from "../../types/productType";

export interface IOrderCategory {
  order: any;
}

const ProductsList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [sortBy, setSortBy] = useState<any>({});

  const productsState = useTypedSelector((state) => state.products.products);
  const categories = useTypedSelector((state) => state.products.categories);

  const productsLoading = useTypedSelector(
    (state) => state.products.categoriesRequest
  );
  const categoryLoading = useTypedSelector(
    (state) => state.products.categoriesRequest
  );
  const productsError = useTypedSelector(
    (state) => state.products.productsErrorMessage
  );
  const categoryError = useTypedSelector(
    (state) => state.products.categoriesErrorMessage
  );

  const handleSearch = ({ target }: any) => {
    setSearchValue(target.value);
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  function searchProducts(products: any) {
    if (products) {
      if (selectedCategory) {
        const newData: IProduct[] = [];
        products.forEach((product: any) => {
          const productCategories = product.categories.map((category: any) =>
            String(category.id)
          );
          if (productCategories.includes(selectedCategory)) {
            newData.push(product);
          }
        });
        return newData.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      return products.filter((product: any) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return [];
  }

  const productsList = searchProducts(productsState);

  const sortedProducts = sortBy?.order
    ? _.orderBy(productsList, "price", [sortBy.order])
    : productsList;

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(sortedProducts, 6);

  const products = showCurrentEntity();

  const handleSort = () => {
    const updated = {
      ...sortBy,
      order: sortBy?.order === "asc" ? "desc" : "asc",
    };
    setSortBy(updated);
  };

  const handleSkipSort = () => {
    setSortBy({});
  };

  if (productsLoading || categoryLoading) {
    return (
      <section className="product section container" id="products">
        <Loader />
      </section>
    );
  }

  if (productsError || categoryError) {
    return (
      <section className="product section container">
        <h3>{productsError || categoryError}</h3>
      </section>
    );
  }

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
          categories={categories}
          onCategorySelected={handleCategorySelect}
        />
      </div>
      {products.length ? (
        <>
          <div className="product__container grid">
            {products.map((product: IProduct) => (
              <ProductCard
                categories={categories}
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
