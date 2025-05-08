export const API_KEY = "2573d2ea5c96770798019c47b2938855";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTczZDJlYTVjOTY3NzA3OTgwMTljNDdiMjkzODg1NSIsIm5iZiI6MS43NDYwMTUwMTUxODU5OTk5ZSs5LCJzdWIiOiI2ODEyMTMyN2E2NDAxZmQyYTAwNTUwOTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oOSXJlK1vaIsnJq6eY4W55edSAFl7DegkgJg_v_rDiI",
  },
};

export const baseURL = "https://api.themoviedb.org/3/search/movie?";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function fixedNumber(value) {
  if (value == null) return "";
  return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
}
