import type { ReactNode } from 'react';

/**
 * Hides content visually while keeping it available to assistive technology.
 * Used for the caveat text that screen-reader users receive unconditionally
 * (Phase 04, Deliverable 11).
 */
export function VisuallyHidden({ children }: { readonly children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
