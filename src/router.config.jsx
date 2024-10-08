import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Movies from "./components/pages/Movies";
import NotFound from "./components/pages/NotFound";
import MovieDetails from "./components/pages/MovieDetails";
import Main from "./components/layout/Main";
import moviesLoader from "./utils/loaders/moviesLoader";
import Favorites from "./components/pages/Favorites";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "favorites", element: <Favorites /> },
      { path: "movies/:id", element: <MovieDetails /> },
      {
        path: "movies",
        element: <Movies />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const page = url.searchParams.get("page") || "1";
          return await moviesLoader(page)
        },
        errorElement: <>Error: Sonmething went Wrong</>
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
