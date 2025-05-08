export default function NumResults({ movies = [] }) {
  const count = movies.length;
  const resultLabel = count === 1 ? "result" : "results";

  return (
    <p className="num-results">
      Found <strong>{count}</strong> {resultLabel}
    </p>
  );
}
