import card1 from "../../assets/img/card1.png";
import card2 from "../../assets/img/card2.png";
import card3 from "../../assets/img/card3.png";
import card4 from "../../assets/img/card4.png";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer section">
      <div className="footer__container container grid">
        <div className="footer__content">
          <a href="#/" className="footer__logo">
            <i className="ri-leaf-line footer__logo-icon"></i> Plantex
          </a>

          <h3 className="footer__title">
            {t("Subscribe to our newsletter to stay update")}
          </h3>

          <div className="footer__subscribe">
            <input
              type="email"
              placeholder={t("Enter your email")}
              className="footer__input"
            />

            <button className="button button--flex footer__button">
              {t("Subscribe")}
              <i className="ri-arrow-right-up-line button__icon"></i>
            </button>
          </div>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">{t("Our Address")}</h3>

          <ul className="footer__data">
            <li className="footer__information">1234 - Peru</li>
            <li className="footer__information">La Libertad - 43210</li>
            <li className="footer__information">123-456-789</li>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">{t("Contact Us")}</h3>

          <ul className="footer__data">
            <li className="footer__information">+999 888 777</li>

            <div className="footer__social">
              <a
                href="https://www.facebook.com/"
                className="footer__social-link"
              >
                <i className="ri-facebook-fill"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                className="footer__social-link"
              >
                <i className="ri-instagram-line"></i>
              </a>
              <a href="https://twitter.com/" className="footer__social-link">
                <i className="ri-twitter-fill"></i>
              </a>
            </div>
          </ul>
        </div>

        <div className="footer__content">
          <h3 className="footer__title">{t("We accept all credit cards")}</h3>

          <div className="footer__cards">
            <img src={card1} alt="card1" className="footer__card" />
            <img src={card2} alt="card2" className="footer__card" />
            <img src={card3} alt="card3" className="footer__card" />
            <img src={card4} alt="card4" className="footer__card" />
          </div>
        </div>
      </div>

      <p className="footer__copy">&#169; Bedimcode. All rigths reserved</p>
    </footer>
  );
};
