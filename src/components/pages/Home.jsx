import React from "react";
import Button from "react-bootstrap/Button";
import "./Home.css"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="p-5">
        <div>
          <h2>Welcome</h2>
          <h3>
            Millions of movies, TV shows and people to discover. 
          </h3>
          <Link className="btn btn-outline-info my-3" to="/movies">Explore Now</Link>
        </div>
      </section>
    </>
  );
}
