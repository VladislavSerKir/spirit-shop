import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { GenericObject, useTypedDispatch, useTypedSelector } from "../../types";
import {
  setFilterRate,
  setFilterRateToNull,
} from "../../store/reducers/reviewReducer";
import React from "react";

interface IReviewFilterProps {
  reviews: GenericObject;
}

export const ReviewFilter = ({ reviews }: IReviewFilterProps) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const filterRate = useTypedSelector((state) => state.review.filterRate);

  const rateCount = Array(5).fill(0);

  reviews.forEach((review: any) => {
    if (review.rate >= 1 && review.rate <= 5) {
      rateCount[review.rate - 1] += 1;
    }
  });

  const handleFilterRate = (rate: number) => {
    if (rate === filterRate) {
      dispatch(setFilterRateToNull());
    } else {
      dispatch(setFilterRate(rate));
    }
  };

  React.useEffect(() => {
    return () => {
      dispatch(setFilterRateToNull());
    };
  }, []);

  return (
    <div className="review-filter">
      <h3 className="review__text">{t("Rate filter")}</h3>
      {rateCount.map((count, index) => (
        <div className="review-filter__item" key={index}>
          <div
            className={`review-filter__rate ${filterRate === index + 1 ? "active-link" : ""} `}
            onClick={() => handleFilterRate(index + 1)}
          >
            <StarRatings
              rating={index + 1}
              starRatedColor="orange"
              starDimension="25px"
              starSpacing="4px"
              name={`rating-${index + 1}`}
            />
          </div>
          <p className="product-solo__rating-counter">({count})</p>
        </div>
      ))}
    </div>
  );
};
