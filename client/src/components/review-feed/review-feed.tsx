import { useTranslation } from "react-i18next";
import { Review } from "../review/review";
import { IReview } from "../../types/store/reviewStoreType";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { ReviewFilter } from "../review-filter/review-filter";
import { useTypedSelector } from "../../types";

interface IReviewFeedProps {
  reviews: IReview[];
}

export const ReviewFeed = ({ reviews }: IReviewFeedProps) => {
  const { t } = useTranslation();
  const filterRate = useTypedSelector((state) => state.review.filterRate);

  const filteredReviews =
    filterRate === null
      ? reviews
      : reviews.filter((review) => review.rate === filterRate);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(filteredReviews, 4);

  const reviewsToShow = showCurrentEntity();

  return (
    <section className="review-feed">
      <h3 className="section__title-center questions__title container">
        {t("Reviews")}
      </h3>
      <ReviewFilter reviews={reviews} />
      <hr />
      {reviewsToShow?.length ? (
        reviewsToShow?.map((review: IReview) => {
          return <Review key={review.id} review={review} />;
        })
      ) : (
        <h3 className="review__text">{t("No reviews")}</h3>
      )}
      {reviewsToShow?.length ? (
        <Pagination
          currentPage={currentPage}
          jump={jump}
          maxPage={maxPage}
          next={next}
          prev={prev}
        />
      ) : null}
    </section>
  );
};
