import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { IProduct } from "../../types/store/productStoreType";
import { useTranslation } from "react-i18next";
import { ICategory } from "../../types/store/categoryStoreType";

const ProductStatistic = () => {
  const { t } = useTranslation();
  const products = useTypedSelector((state) => state.products.products);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(products, 4);

  const productsToShow = showCurrentEntity();

  if (!products.length) {
    return (
      <h2 className="table__title">{t("There is no product to manage")}</h2>
    );
  }

  return (
    <>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>{t("Name")}</th>
            <th>{t("Price")}</th>
            <th>{t("Categories")}</th>
            <th>{t("Bought")}</th>
          </tr>
        </thead>
        <tbody>
          {productsToShow.map((product: IProduct) => (
            <tr key={product.id}>
              <td className="table__info table__info-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="table__image"
                />
                {product.name}
              </td>
              <td className="table__info">{product.price}</td>
              <td className="table__info table__info-category">
                {product?.categories.map((category: ICategory) => (
                  <span className="product__category" key={category.id}>
                    {category.name}
                  </span>
                ))}
              </td>
              <td className="table__info">4</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      {products?.length ? (
        <Pagination
          currentPage={currentPage}
          jump={jump}
          maxPage={maxPage}
          next={next}
          prev={prev}
        />
      ) : null}
    </>
  );
};

export default ProductStatistic;
