import { useEffect } from "react";

export function useKey(key, callback) {
    useEffect(
        function () {
            function handleKeyDown(e) {
                if (e.code === key) {
                    callback();
                }
            }
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        },
        [key, callback]
    );
}   