import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Movies from "./components/pages/Movies";
import NotFound from "./components/pages/NotFound";
import MovieDetails from "./components/pages/MovieDetails";
import Main from "./components/layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "movies", element: <Movies /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
