import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import { IProductStatistics } from "../../types/store/serviceStoreType";
import StarRatings from "react-star-ratings";
import history from "../../utils/history";
import { useState } from "react";

const GlobalProductStatistics = () => {
  const { t } = useTranslation();
  const products = useTypedSelector((state) => state.products.products);
  const productStatistics = useTypedSelector(
    (state) => state.service.shopStatisticsData.productStatistics
  );

  const fullProducts = productStatistics?.map((product) => {
    const existProduct = products.find((p) => p.id === product.id);
    return {
      id: existProduct?.id,
      name: existProduct?.name,
      image: existProduct?.image,
      price: existProduct?.price,
      bought: product?.bought,
      revenue: product?.revenue,
      averageRating: product?.averageRating,
      reviewCount: product?.reviewCount,
    };
  });

  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [sortColumn, setSortColumn] = useState<string>("name");
  const sortProducts = (products: any, sortColumn: string) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortColumn] - b[sortColumn];
      } else {
        return b[sortColumn] - a[sortColumn];
      }
    });
    return sortedProducts;
  };

  const handleSort = (columnName: string) => {
    setSortColumn(columnName);
    setSortDirection((prevDirection: string) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(sortProducts(fullProducts, sortColumn), 5);

  const productsToShow = showCurrentEntity();

  if (!productsToShow?.length) {
    return (
      <>
        <hr />
        <h2 className="table__title">{t("There is no products")}</h2>
      </>
    );
  }

  const handleGoToProduct = (id: number) => {
    history.push(`/products/${id}`);
  };

  return (
    <>
      <table className="table global-product-statistics">
        <thead>
          <tr>
            <th>{t("Name")}</th>
            <th
              onClick={() => handleSort("price")}
              style={{ cursor: "pointer" }}
            >
              {t("Price")}{" "}
              {sortDirection === "asc" && sortColumn === "price"
                ? "↑"
                : sortColumn === "price" && sortDirection === "desc"
                  ? "↓"
                  : ""}
            </th>
            <th
              onClick={() => handleSort("bought")}
              style={{ cursor: "pointer" }}
            >
              {t("Bought")}{" "}
              {sortDirection === "asc" && sortColumn === "bought"
                ? "↑"
                : sortColumn === "bought" && sortDirection === "desc"
                  ? "↓"
                  : ""}
            </th>
            <th
              onClick={() => handleSort("revenue")}
              style={{ cursor: "pointer" }}
            >
              {t("Revenue")}{" "}
              {sortDirection === "asc" && sortColumn === "revenue"
                ? "↑"
                : sortColumn === "revenue" && sortDirection === "desc"
                  ? "↓"
                  : ""}
            </th>
            <th
              onClick={() => handleSort("averageRating")}
              style={{ cursor: "pointer" }}
            >
              {t("Average rating")}{" "}
              {sortDirection === "asc" && sortColumn === "averageRating"
                ? "↑"
                : sortColumn === "averageRating" && sortDirection === "desc"
                  ? "↓"
                  : ""}
            </th>
            <th
              onClick={() => handleSort("reviewCount")}
              style={{ cursor: "pointer" }}
            >
              {t("Review count")}{" "}
              {sortDirection === "asc" && sortColumn === "reviewCount"
                ? "↑"
                : sortColumn === "reviewCount" && sortDirection === "desc"
                  ? "↓"
                  : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {productsToShow.map((product: IProductStatistics, i: number) => (
            <tr key={i}>
              <td className="global-product-statistics__table table__info-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="table__image product-statistic__image"
                  onClick={() => handleGoToProduct(product?.id)}
                />
                <span
                  className="global-product-statistics__name"
                  onClick={() => handleGoToProduct(product?.id)}
                >
                  {product.name}
                </span>
              </td>
              <td className="global-product-statistics__table">
                <div className="global-product-statistics__center">
                  <div className="global-product-statistics__fit-width">
                    {product.price} $
                  </div>
                </div>
              </td>
              <td className="global-product-statistics__table">
                <div className="global-product-statistics__center">
                  {product.bought}
                </div>
              </td>
              <td className="global-product-statistics__table">
                <div className="global-product-statistics__center">
                  <div className="global-product-statistics__fit-width">
                    {product.revenue} $
                  </div>
                </div>
              </td>
              <td className="global-product-statistics__table">
                <div className="global-product-statistics__center">
                  <div className="global-product-statistics__split">
                    <div className="global-product-statistics__fit-width">
                      <StarRatings
                        rating={product.averageRating}
                        starRatedColor="orange"
                        starDimension="17px"
                        starSpacing="2px"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                    <p>({product.averageRating})</p>
                  </div>
                </div>
              </td>
              <td className="global-product-statistics__table">
                <div className="global-product-statistics__center">
                  {product.reviewCount}
                </div>
              </td>
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

export default GlobalProductStatistics;
