import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../contexts/language.context";
import stringManager from "../../utils/stringManager";

export default function Footer() {
  const {language} = useContext(LanguageContext)
  
  return (
    <footer className="py-2 mt-3 mb-0">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item">
          <Link to="/"  className="nav-link px-2 text-muted">{stringManager.home[language]}</Link>
        </li>
        <li className="nav-item">
          <Link to="/movies"  className="nav-link px-2 text-muted">{stringManager.movies[language]}</Link>
        </li>
      </ul>
      <p className="text-center text-muted">&copy; 2024 {stringManager.brand[language]}</p>
      <p className="text-center text-muted">&hearts; {stringManager.builtBy[language]}</p>
    </footer>
  );
}
