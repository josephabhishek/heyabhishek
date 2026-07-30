import { LANDMARK } from '@/lib/a11y/ids';

/**
 * Skip link — first focusable element in the DOM.
 *
 * Visible on focus rather than permanently hidden, because a skip link that
 * cannot be seen when focused fails the keyboard journey it exists to serve.
 */
export function SkipLink() {
  return (
    <a
      href={`#${LANDMARK.main}`}
      data-print="hide"
      className="sr-only focus:not-sr-only focus:absolute focus:top-[var(--space-related)] focus:left-[var(--space-related)] focus:z-[var(--layer-skip)] focus:bg-[var(--surface-page)] focus:px-[var(--space-related)] focus:py-[var(--space-within)] focus:outline focus:outline-2 focus:outline-[var(--focus-ring)]"
    >
      Skip to content
    </a>
  );
}
