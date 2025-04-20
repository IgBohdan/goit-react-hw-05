import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { API_KEY } from "../../config";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        setTrendingMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading trending movies...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading trending movies.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Today</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;
