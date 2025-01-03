import { useTypedSelector } from "../../types";
import Pagination from "../../shared/hoc/pagination/pagination";
import usePagination from "../../hooks/usePagination";
import { useTranslation } from "react-i18next";
import Spinner from "../spinner/spinner";
import { shallowEqual } from "react-redux";
import { IReview } from "../../types/store/reviewStoreType";
import { ReviewItem } from "./review-item";

export const ReviewPage = () => {
  const { t } = useTranslation();
  const user = useTypedSelector((state) => state.user.userData);
  const products = useTypedSelector((state) => state.products.products);

  const reviews =
    useTypedSelector(
      (store) =>
        (store.review.review as IReview[])?.reduce((acc, item: IReview) => {
          if (item.user.email === user.email && item) {
            const product = products.find(
              (product) => product.id === item.product.id
            );
            acc = [...acc, { ...item, product } as never];
          }
          return acc;
        }, []),
      shallowEqual
    ) || [];

  const reviewRequest = useTypedSelector((store) => store.review.reviewRequest);

  const { currentPage, showCurrentEntity, jump, maxPage, next, prev } =
    usePagination(reviews, 5);

  const reviewsToShow = showCurrentEntity();

  return (
    <>
      {reviewRequest ? (
        <Spinner />
      ) : (
        <>
          <hr />
          <div className="my-review-page__page">
            {reviewsToShow?.length ? (
              <>
                <div className="my-review-page__reviews">
                  {reviewsToShow?.map((review: IReview) => {
                    return (
                      <div key={review.id} className="accordeon__container">
                        <ReviewItem key={review.id} review={review} tab />
                      </div>
                    );
                  })}
                </div>
                <hr />
                <Pagination
                  currentPage={currentPage}
                  jump={jump}
                  maxPage={maxPage}
                  next={next}
                  prev={prev}
                />
              </>
            ) : (
              <h3 className="container-center">{t("There are no reviews")}</h3>
            )}
          </div>
        </>
      )}
    </>
  );
};
