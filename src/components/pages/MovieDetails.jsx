import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosiInstance from "../../api/axios";
import { Button } from "react-bootstrap";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const navigator = useNavigate()

  
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
  return <>
  <div>MovieDetails ID: {id}</div>
  <div>{movie.title}</div>
  <Button variant="secondary" onClick={()=>{navigator("/movies")}}>Back to movies</Button>
  </>
}
