import { fixedFloat } from "../config";
export default function WatchedMovie({ movie }) {
  return (
    <li>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
        alt={`${movie.original_title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.rate.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{fixedFloat(movie.userRate)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
