import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import { IUserOrders } from "../../types/store/orderStoreType";
import { ICategory } from "../../types/store/categoryStoreType";

const ProductStatistic = () => {
  const { t } = useTranslation();
  const products = useTypedSelector((state) => state.products.products);
  const userOrders = useTypedSelector(
    (state) => state.user.basicUserInfoData.userOrders
  );

  const userOrdersToShow =
    userOrders && products
      ? userOrders.map((product) => {
          const existProduct = products.find((p) => p.id === product.id);
          return {
            name: existProduct?.name,
            image: existProduct?.image,
            quantity: product?.quantity,
            price: existProduct?.price,
            categories: existProduct?.categories,
          };
        })
      : [];

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(userOrdersToShow, 4);

  const productsToShow = showCurrentEntity();

  if (!userOrdersToShow?.length) {
    return (
      <>
        <hr />
        <h2 className="table__title">
          {t("There is no product bought by user")}
        </h2>
      </>
    );
  }

  return (
    <>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>{t("Name")}</th>
            <th>{t("Categories")}</th>
            <th>{t("Price")}</th>
            <th>{t("Bought")}</th>
          </tr>
        </thead>
        <tbody>
          {productsToShow?.map((userOrders: IUserOrders, i: number) => (
            <tr key={i}>
              <td className="product-statistic__table table__info-image">
                <img
                  src={userOrders.image}
                  alt={userOrders.name}
                  className="table__image"
                />
                {userOrders.name}
              </td>
              <td className="table__info table__info-category">
                {userOrders?.categories.map((category: ICategory) => (
                  <span className="product__category" key={category.id}>
                    {category.name}
                  </span>
                ))}
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
      {productsToShow?.length ? (
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
