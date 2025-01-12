import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { IReview, IReviewUser } from "../../types/store/reviewStoreType";
import useFarmatDate from "../../hooks/useFormatDate";
import likeActive from "../../assets/img/like-active.png";
import likeInactive from "../../assets/img/like-inactive.png";
import { toast } from "react-toastify";
import { useTypedDispatch, useTypedSelector } from "../../types";
import {
  deleteReview,
  dislikeReview,
  likeReview,
} from "../../store/actions/reviewAction";
import Button from "../../shared/button/button";
import history from "../../utils/history";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

interface IReviewProps {
  review: IReview;
  tab?: boolean;
}

export const ReviewItem = ({ review, tab }: IReviewProps) => {
  const { url } = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.userData);

  const { returnFormattedDate } = useFarmatDate(review?.createdAt);

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

  const handleDeleteReview = ({ id }: IReview) => {
    dispatch(deleteReview(id));
  };

  const handleGoToProduct = (id: number) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="review-element">
      <img
        src={review.product.image}
        alt="avatar"
        className="review-element__user-img review-element-item product-statistic__image"
        onClick={() => handleGoToProduct(review.product.id)}
      />
      <div className="review-element__title review-element-item">
        <p className="review-element__title-content">
          <span
            className="review-element__username global-product-statistics__name"
            onClick={() => handleGoToProduct(review.product.id)}
          >
            {review.product.name}
          </span>
          <span className="review-element__date">
            &nbsp;&nbsp;&nbsp; {farmattedDate}
          </span>
        </p>
      </div>
      <p className="review-element__text review-element-item">
        {review?.comment}
      </p>
      <div className="review-element__rate review-element-item">
        <StarRatings
          rating={review?.rate}
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="2px"
          numberOfStars={5}
          name="rating"
        />
      </div>
      <div className="review-element__like">
        {userLikesIds?.includes(user.email) ? (
          <img
            src={likeActive}
            alt="avatar"
            className="review-element__like-button"
            onClick={() => handleLikeReview(review.id)}
          />
        ) : (
          <img
            src={likeInactive}
            alt="avatar"
            className="review-element__like-button"
            onClick={() => handleLikeReview(review.id)}
          />
        )}
        <span className="review-element__date">
          &nbsp; {review?.helpful?.length ? review?.helpful?.length : ""}{" "}
          {t("like")}
        </span>
      </div>
      {!tab && (
        <div className="review-element__delete review-element-item">
          <Button
            buttonStyle="yandex"
            textContent={t("Delete")}
            buttonHandler={() => handleDeleteReview(review)}
          />
          <Link
            className={`text text_type_main-small orders-feed__link`}
            to={{
              pathname: `${url}/${review.id}`,
              state: { background: location },
            }}
          >
            <Button buttonStyle="google" textContent={t("Edit")} />
          </Link>
        </div>
      )}
    </div>
  );
};
