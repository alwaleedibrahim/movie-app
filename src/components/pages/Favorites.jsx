import { Button, Card, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import stringManager from "../../utils/stringManager";
import { toggleFav } from "../../store/slices/fav.slice";
import { useContext } from "react";
import LanguageContext from "../../contexts/language.context";

export default function Favorites() {
  const fav = useSelector(state => state.fav)  
  const { language } = useContext(LanguageContext);
  const dispach = useDispatch()

  return (
    <Container>
        <Row>
          {fav.favorites && fav.favorites.length > 0 ? (
            fav.favorites.map((d, index) => {
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
    </Container>
  )
}
