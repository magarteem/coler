import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 1000): string {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(handler);
  }, [delay, value]);

  return debounce;
}
