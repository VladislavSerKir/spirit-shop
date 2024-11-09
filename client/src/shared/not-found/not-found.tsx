import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="not-found__page">
        <h2 className="section__title-center">{t("Page not found")}</h2>
      </div>
    </>
  );
};
