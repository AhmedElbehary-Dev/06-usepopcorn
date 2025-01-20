import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
// import "./index.css";
// import App from "./App";
function Test() {
  const [movieRating, setMoveRating] = useState(0);
  return (
    <div>
      <StarRating color={`blue`} onSetRating={setMoveRating} />
      <p>you rate the move by {movieRating} starts</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Test />
    {/* <StarRating maxRating={5} />
    <StarRating maxRating={2} messages={["bad", "good"]} defaultRating={3} /> */}
  </React.StrictMode>
);
