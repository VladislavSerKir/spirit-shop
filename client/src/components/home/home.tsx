import homeImg from "../../assets/img/home.png";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <section className="home" id="home">
      <div className="home__container container grid">
        <img src={homeImg} alt="home" className="home__img" />

        <div className="home__data">
          <h1 className="home__title">
            {t("Plants will make your life better")}
          </h1>
          <p className="home__description">
            {t(
              "Create incredible plant design for your offices or apastaments. Add fresness to your new ideas."
            )}
          </p>
          <a href="#about" className="button button--flex">
            {t("Explore")}{" "}
            <i className="ri-arrow-right-down-line button__icon"></i>
          </a>
        </div>

        <div className="home__social">
          <span className="home__social-follow">{t("Follow Us")}</span>

          <div className="home__social-links">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="home__social-link"
            >
              <i className="ri-facebook-fill"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="home__social-link"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="home__social-link"
            >
              <i className="ri-twitter-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
