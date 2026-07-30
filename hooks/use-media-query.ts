'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribes to a media query.
 *
 * Returns `false` on the server and on first client render to avoid hydration
 * mismatch. Layout must therefore never *depend* on this — CSS handles
 * responsive layout; this is for behavioural differences only (for example,
 * whether the annotation margin field is active).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
