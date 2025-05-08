import { useEffect, useState } from "react";
import { options, baseURL } from "./config"; // Import the constants from config.js
import Nav from "./Components/Nav";
import Loader from "./Components/Loader";
import Logo from "./Components/Logo";
import ErrorMessage from "./Components/ErrorMessage";
import Search from "./Components/Search";
import NumResults from "./Components/NumFoundResult";
import Main from "./Components/Main";
import Box from "./Components/Box";
import MovieDetails from "./Components/MovieDetails";
import MovieList from "./Components/MovieList";
import WatchedSummery from "./Components/WatchedSummery";
import WatchedMovieList from "./Components/WatchedMovieList";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleOnSelectMove(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  useEffect(() => {
    /*
      useEffect will be called after the component rendered, 
      self callback fetchMovies async function, which it dealing with
      promises result, like fetch()
    */
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await fetch(
          `${baseURL}query=${query}&include_adult=false&page=1`,
          options
        ).catch((error) => {
          throw new Error("Something wrong happened, while fetching movies!");
        });

        const data = await result.json();
        if (data.results.length === 0) throw new Error("Movie Not Found");

        setMovies(data.results);
        setIsLoading(false);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        {/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && (
            <MovieList movies={movies} onSelectedMovie={handleOnSelectMove} />
          )}
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              movieId={selectedId}
              onCloseMove={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
