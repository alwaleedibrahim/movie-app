import { useContext, useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import "./Movies.css";
import LanguageContext from "../../contexts/language.context";
import stringManager from "../../utils/stringManager";
import PaginationComponent from "../partials/pagination";
import PageContext from "../../contexts/page.context";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../../store/slices/fav.slice";
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const navigator = useNavigate();
  const { language } = useContext(LanguageContext);
  const { page, setPage } = useContext(PageContext);
  const response = useLoaderData();
  const [URLSearchParams] = useSearchParams();

  const dispach = useDispatch();
  const fav = useSelector(state => state.fav)


  useEffect(() => {
    const currentPage = Number(URLSearchParams.get("page")) || 1;
    if (currentPage != page) {
      setPage(currentPage);
    }
  }, []);

  useEffect(() => {
    navigator(`/movies?page=${page}`);
    setMovies(response.data.results);
    console.log(response.data);
    console.log("useEffect");
  }, [page, URLSearchParams]);
  console.log(page, language);

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
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${d.poster_path}`}
                    onClick={() => navigator(`${d.id}`)}
                  />
                  <Card.Body>
                    <Card.Title onClick={() => navigator(`${d.id}`)}>
                      {d.title}
                    </Card.Title>
                    <Card.Text>
                      <span className="star">&#9733;</span>
                      {Math.round(d.vote_average * 10) / 10}{" "}
                      {/* {d.fav && <Button variant="outline-danger" className="py-1 mx-3 fs-5">&hearts;</Button>} */}
                      <Button
                        variant={fav.favorites?.find(f=>f.id == d.id)? "danger": "outline-danger"}
                        className="py-1 mx-3 fs-5"
                        onClick={() => {
                          dispach(toggleFav({ ...d }));
                        }}
                      >
                        &hearts;
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <h2>{stringManager.loading[language]}</h2>
          )}
        </Row>
        <Row>
          <PaginationComponent />
        </Row>
      </Container>
    </>
  );
}
