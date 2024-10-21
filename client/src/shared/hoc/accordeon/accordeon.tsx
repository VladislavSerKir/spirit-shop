import React, { useEffect, useState, useRef } from "react";
import { ICategory } from "../../../types/productType";

interface IAccordeon {
  title: string;
  content?: string;
  categories: Array<ICategory>;
  onCategorySelected: Function;
}

const Accordeon = ({
  title,
  content,
  categories,
  onCategorySelected,
}: IAccordeon) => {
  const [active, setActive] = useState(false);
  const [id, setId] = useState<string>();
  const divRef = useRef<any>();

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = active
        ? `${divRef.current.scrollHeight}px`
        : "0px";
    }
  }, [active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  const handleClick = (categoryId: string) => {
    if (id === categoryId) {
      setId("");
      onCategorySelected();
    } else {
      setId(categoryId);
      onCategorySelected(categoryId);
    }
  };

  return (
    <div className={`questions__item${active ? " accordion-open" : ""}`}>
      <header className="questions__header" onClick={toggleAccordion}>
        <i className="ri-add-line questions__icon" />
        <h3 className="questions__item-title">{title}</h3>
      </header>

      <div className="questions__content" ref={divRef}>
        {content ? <p className="questions__description">{content}</p> : null}

        <div className="container-center">
          {categories &&
            categories.map((category: ICategory) => (
              <button
                className={`product__find-category ${
                  String(category.id) === id ? "product__active" : ""
                }`}
                key={category.id}
                type="button"
                onClick={() => handleClick(String(category.id))}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Accordeon;
