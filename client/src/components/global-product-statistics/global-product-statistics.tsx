import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import { IProductStatistics } from "../../types/store/serviceStoreType";
import StarRatings from "react-star-ratings";

const GlobalProductStatistics = () => {
  const { t } = useTranslation();
  const products = useTypedSelector((state) => state.products.products);
  const productStatistics = useTypedSelector(
    (state) => state.service.shopStatisticsData.productStatistics
  );

  const fullProducts = productStatistics?.map((product) => {
    const existProduct = products.find((p) => p.id === product.id);
    return {
      name: existProduct?.name,
      image: existProduct?.image,
      price: existProduct?.price,
      bought: product?.bought,
      revenue: product?.revenue,
      averageRating: product?.averageRating,
      reviewCount: product?.reviewCount,
    };
  });

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(fullProducts, 5);

  const productsToShow = showCurrentEntity();

  if (!productsToShow?.length) {
    return (
      <>
        <hr />
        <h2 className="table__title">{t("There is no products")}</h2>
      </>
    );
  }

  return (
    <>
      <table className="table global-product-statistics">
        <thead>
          <tr>
            <th>{t("Name")}</th>
            <th>{t("Price")}</th>
            <th>{t("Bought")}</th>
            <th>{t("Revenue")}</th>
            <th>{t("Average rating")}</th>
            <th>{t("Review count")}</th>
          </tr>
        </thead>
        <tbody>
          {productsToShow.map((product: IProductStatistics, i: number) => (
            <tr key={i}>
              <td className="global-product-statistics__table table__info-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="table__image"
                />
                {product.name}
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
