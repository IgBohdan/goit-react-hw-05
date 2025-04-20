import { lazy, Suspense, useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { API_KEY } from "../../config";
import styles from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrlBase = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch movie details: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className={styles.movieDetailsPage}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go Back
      </button>
      <div className={styles.movieInfo}>
        {movie.poster_path && (
          <img
            src={`${imageUrlBase}${movie.poster_path}`}
            alt={movie.title || movie.name}
            className={styles.poster}
          />
        )}
        <div className={styles.detailsContainer}>
          <h1 className={styles.title}>{movie.title || movie.name}</h1>
          <p className={styles.releaseDate}>
            Release Date: {movie.release_date}
          </p>
          <p className={styles.voteAverage}>
            Vote Average: {movie.vote_average * 10}%
          </p>
          <h2 className={styles.overviewTitle}>Overview</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <h3 className={styles.genresTitle}>Genres</h3>
          <div className={styles.genres}>
            {movie.genres &&
              movie.genres.map((genre) => (
                <span key={genre.id} className={styles.genreBadge}>
                  {genre.name}
                </span>
              ))}
          </div>
        </div>
      </div>
      <hr className={styles.separator} />
      <div className={styles.additionalInfo}>
        <h2 className={styles.additionalInfoTitle}>Additional Information</h2>
        <div className={styles.additionalLinks}>
          <Link
            to={`cast`}
            state={{ from: location }}
            className={styles.castLink}
          >
            Cast
          </Link>
          <Link
            to={`reviews`}
            state={{ from: location }}
            className={styles.reviewsLink}
          >
            Reviews
          </Link>
        </div>
        <Suspense fallback={<div>Loading additional information...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
