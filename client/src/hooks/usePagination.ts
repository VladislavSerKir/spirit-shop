import { useState } from "react";
import { GenericObject } from "../types";

const usePagination = (products: GenericObject, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(products.length / itemsPerPage);

  const showCurrentEntity = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return products.slice(begin, end);
  };

  const next = () => {
    setCurrentPage((prevState) => Math.min(prevState + 1, maxPage));
    document
      .querySelector(".accordeon__container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const prev = () => {
    setCurrentPage((prevState) => Math.max(prevState - 1, 1));
    document
      .querySelector(".accordeon__container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
    document
      .querySelector(".accordeon__container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return { next, prev, jump, showCurrentEntity, currentPage, maxPage };
};

export default usePagination;
