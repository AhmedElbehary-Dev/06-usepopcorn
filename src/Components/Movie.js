export default function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.id)}>
      {movie.poster_path !== null ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.original_title} poster`}
        />
      ) : (
        <img
          src={`https://img.freepik.com/premium-photo/poster-movie-movie-starring-movies-title-movies_1115474-87549.jpg`}
          alt={`poster`}
        />
      )}
      <h3>{movie.original_title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.release_date}</span>
        </p>
      </div>
    </li>
  );
}
