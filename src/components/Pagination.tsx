import { Pagination } from 'react-bootstrap';
import React, { useState } from 'react';
interface Props {
  totalPage: Number;
  onChangePage: (pageSelect: Number) => void;
  isLoading: boolean;
}
const PaginationCustom = (props: Props) => {
  const pageItem = Array.from(Array(props.totalPage).keys());

  return (
    <Pagination>
      {pageItem.map((el) => {
        return (
          <Pagination.Item
            disabled={props.isLoading ? true : false}
            onClick={() => props.onChangePage(el + 1)}
            key={el}
          >
            {el + 1}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default PaginationCustom;
