import history from "../../utils/history";

export const BackButton = () => {
  const handlerGoBack = () => {
    history.goBack();
  };

  return (
    <button
      className={"back-button show-back-button"}
      id="scroll-up"
      type="button"
      onClick={handlerGoBack}
    >
      <i className="ri-arrow-left-fill back-button__icon" />
    </button>
  );
};
