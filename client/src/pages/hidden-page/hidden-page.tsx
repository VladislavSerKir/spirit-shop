import { useTranslation } from "react-i18next";
import Hidden from "../../assets/img/hidden.png";
import { BackButton } from "../../components/back-button/back-button";

export const HiddenPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="hidden-page">
        <BackButton />
        <img src={Hidden} alt="shoppingCart" className="hidden-page__image" />
        <h2 className="section__title-center">{t("User hidden page")}</h2>
      </div>
    </>
  );
};
