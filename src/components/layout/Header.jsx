import { useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { Button } from "react-bootstrap";
import LanguageContext from "../../contexts/language.context";
import stringManager from "../../utils/stringManager";
import ThemeContext from "../../contexts/theme.context";
import UserContext from "../../contexts/user.context";
import toast from "react-hot-toast";

export default function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  function logout() {
    setUser({});
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  }

  return (
    <Container fluid className="p-0">
      <Navbar>
        <Container
          fluid
          style={{ flexDirection: language == "ar" ? "row-reverse" : "row" }}
        >
          <NavLink to="/" className={["navbar-brand"]}>
            {stringManager.brand[language]}
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className={["nav-link"]}>
              {stringManager.home[language]}
            </NavLink>
            <NavLink to="/movies" className={["nav-link"]}>
              {stringManager.movies[language]}
            </NavLink>
            <NavLink to="/favorites" className={["nav-link"]}>
              {stringManager.favorites[language]}
            </NavLink>
          </Nav>
          <Nav className="mx-3">
            {user.token ? (
              <Button variant="outline-danger" onClick={logout}>
                {stringManager.logout[language]}
              </Button>
            ) : (
              <NavLink to="/login" className={["nav-link"]}>
                {stringManager.login[language]}
              </NavLink>
            )}
          </Nav>
          <Button
            variant={theme == "light" ? "outline-dark" : "outline-info"}
            onClick={toggleTheme}
          >
            {theme == "light" ? <>&#127769;</> : <>&#9788;</>}
          </Button>
          <Button
            variant="outline-info"
            onClick={() => setLanguage(language == "en" ? "ar" : "en")}
          >
            &#127758; {language == "en" ? "ع" : "EN"}
          </Button>
        </Container>
      </Navbar>
    </Container>
  );
}
