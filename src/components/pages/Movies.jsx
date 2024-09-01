import React, { useEffect, useState } from "react";
import axiosiInstance from "../../api/axios";
import { Container, Pagination, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigator = useNavigate();

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
      <Container>
        <Row>
          {movies && movies.length > 0 ? (
            movies.map((d, index) => {
              return (
                <Card
                  style={{ width: "18rem" }}
                  border="info"
                  className="m-3"
                  key={index}
                  onClick={() => navigator(`${d.id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${d.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{d.title}</Card.Title>
                    <Card.Text>
                      <span className="star">&#9733;</span>
                      {Math.round(d.vote_average * 10) / 10}{" "}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <h2>No products found</h2>
          )}
        </Row>
        <Row>
          <PaginationComponent
            currentPage={page}
            handlePageChange={setPageFormChild}
          />
        </Row>
      </Container>
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
      {page.current != page.first && (<Pagination.Prev onClick={() => handleClick(page.current - 1)} /> )}
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
      {page.current != page.last && (<Pagination.Next onClick={() => handleClick(page.current + 1)} />)}
      <Pagination.Last onClick={() => handleClick(page.last)} />
    </Pagination>
  );
}
