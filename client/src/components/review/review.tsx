import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { IReview } from "../../types/store/reviewStoreType";
import useFarmatDate from "../../hooks/useFormatDate";

interface IReviewProps {
  review: IReview;
}

export const Review = ({ review }: IReviewProps) => {
  const { t } = useTranslation();

  const { returnFormattedDate } = useFarmatDate(review?.createdAt);

  const farmattedDate = returnFormattedDate();

  return (
    <div className="review">
      <img
        src={review.user.avatar}
        alt="avatar"
        className="review__user-img review-item"
      />
      <div className="review__title review-item">
        <p className="review__title-content">
          <span className="review__username">
            {review.user.firstName} {review.user.lastName}
          </span>
          &nbsp;&nbsp;{t("left review")}
          <span className="review__date">
            &nbsp;&nbsp;&nbsp; {farmattedDate}
          </span>
        </p>
      </div>
      <p className="review__text review-item">{review?.comment}</p>
      <div className="review__rate review-item">
        <StarRatings
          rating={review?.rate}
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="2px"
          numberOfStars={5}
          name="rating"
        />
      </div>
    </div>
  );
};
