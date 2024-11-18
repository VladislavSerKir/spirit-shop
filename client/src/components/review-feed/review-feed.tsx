import { useTranslation } from "react-i18next";
import { Review } from "../review/review";

export const ReviewFeed = () => {
  const { t } = useTranslation();

  return (
    <section className="review-feed">
      <h3 className="section__title-center questions__title container">
        {t("Reviews")}
      </h3>
      <Review />
    </section>
  );
};
