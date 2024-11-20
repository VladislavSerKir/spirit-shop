import React, { FC, useRef } from "react";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";

const MyReview: FC = () => {
  const { t } = useTranslation();
  const textareaRef = useRef<any>();

  React.useEffect(() => {
    textareaRef.current.addEventListener("input", () => {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 5 + "px";
    });

    // return () => window.removeEventListener("input");
  }, []);

  const getTheme = () => {
    return localStorage.getItem("selected-theme");
  };

  const currentTheme = getTheme();

  const dispatch = useTypedDispatch();
  const products = useTypedSelector((state) => state.products.products);
  const user = useTypedSelector((state) => state.user.userData);
  const cart = useTypedSelector((state) => state.cart.cart);
  const reviews = useTypedSelector((state) => state.review.review);

  return (
    <div className="my-review__content">
      <h3 className="section__title-center">{t("My review")}</h3>
      <textarea
        ref={textareaRef}
        placeholder={t("Leave review")}
        className={`my-review__textarea ${currentTheme === "dark" ? "my-review__textarea-dark" : null}`}
      ></textarea>
      <div className="my-review__rate">
        <p className="review__text">{t("My rate")}:</p>
        <StarRatings
          rating={5}
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="2px"
          numberOfStars={5}
          name="rating"
        />
      </div>
      <button className="button button--flex my-review__submit">
        {t("Leave review")}
        <i className="ri-arrow-right-down-line button__icon"></i>
      </button>
    </div>
  );
};

export default MyReview;
