import {useState, useEffect} from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(() => {
        try {
            const json = localStorage.getItem(key);
            if (json != null) {
                return JSON.parse(json) as T;
            }
        } catch {
        }
        return initialValue;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {

        }
    }, [key, value]);

    return [value, setValue]
}