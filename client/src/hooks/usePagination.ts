import { useState } from "react";
import { IProduct } from "../types/product";

const usePagination = (products: IProduct[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(products.length / itemsPerPage);

  const currentProducts = () => {
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

  return { next, prev, jump, currentProducts, currentPage, maxPage };
};

export default usePagination;
