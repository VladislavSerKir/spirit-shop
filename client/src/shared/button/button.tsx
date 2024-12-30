interface IButton {
  buttonStyle:
    | "edit"
    | "add"
    | "close"
    | "toggle"
    | "arrow-down"
    | "arrow-up"
    | "cart"
    | "yandex"
    | "google";
  buttonType?: "submit" | "reset" | "button" | undefined;
  textContent?: string;
  buttonHandler?: (arg?: any) => void;
  to?: string;
  fixed?: boolean;
}

const Button = ({
  buttonStyle,
  buttonType,
  textContent,
  buttonHandler,
  to,
  fixed,
}: IButton) => {
  return (
    <>
      {to ? (
        <a href={to} className="button button--flex">
          {textContent}
          <i className="ri-arrow-right-down-line button__icon"></i>
        </a>
      ) : (
        <button
          className={`button button--flex button--gap my-review__submit ${fixed ? "modal-content__button" : ""} ${buttonStyle === "yandex" ? "button__yandex" : ""} ${buttonStyle === "google" ? "button__google" : ""}`}
          type={buttonType ? buttonType : "submit"}
          onClick={() => buttonHandler && buttonHandler()}
        >
          {textContent ? textContent : null}
          {buttonStyle === "edit" ? (
            <i className="ri-pencil-line button__icon" />
          ) : buttonStyle === "add" ? (
            <i className="ri-add-line button__icon" />
          ) : buttonStyle === "close" ? (
            <i className="ri-close-line button__icon" />
          ) : buttonStyle === "toggle" ? (
            <i className="ri-arrow-left-right-line button__icon" />
          ) : buttonStyle === "arrow-down" ? (
            <i className="ri-arrow-right-down-line button__icon" />
          ) : buttonStyle === "arrow-up" ||
            buttonStyle === "yandex" ||
            buttonStyle === "google" ? (
            <i className="ri-arrow-right-up-line button__icon" />
          ) : buttonStyle === "cart" ? (
            <i className="ri-shopping-cart-2-line button__icon" />
          ) : null}
        </button>
      )}
    </>
  );
};

export default Button;
