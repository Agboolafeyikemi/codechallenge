import React, { useState, useEffect } from "react";

import { Pagination } from "antd";

export const PaginationComponent = (props) => {
  const { products } = props;
  const [offset, setOffset] = useState(0);
  const [currentPageElements, setCurrentPageElements] = useState([]);
  const [elementsPerPage, setElementsPerPage] = useState(15);
  const [pagesCount, setPagesCount] = useState(1);
  const [allElements, setAllElements] = useState(products);
  const [totalElementsCount, setTotalElementsCount] = useState(0);

  useEffect(() => {
    setPaginationStates();
  }, []);
  const setPaginationStates = () => {
    // const { totalElementsCount, elementsPerPage } = this.state;
    // console.log(
    //   totalElementsCount,
    //   elementsPerPage,
    //   "\n\n\n\n\n\n\n setPaginationStates WAS CALED \n\n\n\n\n\n\n\n\n\n"
    // );
    setPagesCount();
    this.setState(
      { pagesCount: Math.ceil(totalElementsCount / elementsPerPage) },
      () => {
        setElementsForCurrentPage();
      }
    );
  };

  const setElementsForCurrentPage = () => {
    console.log(
      allElements,
      offset,
      elementsPerPage,
      "\n\n\n\n\n\n\n  setElementsForCurrentPage WAS  setElementsForCurrentPage CALED \n\n\n\n\n\n\n\n\n\n"
    );
    const currentPageElements = allElements.slice(
      offset,
      offset + elementsPerPage
    );
    setCurrentPageElements(currentPageElements);
  };

  const handlePageClick = (pageNumber) => {
    const currentPage = pageNumber - 1;
    const offset = currentPage * elementsPerPage;
    setOffset(() => {
      this.setElementsForCurrentPage();
    });
  };
  return (
    <Pagination
      total={products.length}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={3}
      defaultCurrent={1}
      pageSize={elementsPerPage}
      onChange={handlePageClick}
    />
  );
};
