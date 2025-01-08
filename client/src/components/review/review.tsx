import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { IReview, IReviewUser } from "../../types/store/reviewStoreType";
import useFarmatDate from "../../hooks/useFormatDate";
import likeActive from "../../assets/img/like-active.png";
import likeInactive from "../../assets/img/like-inactive.png";
import { toast } from "react-toastify";
import { useTypedDispatch, useTypedSelector } from "../../types";
import { dislikeReview, likeReview } from "../../store/actions/reviewAction";
import history from "../../utils/history";

interface IReviewProps {
  review: IReview;
}

export const Review = ({ review }: IReviewProps) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);

  const { returnFormattedDate } = useFarmatDate();

  const farmattedDate = returnFormattedDate(review?.createdAt);

  const userLikesIds = review.helpful?.map((i: IReviewUser) => i.email);

  const handleLikeReview = (id: number) => {
    if (user.email && !userLikesIds?.includes(user.email)) {
      dispatch(likeReview(id));
    } else if (user.email && userLikesIds?.includes(user.email)) {
      dispatch(dislikeReview(id));
    } else {
      toast.info(t("Sign in to like reviews"));
    }
  };

  const handleGoToUser = (id: number) => {
    history.push(`/user/${id}`);
  };

  return (
    <div className="review">
      <img
        src={review.user.avatar}
        alt="avatar"
        className="review__user-img review-item"
        onClick={() => handleGoToUser(review?.user.id)}
      />
      <div className="review__title review-item">
        <p className="review__title-content">
          <span
            className="review__username nav__link"
            onClick={() => handleGoToUser(review?.user.id)}
          >
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
      <div className="review__like">
        {userLikesIds?.includes(user.email) ? (
          <img
            src={likeActive}
            alt="avatar"
            className="review__like-button"
            onClick={() => handleLikeReview(review.id)}
          />
        ) : (
          <img
            src={likeInactive}
            alt="avatar"
            className="review__like-button"
            onClick={() => handleLikeReview(review.id)}
          />
        )}
        <span className="review__date">
          &nbsp; {review?.helpful?.length ? review?.helpful?.length : ""}{" "}
          {t("like")}
        </span>
      </div>
    </div>
  );
};
