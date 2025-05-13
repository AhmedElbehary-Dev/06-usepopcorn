import { useRef } from "react";
import { useKey } from "../Hooks/useKey";

export default function Search({ query, setQuery, onCloseMove, }) {
  const inputRef = useRef(null);

  useKey("Enter", handleClearQuery);

  function handleClearQuery() {
    if (document.activeElement === inputRef.current) return;
    inputRef.current.focus();
    onCloseMove();
    setQuery('');
  }

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
      ref={inputRef}
    />
  );
}
