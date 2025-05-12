import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { API_KEY } from "../../config";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ query: value });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );
        setSearchResults(response.data.results);
      } catch (err) {
        setError(err);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter movie title"
          className={styles.searchInput}
        />
      </form>

      {loading && <div>Searching...</div>}
      {error && <div>Error: {error.message}</div>}
      {searchResults !== null && searchResults.length > 0 && (
        <MovieList movies={searchResults} />
      )}
      {query &&
        searchResults !== null &&
        searchResults.length === 0 &&
        !loading && <p>No movies found for "{query}".</p>}
    </div>
  );
};

export default MoviesPage;
