import React from "react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section className="contact section container" id="contact">
      <div className="contact__container grid">
        <div className="contact__box">
          <h2 className="section__title">
            Reach out to us today <br /> via any of the given <br /> information
          </h2>

          <div className="contact__data">
            <div className="contact__information">
              <h3 className="contact__subtitle">
                Call us htmlFor instant support
              </h3>
              <span className="contact__description">
                <i className="ri-phone-line contact__icon"></i>
                +999 888 777
              </span>
            </div>

            <div className="contact__information">
              <h3 className="contact__subtitle">Write us by mail</h3>
              <span className="contact__description">
                <i className="ri-mail-line contact__icon"></i>
                user@email.com
              </span>
            </div>
          </div>
        </div>

        <form action="" className="contact__form">
          <div className="contact__inputs">
            <div className="contact__content">
              <input type="email" placeholder=" " className="contact__input" />
              <label htmlFor="" className="contact__label">
                {t("Email")}
              </label>
            </div>

            <div className="contact__content">
              <input type="text" placeholder=" " className="contact__input" />
              <label htmlFor="" className="contact__label">
                Subject
              </label>
            </div>

            <div className="contact__content contact__area">
              <textarea
                name="message"
                placeholder=" "
                className="contact__input"
              ></textarea>
              <label htmlFor="" className="contact__label">
                Message
              </label>
            </div>
          </div>

          <button className="button button--flex">
            Send Message
            <i className="ri-arrow-right-up-line button__icon"></i>
          </button>
        </form>
      </div>
    </section>
  );
};
