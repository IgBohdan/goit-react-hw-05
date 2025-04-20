import axios from "axios";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { API_KEY } from "../../config";
import styles from "./MoviesPage.module.css";
const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      );
      setSearchResults(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter movie title"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <div>Searching...</div>}
      {error && <div>Error: {error.message}</div>}
      {searchResults !== null && searchResults.length > 0 && (
        <MovieList movies={searchResults} />
      )}
      {searchQuery &&
        searchResults !== null &&
        searchResults.length === 0 &&
        !loading && <p>No movies found for "{searchQuery}".</p>}
    </div>
  );
};

export default MoviesPage;
