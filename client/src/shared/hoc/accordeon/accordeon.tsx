import React, {
  useEffect,
  useState,
  useRef,
  LegacyRef,
  RefObject,
  MutableRefObject,
} from "react";

interface IAccordeon {
  title: string;
  content?: string;
  categoryProducts: Array<ICategoryProduct>;
  onCategorySelected: Function;
}

interface ICategoryProduct {
  _id: string;
  name: string;
}

const Accordeon = ({
  title,
  content,
  categoryProducts,
  onCategorySelected,
}: IAccordeon) => {
  const [active, setActive] = useState(false);
  const [id, setId] = useState("");
  const divRef = useRef<HTMLDivElement>();

  //   useEffect(() => {
  //     divRef.current.style.height = active
  //       ? `${divRef.current.scrollHeight}px`
  //       : "0px";
  //   }, [active]);

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

      {/* <div className="questions__content" ref={divRef}> */}
      <div className="questions__content">
        {content ? <p className="questions__description">{content}</p> : null}

        <div className="container-center">
          {categoryProducts &&
            categoryProducts.map((p: ICategoryProduct) => (
              <button
                className={`product__find-category ${
                  p._id === id ? "product__active" : ""
                }`}
                key={p._id}
                type="button"
                onClick={() => handleClick(p._id)}
              >
                {p.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Accordeon;
