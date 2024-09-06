import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.config";
import LanguageContext from "./contexts/language.context";
import ThemeContext from "./contexts/theme.context";
import PageContext from "./contexts/page.context";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState(1);
  return (
    <>
      <Provider store={store}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <PageContext.Provider value={{ page, setPage }}>
              <RouterProvider router={router} />
            </PageContext.Provider>
          </ThemeContext.Provider>
        </LanguageContext.Provider>
      </Provider>
    </>
  );
}

export default App;
