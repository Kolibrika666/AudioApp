import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const t = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(t);
            };
        },
        [value, delay]
    );
    return debouncedValue;
};

export function numberArray(length: number) {
    return [...Array(length)].map((_, i) => i + 1);
};
