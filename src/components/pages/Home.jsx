import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import "./Home.css"
import { Link } from "react-router-dom";
import LanguageContext from "../../contexts/language.context";
import stringManager from "../../utils/stringManager";

export default function Home() {
  const {language} = useContext(LanguageContext)
  return (
    <>
      <section className="p-5">
        <div>
          <h2>{stringManager.welcome[language]}</h2>
          <h3>
          {stringManager.intro[language]}
          </h3>
          <Link className="btn btn-outline-info my-3" to="/movies">{stringManager.explore[language]}</Link>
        </div>
      </section>
    </>
  );
}
