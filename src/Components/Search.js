export default function Search({ query, setQuery, onCloseMove }) {
  function handleChangeQuery(e) {
    setQuery(e.target.value);
    onCloseMove();
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={handleChangeQuery}
    />
  );
}
