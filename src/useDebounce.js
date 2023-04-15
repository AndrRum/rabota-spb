import {useState, useEffect} from "react";

export const useDebounce = (value, delay = 1000) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer);
    }, [value, delay])

    return debounced;
}