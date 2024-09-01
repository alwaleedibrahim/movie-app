import React, { useEffect, useState } from "react";
import axiosiInstance from "../../api/axios";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(499);
  const navigator = useNavigate()

  function setPageFormChild(value) {
    setPage(value);
    console.log("set page from child", page);
  }
  useEffect(() => {
    axiosiInstance
      .get(`movie/popular?page=${page}`)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [page]);
  return (
    <>
      {movies && movies.length > 0 ? (
        movies.map((d, index) => {
          return (
            <li key={index} onClick={()=> navigator(`${d.id}`)}>
              <h2>{d.title}</h2>
              <h3>{Math.round(d.vote_average * 10) / 10}</h3>
            </li>
          );
        })
      ) : (
        <h2>No products found</h2>
      )}
      <PaginationComponent
        currentPage={page}
        handlePageChange={setPageFormChild}
      />
    </>
  );
}

function PaginationComponent(props) {
  const [page, setPage] = useState({});

  function handleClick(value) {
    console.log("click");
    props.handlePageChange(value);
    setPage({ ...page, current: value });
  }
  useEffect(() => {
    setPage({
      first: 1,
      last: 500,
      current: props.currentPage,
    });
  }, []);
  return (
    <Pagination>
      <Pagination.First onClick={() => handleClick(page.first)} />
      <Pagination.Prev onClick={() => handleClick(page.current - 1)} />
      {page.current != page.first && (
        <Pagination.Item onClick={() => handleClick(page.first)}>
          {page.first}
        </Pagination.Item>
      )}
      {page.current - 2 > page.first && <Pagination.Ellipsis />}

      {page.current - 2 > page.first && (
        <Pagination.Item onClick={() => handleClick(page.current - 2)}>
          {page.current - 2}
        </Pagination.Item>
      )}
      {page.current - 1 > page.first && (
        <Pagination.Item onClick={() => handleClick(page.current - 1)}>
          {page.current - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page.current}</Pagination.Item>
      {page.current + 1 < page.last && (
        <Pagination.Item onClick={() => handleClick(page.current + 1)}>
          {page.current + 1}
        </Pagination.Item>
      )}
      {page.current + 2 < page.last && (
        <Pagination.Item onClick={() => handleClick(page.current + 2)}>
          {page.current + 2}
        </Pagination.Item>
      )}

      {page.current + 2 < page.last && <Pagination.Ellipsis />}
      {page.current != page.last && (
        <Pagination.Item onClick={() => handleClick(page.last)}>
          {page.last}
        </Pagination.Item>
      )}
      <Pagination.Next onClick={() => handleClick(page.current + 1)} />
      <Pagination.Last onClick={() => handleClick(page.last)} />
    </Pagination>
  );
}
