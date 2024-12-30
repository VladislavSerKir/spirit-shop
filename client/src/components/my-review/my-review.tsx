import React, { useRef, useState } from "react";
import { useTypedDispatch } from "../../types";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { IReview } from "../../types/store/reviewStoreType";
import { commentProduct } from "../../store/actions/reviewAction";
import Button from "../../shared/button/button";

interface IMyReviewProps {
  review: IReview[];
}

const MyReview = ({ review }: IMyReviewProps) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
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

  const [comment, setComment] = useState(review[0]?.comment || "");

  const handleComment = () => {
    dispatch(commentProduct({ productId: review[0]?.product?.id, comment }));
    setComment("");
  };

  return (
    <div className="my-review__content">
      <h3 className="section__title-center">{t("My review")}</h3>
      <textarea
        ref={textareaRef}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("Leave review")}
        className={`my-review__textarea ${currentTheme === "dark" ? "my-review__textarea-dark" : null}`}
      ></textarea>
      {review[0]?.rate ? (
        <div className="my-review__rate">
          <p className="review__text">{t("My rate")}:</p>
          <StarRatings
            rating={review[0].rate}
            starRatedColor="orange"
            starDimension="20px"
            starSpacing="2px"
            numberOfStars={5}
            name="rating"
          />
        </div>
      ) : null}
      <Button
        buttonStyle="arrow-down"
        textContent={t("Leave review")}
        buttonHandler={() => handleComment()}
      />
    </div>
  );
};

export default MyReview;
