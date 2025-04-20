import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import Navigation from "./components/Navigation/Navigation";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);

function App() {
  const links = {
    home: "/",
    movies: "/movies",
    movieDetails: "/movies/:movieId",
    movieCast: "cast",
    movieReviews: "reviews",
  };
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={links.home} element={<HomePage />} />
          <Route path={links.movies} element={<MoviesPage />} />
          <Route path={links.movieDetails} element={<MovieDetailsPage />}>
            <Route path={links.movieCast} element={<MovieCast />} />
            <Route path={links.movieReviews} element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
