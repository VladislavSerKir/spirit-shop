import React, { useState } from "react";

export const ScrollUp = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled >= 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={visible ? "scrollup show-scroll" : "scrollup"}
      id="scroll-up"
      type="button"
      onClick={scrollToTop}
    >
      <i className="ri-arrow-up-fill scrollup__icon" />
    </button>
  );
};
