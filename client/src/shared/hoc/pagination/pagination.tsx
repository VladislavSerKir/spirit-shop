import React from "react";

interface IPaginationProps {
  jump: Function;
  next: Function;
  prev: Function;
  maxPage: number;
  currentPage: number;
}

const Pagination = ({
  jump,
  next,
  prev,
  maxPage,
  currentPage,
}: IPaginationProps) => {
  const pages = [];

  const getStyles = (page: number) =>
    `page__numbers ${currentPage === page ? "active" : ""}`;

  for (let i = 1; i < maxPage + 1; i++) {
    pages.push(
      <li className={getStyles(i)} onClick={() => jump(i)} key={`key${i ** 2}`}>
        {i}
      </li>
    );
  }

  return (
    <div className="pagination-container">
      <ul className="page">
        <li className="page__btn" onClick={() => prev()}>
          <span>
            <i className="ri-arrow-left-s-line" />
          </span>
        </li>
        {pages}
        <li className="page__btn" onClick={() => next()}>
          <span>
            <i className="ri-arrow-right-s-line" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
