import { useTranslation } from "react-i18next";

export const Steps = () => {
  const { t } = useTranslation();

  return (
    <section className="steps section container">
      <div className="steps__bg">
        <h2 className="section__title-center steps__title">
          {t("Steps to start your plants off right")}
        </h2>

        <div className="steps__container grid">
          <div className="steps__card">
            <div className="steps__card-number">01</div>
            <h3 className="steps__card-title">{t("Choose Plant")}</h3>
            <p className="steps__card-description">
              {t("We have several varieties plants you can choose from.")}
            </p>
          </div>

          <div className="steps__card">
            <div className="steps__card-number">02</div>
            <h3 className="steps__card-title">{t("Place an order")}</h3>
            <p className="steps__card-description">
              {t(
                "Once your order is set, we move to the next step which is the shipping."
              )}
            </p>
          </div>

          <div className="steps__card">
            <div className="steps__card-number">03</div>
            <h3 className="steps__card-title">{t("Get plants delivered")}</h3>
            <p className="steps__card-description">
              {t(
                "Our delivery process is easy, you receive the plant direct to your door."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
