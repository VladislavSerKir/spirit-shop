import React from "react";
import { useTypedSelector } from "../../types";
import OrderAccordeon from "../../components/order-accordeon/order-accordeon";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { TPurchase } from "../../types/orderType";

export const Order = () => {
  const orders = useTypedSelector((store) => store.order.purchase);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(orders, 5);

  const ordersToShow = showCurrentEntity();

  return (
    <>
      <div className="order__page">
        <h2 className="section__title-center">Orders</h2>
        {ordersToShow?.map((order: TPurchase) => {
          return (
            <div key={order.id} className="accordeon__container">
              <OrderAccordeon order={order} />
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        jump={jump}
        maxPage={maxPage}
        next={next}
        prev={prev}
      />
    </>
  );
};
