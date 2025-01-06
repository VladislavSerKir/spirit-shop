import React, { FC } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import { getShopStatisticsInfo } from "../../store/actions/userAction";
import Spinner from "../spinner/spinner";
import GlobalProductStatistics from "../../components/global-product-statistics/global-product-statistics";
import { setShopStatisticsInfoToNull } from "../../store/reducers/serviceReducer";
import { useRouteMatch } from "react-router-dom";

const ShopStatistics: FC = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { url } = useRouteMatch();

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

  if (shopStatisticsRequest) {
    return <Spinner />;
  }

  return (
    <section className="personal-page">
      <>
        <h2 className="section__title-center">{t("Shop statistic")}</h2>
        <div className="personal-page__container">
          <div className="personal-page__basic-info">
            <h3 className="personal-page__text">
              {t("Total orders")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalOrders ? statistics.totalOrders : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total bought products")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalBoughtProducts
                ? statistics.totalBoughtProducts
                : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total revenue")}:&nbsp;&nbsp;&nbsp;
              {statistics?.totalRevenue ? statistics.totalRevenue : 0} $
            </h3>
            <h3 className="personal-page__text">
              {t("Average order price")}:&nbsp;&nbsp;&nbsp;
              {statistics?.averageOrderPrice
                ? statistics.averageOrderPrice
                : 0}{" "}
              $
            </h3>
            <h3 className="personal-page__text">
              {t("Total reviews")}:&nbsp;&nbsp;&nbsp;
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
