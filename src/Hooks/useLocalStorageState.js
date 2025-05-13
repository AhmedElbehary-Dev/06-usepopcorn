import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {

    const [value, setValue] = useState(() => {
        const storedWatched = localStorage.getItem(key);
        return storedWatched ? JSON.parse(storedWatched) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}