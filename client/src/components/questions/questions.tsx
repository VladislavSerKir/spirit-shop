import { useTranslation } from "react-i18next";
import Accordeon from "../../shared/hoc/accordeon/accordeon";

export const Questions = () => {
  const { t } = useTranslation();

  const accordionItems =
    document.querySelectorAll<HTMLElement>(".questions__item");
  accordionItems.forEach((item) => {
    const accordionHeader =
      item.querySelector<HTMLElement>(".questions__header");

    accordionHeader?.addEventListener("click", () => {
      const openItem = document.querySelector<HTMLElement>(".accordion-open");

      toggleItem(item);

      if (openItem && openItem !== item) {
        toggleItem(openItem);
      }
    });
  });

  const toggleItem = (item: HTMLElement) => {
    const accordionContent = item.querySelector<HTMLElement>(
      ".questions__content"
    );

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

  const questions = [
    {
      question: "My flowers are falling off or dying?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
    },
    {
      question: "What causes leaves to become pale?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
    },
    {
      question: "What causes brown crispy leaves?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
    },
    {
      question: "How do i choose a plant?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
    },
    {
      question: "How do I change the pots?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
    },
    {
      question: "Why are gnats flying around my plant?",
      answer:
        "Plants are easy way to add color energy and transform your space but which planet is for you. Choosing the right plant.",
    },
  ];

  return (
    <section className="questions section" id="faqs">
      <h2 className="section__title-center questions__title container">
        {t("Some common questions were often asked")}
      </h2>

      <div className="questions__container container grid">
        <div className="questions__group">
          {questions
            .filter((item, index) => index % 2 === 0)
            .map((item, i) => (
              <Accordeon title={item.question} content={item.answer} key={i} />
            ))}
        </div>

        <div className="questions__group">
          {questions
            .filter((item, index) => index % 2 !== 0)
            .map((item, i) => (
              <Accordeon title={item.question} content={item.answer} key={i} />
            ))}
        </div>
      </div>
    </section>
  );
};
