import React from "react";
import { useTypedSelector } from "../../types";
import OrderAccordeon from "../../components/order-accordeon/order-accordeon";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { IPurchase } from "../../types/store/orderStoreType";
import { useTranslation } from "react-i18next";

export const Order = () => {
  const { t } = useTranslation();
  const orders = useTypedSelector((store) => store.order.purchase);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(orders, 5);

  const ordersToShow = showCurrentEntity();

  return (
    <>
      <div className="order__page">
        <h2 className="section__title-center">{t("My orders")}</h2>
        {ordersToShow?.length ? (
          <>
            {ordersToShow?.map((order: IPurchase) => {
              return (
                <div key={order.id} className="accordeon__container">
                  <OrderAccordeon order={order} />
                </div>
              );
            })}
          </>
        ) : (
          <h3 className="container-center">There are no orders</h3>
        )}
      </div>
      {ordersToShow?.length && (
        <Pagination
          currentPage={currentPage}
          jump={jump}
          maxPage={maxPage}
          next={next}
          prev={prev}
        />
      )}
    </>
  );
};
