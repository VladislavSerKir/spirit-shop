import Pagination from "../../shared/hoc/pagination/pagination";
import ProductCard from "../../shared/product-card/product-card";
import usePagination from "../../hooks/usePagination";
import { useTypedSelector } from "../../types";
import {} from "../../store/actions/productAction";
import { IProduct } from "../../types/store/productStoreType";
import { useTranslation } from "react-i18next";

export interface IOrderCategory {
  order: any;
}

const FavouriteProducts = () => {
  const { t } = useTranslation();
  const likedProducts = useTypedSelector(
    (state) => state.user.userData.favourite
  );
  const categories = useTypedSelector((state) => state.category.categories);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(likedProducts, 6);

  const products = showCurrentEntity();

  return (
    <section className="product container">
      <h2 className="section__title-center">{t("Favourite products")}</h2>
      {products?.length ? (
        <>
          <div className="product__container grid">
            {products?.length &&
              products?.map((product: IProduct) => (
                <ProductCard
                  categories={categories}
                  product={product}
                  key={product?.id}
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

export default FavouriteProducts;
