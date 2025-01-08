import React, { FC, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import {
  getShopStatisticsInfo,
  getShopStatisticsPeriodInfo,
} from "../../store/actions/userAction";
import Spinner from "../spinner/spinner";
import GlobalProductStatistics from "../../components/global-product-statistics/global-product-statistics";
import { setShopStatisticsInfoToNull } from "../../store/reducers/serviceReducer";
import { useRouteMatch } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../shared/button/button";
import useFarmatDate from "../../hooks/useFormatDate";

const ShopStatistics: FC = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const periodStatistics = useTypedSelector(
    (state) => state.user.periodStatistics
  );
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { formatDate } = useFarmatDate();

  const formatStartDate = formatDate(startDate);
  const formatEndDate = formatDate(endDate);

  const statistics = useTypedSelector(
    (state) => state.service.shopStatisticsData
  );

  const shopStatisticsRequest = useTypedSelector(
    (state) => state.service.shopStatisticsRequest
  );

  React.useEffect(() => {
    dispatch(getShopStatisticsInfo());

    return () => {
      setShopStatisticsInfoToNull();
    };
  }, [url]);

  const getShopStatisticsHandler = (startDate: string, endDate: string) => {
    dispatch(getShopStatisticsPeriodInfo({ startDate, endDate }));
  };

  if (shopStatisticsRequest) {
    return <Spinner />;
  }

  return (
    <section className="personal-page">
      <>
        <h2 className="section__title-center">
          {periodStatistics
            ? `${t("Shop statistic between")} ${formatStartDate} ${formatEndDate}`
            : `${t("Shop statistic during lifetime")}`}
        </h2>
        <div className="shop-statistics__date-container">
          <div className="shop-statistics__date-picker">
            <p>{t("Start date")}</p>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
            />
          </div>
          <div className="shop-statistics__date-picker">
            <p>{t("End date")}</p>
            <DatePicker
              selected={endDate}
              onChange={(date: any) => setEndDate(date)}
            />
          </div>
          <Button
            buttonStyle="arrow-up"
            buttonType="button"
            textContent={t("Get statistics between period")}
            buttonHandler={() =>
              getShopStatisticsHandler(formatStartDate, formatEndDate)
            }
          />
        </div>
        <div className="shop-statistics__container">
          <div className="personal-page__basic-info">
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total orders")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total orders")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalOrders ? statistics.totalOrders : 0}
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total bought products")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total bought products")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalBoughtProducts
                ? statistics.totalBoughtProducts
                : 0}
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total revenue")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total revenue")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalRevenue ? statistics.totalRevenue : 0} $
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Average order price")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Average order price")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.averageOrderPrice
                ? statistics.averageOrderPrice
                : 0}{" "}
              $
            </h3>
            <h3 className="personal-page__text">
              {periodStatistics
                ? `${t("Total reviews")} (${formatStartDate}  ${formatEndDate})`
                : `${t("Total reviews")}`}
              :&nbsp;&nbsp;&nbsp;
              {statistics?.totalReviews ? statistics.totalReviews : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total users")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalUsers ? statistics.totalUsers : 0}
              &nbsp;&nbsp;&nbsp;,
              {t("including active")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalUsersActive ? statistics.totalUsersActive : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total products")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalProducts ? statistics.totalProducts : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total categories")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalCategories ? statistics.totalCategories : 0}
            </h3>
          </div>
        </div>
        <hr />
        <div className={`personal-page__stat-block`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <h2 className={`nav__link personal-page__tab active-link`}>
                {t("Product statistic")}
              </h2>
            </li>
          </ul>
        </div>
        <hr />
        <GlobalProductStatistics />
      </>
    </section>
  );
};

export default ShopStatistics;
