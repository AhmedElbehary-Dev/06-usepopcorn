import { useEffect, useState } from "react";
import { options, baseURL } from "../config"; // Import the constants from config.js

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        /*
          useEffect will be called after the component rendered, 
          self callback fetchMovies async function, which it dealing with
          promises result, like fetch()
        */
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const result = await fetch(
                    `${baseURL}query=${query}&include_adult=false&page=1`,
                    options,
                    { singal: controller.signal }
                ).catch((error) => {
                    throw new Error("Something wrong happened, while fetching movies!");
                });

                const data = await result.json();
                if (data.results.length === 0) throw new Error("Movie Not Found");

                setMovies(data.results);
                setIsLoading(false);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setErrorMessage(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
        if (query.length < 3) {
            setMovies([]);
            setErrorMessage("");
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query]);

    return { movies, isLoading, errorMessage };
}