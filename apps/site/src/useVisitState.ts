import { useEffect, useState } from 'react';

/**
 * useState that survives leaving a page and coming back during the same visit,
 * so a demo picks up where the visitor left it. Stored per tab in
 * sessionStorage; if storage is unavailable it behaves like plain useState.
 */
export function useVisitState<T>(key: string, initial: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = sessionStorage.getItem(`visit:${key}`);
      if (raw !== null) return JSON.parse(raw) as T;
    } catch { /* fall through to the initial value */ }
    return typeof initial === 'function' ? (initial as () => T)() : initial;
  });
  useEffect(() => {
    try { sessionStorage.setItem(`visit:${key}`, JSON.stringify(value)); } catch { /* storage unavailable */ }
  }, [key, value]);
  return [value, setValue] as const;
}
