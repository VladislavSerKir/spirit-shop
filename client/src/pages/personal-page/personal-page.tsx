import React, { FC, useState } from "react";
import { useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import { ReviewPage } from "../reviews/review-page";
import ProductStatistic from "../../components/product-statistic/product-statistic";

const PersonalPage: FC = () => {
  const user = useTypedSelector((state) => state.user.userData);
  const { t } = useTranslation();

  const [tabType, tabTypeType] = useState("statistics");

  const changeTabType = () => {
    if (tabType === "statistics") {
      tabTypeType("reviews");
    } else {
      tabTypeType("statistics");
    }
  };

  return (
    <section className="personal-page">
      <h2 className="section__title-center">
        {user.firstName} {user.lastName}
      </h2>
      <div className="personal-page__container">
        <div className="profile__avatar-container">
          <img
            src={user.avatar}
            alt="avatar"
            className="personal-page__avatar-img"
          />
        </div>
        <div className="personal-page__basic-info">
          <h3 className="personal-page__text">
            {t("When registered")}:&nbsp;&nbsp;&nbsp;2024-11-25, 18:49
          </h3>
          <h3 className="personal-page__text">
            {t("First order date")}:&nbsp;&nbsp;&nbsp;2024-11-25, 18:49
          </h3>
          <h3 className="personal-page__text">
            {t("Total orders")}:&nbsp;&nbsp;&nbsp;30
          </h3>
          <h3 className="personal-page__text">
            {t("Total reviews")}:&nbsp;&nbsp;&nbsp;30
          </h3>
          <h3 className="personal-page__text">
            {t("Total bought products")}:&nbsp;&nbsp;&nbsp;30
          </h3>
          <div className="personal-page__top-product">
            <h3 className="personal-page__text">
              {t("Most buyable product")}:
            </h3>
            <div className="personal-page__product-container">
              <img
                src={"https://i.ibb.co/wCL15d2/pah1-c.png"}
                alt="avatar"
                className="review-element__user-img review-element-item"
              />
              <h3 className="personal-page__product-name">
                Sedum montanum subsp. orientale
              </h3>
              <h3 className="personal-page__text">(7 {t("times")})</h3>
            </div>
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
    </section>
  );
};

export default PersonalPage;
