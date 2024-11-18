import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../types";
import StarRatings from "react-star-ratings";

export const Review = () => {
  const { t } = useTranslation();
  const userData = useTypedSelector((store) => store.user.userData);

  return (
    <div className="review">
      <img
        src={userData.avatar}
        alt="avatar"
        className="review__user-img review-item"
      />
      <div className="review__title review-item">
        <p className="review__title-content">
          <span className="review__username">
            {userData.firstName} {userData.lastName}
          </span>
          &nbsp;&nbsp;{t("left review")}
          <span className="review__date">&nbsp;&nbsp;&nbsp; 3 days ago</span>
        </p>
      </div>
      <p className="review__text review-item">
        Наша жизнь - постоянный повтор. Мы все время возвращаемся к тому, с чего
        мы начали, а затем начинаем все заново. Даже если мы не проведем лишние
        кружки в тот день, мы обязательно вернемся к тому же еще в тот же день в
        ближайшее время.
      </p>
      <div className="review__rate review-item">
        <StarRatings
          rating={5}
          starRatedColor="orange"
          changeRating={() => {}}
          starDimension="20px"
          starSpacing="2px"
          numberOfStars={5}
          name="rating"
        />
      </div>
    </div>
  );
};
