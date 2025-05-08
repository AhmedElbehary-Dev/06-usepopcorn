import { average, fixedFloat } from "../config";

export default function WatchedSummery({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.rate.toFixed(1)));
  const avgUserRating = average(
    watched.map((movie) => movie.popularity.toFixed(1))
  );
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{fixedFloat(avgImdbRating)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{fixedFloat(avgUserRating)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{fixedFloat(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
}
