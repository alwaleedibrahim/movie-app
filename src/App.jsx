import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.config";
import LanguageContext from "./contexts/language.context";
import ThemeContext from "./contexts/theme.context";

function App() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark")

  return (
    <>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <ThemeContext.Provider value={{theme, setTheme}}>
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
