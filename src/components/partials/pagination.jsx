/* eslint-disable react/prop-types */
import { useContext } from "react";
import {  Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageContext from "../../contexts/page.context";

export default function PaginationComponent() {
  const {page, setPage} = useContext(PageContext);
  const navigator = useNavigate();
    const pageMap = {
        first: 1,
        last: 500
    }
  
  function handleClick(value) {
    setPage(value);
    navigator(`/movies?page=${value}`);
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(pageMap.first)} />
      {page != pageMap.first && (
        <Pagination.Prev onClick={() => handleClick(page - 1)} />
      )}
      {page != pageMap.first && (
        <Pagination.Item onClick={() => handleClick(pageMap.first)}>
          {pageMap.first}
        </Pagination.Item>
      )}
      {page - 2 > pageMap.first && <Pagination.Ellipsis />}

      {page - 2 > pageMap.first && (
        <Pagination.Item onClick={() => handleClick(page - 2)}>
          {page - 2}
        </Pagination.Item>
      )}
      {page - 1 > pageMap.first && (
        <Pagination.Item onClick={() => handleClick(page - 1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {page + 1 < pageMap.last && (
        <Pagination.Item onClick={() => handleClick(page + 1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {page + 2 < pageMap.last && (
        <Pagination.Item onClick={() => handleClick(page + 2)}>
          {page + 2}
        </Pagination.Item>
      )}

      {page + 2 < pageMap.last && <Pagination.Ellipsis />}
      {page != pageMap.last && (
        <Pagination.Item onClick={() => handleClick(pageMap.last)}>
          {pageMap.last}
        </Pagination.Item>
      )}
      {page != pageMap.last && (
        <Pagination.Next onClick={() => handleClick(page + 1)} />
      )}
      <Pagination.Last onClick={() => handleClick(pageMap.last)} />
    </Pagination>
  );
}
