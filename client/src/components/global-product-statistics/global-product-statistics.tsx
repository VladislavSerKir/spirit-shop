import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import { IUserOrders } from "../../types/store/orderStoreType";

const GlobalProductStatistics = () => {
  const { t } = useTranslation();
  const products = useTypedSelector((state) => state.products.products);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(products, 4);

  const productsToShow = showCurrentEntity();

  if (!products?.length) {
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
          {productsToShow.map((userOrders: IUserOrders, i: number) => (
            <tr key={i}>
              <td className="global-product-statistics__table table__info-image">
                <img
                  src={userOrders.image}
                  alt={userOrders.name}
                  className="table__image"
                />
                {userOrders.name}
              </td>
              <td className="global-product-statistics__table">
                {userOrders.price}
              </td>
              <td className="global-product-statistics__table">
                {userOrders.quantity}
              </td>
              <td className="global-product-statistics__table">
                {userOrders.quantity}
              </td>
              <td className="global-product-statistics__table">
                {userOrders.quantity}
              </td>
              <td className="global-product-statistics__table">
                {userOrders.quantity}
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
