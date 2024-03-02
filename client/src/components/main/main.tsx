import React from "react";
import { Home } from "../home/home";
import { About } from "../about/about";
import { Products } from "../products/products";
import { Questions } from "../questions/questions";
import { Steps } from "../steps/steps";
import { Contact } from "../contact/contact";

export const Main = () => {
  return (
    <div className="main">
      <Home />
      <About />
      <Steps />
      <Products />
      <Questions />
      <Contact />
    </div>
  );
};
