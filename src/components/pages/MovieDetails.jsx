import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosiInstance from "../../api/axios";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";

import "./Movies.css";
import LanguageContext from "../../contexts/language.context";
import stringManager from "../../utils/stringManager";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const navigator = useNavigate();
  const {language} = useContext(LanguageContext)

  useEffect(() => {
    axiosiInstance
      .get(`movie/${id}`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <Container>
        <Row className="my-5">
          <Col>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          </Col>
          <Col>
            <h2 className="my-3">{movie.title}</h2>
            <p>
              <span className="star">&#9733;</span>
              {Math.round(movie.vote_average * 10) / 10} ({movie.vote_count})
            </p>
            <ButtonGroup className="my-3">
              {movie.genres &&
                movie.genres.map((g) => {
                  return (
                    <>
                      <Button variant="outline-info">{g.name}</Button>
                    </>
                  );
                })}
            </ButtonGroup>
            <p>{movie.overview}</p>
            {movie.production_companies &&
              movie.production_companies.map((c) => {
                return (
                  <>
                    {c.logo_path && (
                      <div className="logo">
                        <img
                    
                          src={`https://image.tmdb.org/t/p/w500/${c.logo_path}`}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="outline-info"
                  onClick={() => {
                    navigator("/movies");
                  }}
                  className="my-5"
                >
                  {stringManager.backToMovies[language]}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
