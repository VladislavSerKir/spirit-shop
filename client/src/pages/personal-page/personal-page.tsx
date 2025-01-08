import React, { FC, useState } from "react";
import { IUseParams, useTypedDispatch, useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import { ReviewPage } from "../reviews/review-page";
import ProductStatistic from "../../components/product-statistic/product-statistic";
import { useParams, useRouteMatch } from "react-router-dom";
import { getBasicUserInfo } from "../../store/actions/userAction";
import useFarmatDate from "../../hooks/useFormatDate";
import { setBasicUserInfoToNull } from "../../store/reducers/userReducer";
import Spinner from "../spinner/spinner";
import { BackButton } from "../../components/back-button/back-button";
import { HiddenPage } from "../hidden-page/hidden-page";
import history from "../../utils/history";

const PersonalPage: FC = () => {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);
  const { t } = useTranslation();
  const { url } = useRouteMatch();
  const [tabType, tabTypeType] = useState("statistics");
  const { id } = useParams<IUseParams>();
  const basicUserInfo = useTypedSelector(
    (state) => state.user.basicUserInfoData
  );
  const basicUserInfoRequest = useTypedSelector(
    (state) => state.user.basicUserInfoRequest
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

  const changeTabType = () => {
    if (tabType === "statistics") {
      tabTypeType("reviews");
    } else {
      tabTypeType("statistics");
    }
  };

  const { returnFormattedDate } = useFarmatDate();

  const farmattedWhenRegistered = returnFormattedDate(
    basicUserInfo?.whenRegistered ? basicUserInfo?.whenRegistered : ""
  );

  const firstOrderDate = returnFormattedDate(
    basicUserInfo?.firstOrderDate ? basicUserInfo.firstOrderDate : ""
  );

  if (basicUserInfoRequest) {
    return <Spinner />;
  }

  if (
    !url.includes("personal-page") &&
    basicUserInfo.hideProfile &&
    user.id !== basicUserInfo.id
  ) {
    return <HiddenPage />;
  }

  return (
    <section className="personal-page">
      <BackButton />
      <>
        <h2 className="section__title-center">
          {basicUserInfo?.firstName ? basicUserInfo.firstName : ""}{" "}
          {basicUserInfo?.lastName ? basicUserInfo.lastName : ""}
        </h2>
        <div className="personal-page__container">
          <div className="personal-page__avatar-container">
            <img
              src={basicUserInfo?.avatar ? basicUserInfo.avatar : ""}
              alt="avatar"
              className="personal-page__avatar-img"
            />
          </div>
          <div className="personal-page__basic-info">
            <h3 className="personal-page__text">
              {t("When registered")}:&nbsp;&nbsp;&nbsp;
              {farmattedWhenRegistered}
            </h3>
            <h3 className="personal-page__text">
              {t("First order date")}:&nbsp;&nbsp;&nbsp;
              {firstOrderDate}
            </h3>
            <h3 className="personal-page__text">
              {t("Total orders")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.totalOrders ? basicUserInfo.totalOrders : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total reviews")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.totalReviews ? basicUserInfo.totalReviews : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Useful reviews")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.helpfulReviews ? basicUserInfo.helpfulReviews : 0}
            </h3>
            <h3 className="personal-page__text">
              {t("Total bought products")}:&nbsp;&nbsp;&nbsp;
              {basicUserInfo?.totalBoughtProducts
                ? basicUserInfo.totalBoughtProducts
                : 0}
            </h3>
            <div className="personal-page__top-product">
              <h3 className="personal-page__text">
                {t("Most buyable product")}:
              </h3>
              {basicUserInfo?.mostBuyableProduct ? (
                <div className="personal-page__product-container">
                  <img
                    src={
                      basicUserInfo?.mostBuyableProduct?.image
                        ? basicUserInfo.mostBuyableProduct.image
                        : ""
                    }
                    alt="avatar"
                    className="review-element__user-img review-element-item"
                  />
                  <h3 className="personal-page__product-name">
                    {basicUserInfo?.mostBuyableProduct?.name
                      ? basicUserInfo.mostBuyableProduct.name
                      : ""}
                  </h3>
                  <h3 className="personal-page__text">
                    (
                    {basicUserInfo?.mostBuyableProduct?.times
                      ? basicUserInfo.mostBuyableProduct.times
                      : 0}{" "}
                    {t("times")})
                  </h3>
                </div>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className={`personal-page__stat-block`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <h2
                className={`nav__link personal-page__tab ${tabType === "statistics" ? "active-link" : ""}`}
                onClick={changeTabType}
              >
                {t("Product statistic")}
              </h2>
            </li>
            <li className="nav__item">
              <h2
                className={`nav__link personal-page__tab ${tabType === "reviews" ? "active-link" : ""}`}
                onClick={changeTabType}
              >
                {t("User reviews")}
              </h2>
            </li>
          </ul>
        </div>
        {tabType === "reviews" && <ReviewPage />}
        {tabType === "statistics" && <ProductStatistic />}
      </>
    </section>
  );
};

export default PersonalPage;
