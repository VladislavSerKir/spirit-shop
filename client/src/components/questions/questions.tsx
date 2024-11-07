import { useTranslation } from "react-i18next";

export const Questions = () => {
  const { t } = useTranslation();

  const accordionItems = document.querySelectorAll(".questions__item");
  accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector(".questions__header");

    accordionHeader?.addEventListener("click", () => {
      const openItem = document.querySelector(".accordion-open");

      toggleItem(item);

      if (openItem && openItem !== item) {
        toggleItem(openItem);
      }
    });
  });

  const toggleItem = (item: any) => {
    const accordionContent = item.querySelector(".questions__content");

    if (item.classList.contains("accordion-open")) {
      accordionContent?.removeAttribute("style");
      item.classList.remove("accordion-open");
    } else {
      if (accordionContent) {
        accordionContent.style.height = accordionContent?.scrollHeight + "px";
        item.classList.add("accordion-open");
      }
    }
  };

  return (
    <section className="questions section" id="faqs">
      <h2 className="section__title-center questions__title container">
        {t("Some common questions were often asked")}
      </h2>

      <div className="questions__container container grid">
        <div className="questions__group">
          <div className="questions__item">
            <header className="questions__header">
              <i className="ri-add-line questions__icon"></i>
              <h3 className="questions__item-title">
                {t("My flowers are falling off or dying?")}
              </h3>
            </header>

            <div className="questions__content">
              <p className="questions__description">
                Plants are easy way to add color energy and transform your space
                but which planet is for you. Choosing the right plant.
              </p>
            </div>
          </div>

          <div className="questions__item">
            <header className="questions__header">
              <i className="ri-add-line questions__icon"></i>
              <h3 className="questions__item-title">
                {t("What causes leaves to become pale?")}
              </h3>
            </header>

            <div className="questions__content">
              <p className="questions__description">
                Plants are easy way to add color energy and transform your space
                but which planet is for you. Choosing the right plant.
              </p>
            </div>
          </div>

          <div className="questions__item">
            <header className="questions__header">
              <i className="ri-add-line questions__icon"></i>
              <h3 className="questions__item-title">
                {t("What causes brown crispy leaves?")}
              </h3>
            </header>

            <div className="questions__content">
              <p className="questions__description">
                Plants are easy way to add color energy and transform your space
                but which planet is for you. Choosing the right plant.
              </p>
            </div>
          </div>
        </div>

        <div className="questions__group">
          <div className="questions__item">
            <header className="questions__header">
              <i className="ri-add-line questions__icon"></i>
              <h3 className="questions__item-title">
                {t("How do i choose a plant?")}
              </h3>
            </header>

            <div className="questions__content">
              <p className="questions__description">
                Plants are easy way to add color energy and transform your space
                but which planet is for you. Choosing the right plant.
              </p>
            </div>
          </div>

          <div className="questions__item">
            <header className="questions__header">
              <i className="ri-add-line questions__icon"></i>
              <h3 className="questions__item-title">
                {t("How do I change the pots?")}
              </h3>
            </header>

            <div className="questions__content">
              <p className="questions__description">
                Plants are easy way to add color energy and transform your space
                but which planet is for you. Choosing the right plant.
              </p>
            </div>
          </div>

          <div className="questions__item">
            <header className="questions__header">
              <i className="ri-add-line questions__icon"></i>
              <h3 className="questions__item-title">
                {t("Why are gnats flying around my plant?")}
              </h3>
            </header>

            <div className="questions__content">
              <p className="questions__description">
                Plants are easy way to add color energy and transform your space
                but which planet is for you. Choosing the right plant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
