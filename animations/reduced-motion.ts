const QUERY = '(prefers-reduced-motion: reduce)';

/** Server-safe: assumes reduced motion until the client proves otherwise. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(QUERY).matches;
}

export function watchReducedMotion(onChange: (reduced: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia(QUERY);
  const handler = (event: MediaQueryListEvent) => onChange(event.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}
