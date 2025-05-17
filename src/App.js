import { useState } from "react";
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
import { useMovies } from "./Hooks/userMovies";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, errorMessage } = useMovies(query); // Custom hook to fetch movies
  const [watched, setWatched] = useLocalStorageState([], "watched"); // Custom hook to manage watched movies

  function handleOnSelectMove(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWateched(movieId) {
    setWatched((watched) => watched.filter((movie) => movie.id !== movieId));
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search
          query={query}
          setQuery={setQuery}
          onCloseMove={handleCloseMovie}
        />
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
              watched={watched}
              onCloseMove={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWateched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
