import React, { useEffect, useState, useRef, useCallback } from "react";
import { TPurchase } from "../../types/orderType";

interface IOrderAccordeon {
  order: TPurchase;
}

const OrderAccordeon = ({ order }: IOrderAccordeon) => {
  const [active, setActive] = useState(false);
  const divRef = useRef<any>();

  const returnUniqueOrder = useCallback(() => {
    return order?.purchase?.map((item) => {
      return { image: item.product.image, name: item.product.name };
    });
  }, [order.purchase]);

  const returnTotalPrice = useCallback(() => {
    const totalSum = order.purchase.reduce((acc: number, item: any) => {
      const sum = item.product.price * item.quantity;
      return acc + sum;
    }, 0);
    return totalSum.toFixed(2);
  }, [order.purchase]);

  const totalPrice = returnTotalPrice();

  const mapUniqueOrder = returnUniqueOrder();

  let offset = -45;

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = active
        ? `${divRef.current.scrollHeight + 20}px`
        : "0px";
    }
  }, [active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  const returnFormattedDate = useCallback(() => {
    let formattedDate = order.createdAt.split("T");
    let time = formattedDate[1].split(".")[0].split(":");
    time.pop();
    return `${formattedDate[0]}, ${time[0]}:${time[1]}`;
  }, [order.purchase]);

  const formattedDate = returnFormattedDate();

  return (
    <div className={`order__item${active ? " accordion-open" : ""}`}>
      <header className="order__header" onClick={toggleAccordion}>
        <div className="order__header-container">
          <i className="ri-add-line questions__icon" />
          <h2 className="order__item-title">#{order.number}</h2>
          <div>
            <h2 className="order__item-text">{formattedDate}</h2>

            {order.isNeedDelivery && (
              <h2 className="order__item-text">Delivery needed</h2>
            )}
            {order.isNeedPackage && (
              <h2 className="order__item-text">Package needed</h2>
            )}
          </div>
        </div>
        <ul className={`order__products`}>
          {mapUniqueOrder?.map((order, index) => {
            offset = offset + 45;
            if (index > 5) {
              return null;
            } else if (index === 5) {
              return (
                <li
                  key={index}
                  style={{ zIndex: 6 - index, left: offset + "px" }}
                  className={`order__product`}
                >
                  <img
                    src={order?.image}
                    alt={order?.name}
                    style={{ zIndex: 6 - index, opacity: 0.4 }}
                    className={`order__product-image`}
                  />
                  <p
                    className={`text order__product-counter`}
                    style={{ zIndex: 6 }}
                  >
                    {`+${mapUniqueOrder?.length - index}`}
                  </p>
                </li>
              );
            } else {
              return (
                <li
                  key={index}
                  style={{ zIndex: 6 - index, left: offset + "px" }}
                  className={`order__product`}
                >
                  <img
                    src={order?.image}
                    alt={order?.name}
                    style={{ zIndex: 6 - index }}
                    className={`order__product-image`}
                  />
                </li>
              );
            }
          })}
        </ul>
      </header>

      <div className="order__content" ref={divRef}>
        <hr />
        {order.purchase && (
          <table className="table">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.purchase.map((item: any) => (
                <tr key={item.id}>
                  <td className="order__info table__info-image">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="table__image"
                    />
                    {item.product.name}
                  </td>
                  <td className="order__info">{item.product.price}</td>
                  <td className="order__info">{item.quantity}</td>
                  <td className="order__info">
                    {(item.quantity * item.product.price).toFixed(2)} $
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="order__summary-container">
          <h3 className="order__item-title order__summary">
            <span>Summary:</span> {totalPrice} $
          </h3>
        </div>

        {order.comment && (
          <p className="order__info">Comment: {order.comment}</p>
        )}
      </div>
    </div>
  );
};

export default OrderAccordeon;
