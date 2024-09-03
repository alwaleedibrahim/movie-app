import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./Main.css";
import LanguageContext from "../../contexts/language.context";
import ThemeContext from "../../contexts/theme.context";

export default function Main() {
  const {language} = useContext(LanguageContext)
  const {theme} = useContext(ThemeContext)
  return (
    <>
        <div className="main" dir={language == 'en'? 'ltr' : 'rtl'} data-bs-theme={theme}>
          <Header />
          <Outlet />
          <Footer />
        </div>
    </>
  );
}
