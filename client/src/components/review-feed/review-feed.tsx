import { useTranslation } from "react-i18next";
import { Review } from "../review/review";
import { IReview } from "../../types/store/reviewStoreType";

interface IReviewFeedProps {
  reviews: IReview[];
}

export const ReviewFeed = ({ reviews }: IReviewFeedProps) => {
  const { t } = useTranslation();

  return (
    <section className="review-feed">
      <h3 className="section__title-center questions__title container">
        {t("Reviews")}
      </h3>
      {reviews?.map((review: IReview) => {
        return <Review key={review.id} review={review} />;
      })}
    </section>
  );
};
