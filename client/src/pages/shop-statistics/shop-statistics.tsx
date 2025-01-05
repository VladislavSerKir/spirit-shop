import React, { FC } from "react";
import { IUseParams, useTypedDispatch, useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import ProductStatistic from "../../components/product-statistic/product-statistic";
import { useParams, useRouteMatch } from "react-router-dom";
import { getBasicUserInfo } from "../../store/actions/userAction";
import useFarmatDate from "../../hooks/useFormatDate";
import { setBasicUserInfoToNull } from "../../store/reducers/userReducer";
import Spinner from "../spinner/spinner";
import GlobalProductStatistics from "../../components/global-product-statistics/global-product-statistics";

const ShopStatistics: FC = () => {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const { id } = useParams<IUseParams>();

  const basicUserInfo = useTypedSelector(
    (state) => state.user.basicUserInfoData
  );

  React.useEffect(() => {
    if (url.includes("personal-page") && user.id !== Number(id)) {
      dispatch(getBasicUserInfo(user.id));
    } else {
      dispatch(getBasicUserInfo(Number(id)));
    }
    return () => {
      dispatch(setBasicUserInfoToNull());
    };
  }, [url]);

  const { returnFormattedDate } = useFarmatDate();

  const farmattedWhenRegistered = returnFormattedDate(
    basicUserInfo?.whenRegistered ? basicUserInfo?.whenRegistered : ""
  );

  const firstOrderDate = returnFormattedDate(
    basicUserInfo?.firstOrderDate ? basicUserInfo.firstOrderDate : ""
  );

  return (
    <section className="personal-page">
      <>
        <h2 className="section__title-center">{t("Shop statistic")}</h2>
        <div className="personal-page__container">
          <div className="personal-page__basic-info">
            <h3 className="personal-page__text">
              {t("Total orders")}:&nbsp;&nbsp;&nbsp;
              {farmattedWhenRegistered}
            </h3>
            <h3 className="personal-page__text">
              {t("Total bought products")}:&nbsp;&nbsp;&nbsp;
              {firstOrderDate}
            </h3>
            <h3 className="personal-page__text">
              {t("Total revenue")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.totalOrders ? basicUserInfo.totalOrders : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Average order price")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.totalReviews ? basicUserInfo.totalReviews : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total reviews")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.helpfulReviews ? basicUserInfo.helpfulReviews : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total users")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.helpfulReviews ? basicUserInfo.helpfulReviews : 0}
              &nbsp;&nbsp;&nbsp;,
              {t("including active")}:
            </h3>
            <h3 className="personal-page__text">
              {t("Total products")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.helpfulReviews ? basicUserInfo.helpfulReviews : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total categories")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.helpfulReviews ? basicUserInfo.helpfulReviews : 0}
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
        {/* {tabType === "most" && <ProductStatistic />} */}
        <GlobalProductStatistics />
      </>
    </section>
  );
};

export default ShopStatistics;
