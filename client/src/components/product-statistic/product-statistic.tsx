import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import { IUserOrders } from "../../types/store/orderStoreType";
import { ICategory } from "../../types/store/categoryStoreType";
import history from "../../utils/history";
import { useState } from "react";

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
            id: product?.id,
            name: existProduct?.name,
            image: existProduct?.image,
            quantity: product?.quantity,
            price: existProduct?.price,
            categories: existProduct?.categories,
          };
        })
      : [];

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
    usePagination(sortProducts(userOrdersToShow, sortColumn), 4);

  const productsToShow = showCurrentEntity();

  const handleGoToProduct = (id: number) => {
    history.push(`/products/${id}`);
  };

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
              onClick={() => handleSort("quantity")}
              style={{ cursor: "pointer" }}
            >
              {t("Bought")}{" "}
              {sortDirection === "asc" && sortColumn === "quantity"
                ? "↑"
                : sortColumn === "quantity" && sortDirection === "desc"
                  ? "↓"
                  : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {productsToShow?.map((userOrders: IUserOrders, i: number) => (
            <tr key={i}>
              <td className="product-statistic__table table__info-image">
                <img
                  src={userOrders.image}
                  alt={userOrders.name}
                  className="table__image product-statistic__image"
                  onClick={() => handleGoToProduct(userOrders?.id)}
                />
                <span
                  className="product-statistic__name nav__link"
                  onClick={() => handleGoToProduct(userOrders?.id)}
                >
                  {userOrders.name}
                </span>
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
