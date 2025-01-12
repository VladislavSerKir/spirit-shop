import React, { useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IUseParams, useTypedDispatch, useTypedSelector } from "../../types";
import { useTranslation } from "react-i18next";
import { setIsFadingOut } from "../../store/reducers/userReducer";
import Button from "../../shared/button/button";
import StarRatings from "react-star-ratings";
import { IReview } from "../../types/store/reviewStoreType";
import { shallowEqual } from "react-redux";
import { changeReview } from "../../store/actions/reviewAction";

interface IEditReviewProps {
  onClose: () => void;
}

const EditReview = ({ onClose }: IEditReviewProps) => {
  const { t } = useTranslation();
  const { id } = useParams<IUseParams>();
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const currentReview = useTypedSelector(
    (store) =>
      (store.review.review as IReview[])?.find((item) => item.id === +id),
    shallowEqual
  );

  const initialState = {
    rate: currentReview?.rate || 0,
  };

  const [data, setData] = useState(initialState);

  const handleClose = () => {
    dispatch(setIsFadingOut(true));
    setTimeout(() => {
      onClose();
      dispatch(setIsFadingOut(false));
    }, 300);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 5 + "px";
    }

    const handleInput = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 5 + "px";
      }
    };

    const currentTextareaRef = textareaRef.current;
    currentTextareaRef?.addEventListener("input", handleInput);

    return () => {
      currentTextareaRef?.removeEventListener("input", handleInput);
    };
  }, []);

  const getTheme = () => {
    return localStorage.getItem("selected-theme");
  };

  const currentTheme = getTheme();

  const [comment, setComment] = useState(
    currentReview?.comment ? currentReview.comment : ""
  );

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      changeReview({
        productId: currentReview?.product.id || 0,
        comment,
        rate: data.rate,
      })
    );
    history.goBack();
  };

  return (
    <>
      <div className="modal-content__container">
        <i
          className="ri-close-line modal-content__cross"
          onClick={handleClose}
        />
        <form className="modal-content__form" onSubmit={handleComment}>
          <div>
            <h3 className="section__title-center">{t("My review")}</h3>
            <textarea
              ref={textareaRef}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("Leave review")}
              className={`my-review__textarea ${currentTheme === "dark" ? "my-review__textarea-dark" : null}`}
              value={comment}
            ></textarea>
            <div className="my-review__rate">
              <p className="review__text">{t("My rate")}:</p>
              <StarRatings
                rating={data?.rate ? data.rate : 0}
                changeRating={(rate) => setData({ rate: rate })}
                starRatedColor="orange"
                starDimension="25px"
                starSpacing="2px"
                numberOfStars={5}
                name="rating"
              />
            </div>
          </div>
          <Button buttonStyle="edit" textContent={t("Edit")} fixed />
        </form>
      </div>
    </>
  );
};

export default EditReview;
