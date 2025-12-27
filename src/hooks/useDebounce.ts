import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  const debouncedCallback = ((...args: Parameters<T>) => {
    if (debounceTimer !== null) {
      clearTimeout(debounceTimer);
    }

    const newTimer = window.setTimeout(() => {
      callback(...args);
    }, delay);

    setDebounceTimer(newTimer);
  }) as T;

  useEffect(() => {
    return () => {
      if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}
