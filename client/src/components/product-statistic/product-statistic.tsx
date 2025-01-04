import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import { IUserOrders } from "../../types/store/orderStoreType";

const ProductStatistic = () => {
  const { t } = useTranslation();
  const products = useTypedSelector((state) => state.products.products);
  const userOrders = useTypedSelector(
    (state) => state.user.basicUserInfoData.userOrders
  );

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(userOrders, 4);

  const productsToShow = showCurrentEntity();

  if (!userOrders?.length) {
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
            <th>{t("Bought")}</th>
          </tr>
        </thead>
        <tbody>
          {productsToShow.map((userOrders: IUserOrders, i: number) => (
            <tr key={i}>
              <td className="product-statistic__table table__info-image">
                <img
                  src={userOrders.image}
                  alt={userOrders.name}
                  className="table__image"
                />
                {userOrders.name}
              </td>
              <td className="product-statistic__table">{userOrders.price}</td>
              <td className="product-statistic__table">
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

export default ProductStatistic;
