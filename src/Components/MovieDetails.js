import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { options } from "../config";
import { useKey } from "../Hooks/useKey";

export default function MovieDetails({
  movieId,
  watched,
  onCloseMove,
  onAddWatched,
}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRate, setUserRate] = useState(null);
  const isWatched = watched.map((movie) => movie.id).includes(movieId);
  const watchedUserrate = watched.find(
    (movie) => movie.id === movieId
  )?.userRate;

  const {
    original_title: title,
    overview: description,
    poster_path: poster,
    runtime,
    release_date: releaseDate,
    genres,
    tagline,
    vote_average: rate,
    production_companies: productionCompanies,
    popularity,
  } = movieDetail || {};

  function handleAdd() {
    const newWatchedMovie = {
      id: movieId,
      title,
      releaseDate,
      poster,
      rate,
      runtime,
      popularity,
      userRate,
    };
    onAddWatched(newWatchedMovie);
    onCloseMove();
  }

  useKey("Escape", onCloseMove);


  useEffect(
    function () {
      setIsLoading(true);

      try {
        async function fetchMovieById() {
          const Url = `https://api.themoviedb.org/3/movie/${movieId}`;
          const results = await fetch(Url, options).catch(() => {
            throw new Error("Move Has Not Detail!");
          });

          const details = await results.json();
          setMovieDetail(details);
        }
        fetchMovieById();
        setIsLoading(false);
      } catch (err) {
        console.err(err);
      }
    },
    [movieId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = title;

      //clean up function, run when the component instance unmounted!.
      return () => {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  if (movieDetail) {
    return (
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMove}>
                &larr;
              </button>
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                alt={`${title} poster`}
              />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {releaseDate} &bull; {runtime} min
                </p>
                <p style={{ fontWeight: 700 }}>
                  {genres?.map((g) => g.name).join(", ")}
                </p>
                <p>
                  <span>⭐</span>
                  {rate?.toFixed(1)} rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={setUserRate}
                      defaultRating={userRate}
                    />
                    {userRate && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>
                    You are aleady rate it with {watchedUserrate}{" "}
                    <span>⭐</span>
                  </p>
                )}
              </div>
              <p>
                <em>{description}</em>
              </p>
              <p>
                <span style={{ fontWeight: 700 }}>Production Compaines: </span>
                {productionCompanies?.map((c) => c.name).join(", ")}
              </p>
              {tagline && <blockquote className="quote">{tagline}</blockquote>}
            </section>
          </>
        )}
      </div>
    );
  }
}
