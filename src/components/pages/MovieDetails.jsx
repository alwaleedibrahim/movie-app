import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";

import "./Movies.css";
import LanguageContext from "../../contexts/language.context";
import stringManager from "../../utils/stringManager";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../../store/slices/movieDetails.slice";

export default function MovieDetails() {
  const { id } = useParams();
  const movie = useSelector((state) => state.movie.movie);
  const status = useSelector((state) => state.movie.status);
  const navigator = useNavigate();
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieById(id));
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <>
      {status == "succeeded" && (
        <Container>
          <Row className="my-5">
            <Col>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
            </Col>
            <Col>
              <h2 className="my-3">{movie.title}</h2>
              <p>
                <span className="star">&#9733;</span>
                {Math.round(movie.vote_average * 10) / 10} ({movie.vote_count})
              </p>
              <ButtonGroup className="my-3">
                {movie.genres &&
                  movie.genres.map((g, index) => {
                    return (
                      <Button variant="outline-info" key={index}>
                        {g.name}
                      </Button>
                    );
                  })}
              </ButtonGroup>
              <p>{movie.overview}</p>
              {movie.production_companies &&
                movie.production_companies.map((c, index) => {
                  return (
                    c.logo_path && (
                      <div className="logo" key={index}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${c.logo_path}`}
                        />
                      </div>
                    )
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
      )}
    </>
  );
}
