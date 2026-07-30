import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Disclosure — expand and collapse, with **no JavaScript**.
 *
 * Built on native `<details>`/`<summary>` rather than React state. That is a
 * deliberate architectural choice, not a shortcut:
 *
 *   · It works with JavaScript disabled and before hydration, so a caveat is
 *     never hidden from a reader on a bad connection.
 *   · The content is in the DOM in both states, which serves screen readers
 *     and search crawlers without a second code path.
 *   · `aria-expanded`, keyboard operation (Enter/Space), and focus behaviour
 *     are provided by the browser and are more reliable than a hand-rolled
 *     equivalent.
 *   · It costs zero bytes of runtime JavaScript. Four interactions in this
 *     project are disclosures; none of them ships a kilobyte.
 *
 * If a future requirement genuinely needs controlled state, that is a new
 * component. Do not add `'use client'` to this one.
 *
 * ### Accessibility
 * - `<summary>` is focusable and operable by keyboard natively.
 * - The open/close animation is CSS-only and honours `prefers-reduced-motion`.
 * - The trigger text must describe what will be revealed, not say "more".
 *
 * @example
 * ```tsx
 * <Disclosure summary="one week, small sample">
 *   <Text>Measured over seven days. Not yet a trend.</Text>
 * </Disclosure>
 * ```
 */
export interface DisclosureProps {
  /** Visible trigger. Must describe the content, never "read more". */
  readonly summary: ReactNode;
  /** Open on first render. Use for caveats that should not require a click. */
  readonly defaultOpen?: boolean;
  /** `apparatus` sets the trigger in the source-line register. */
  readonly tone?: 'apparatus' | 'inherit';
  readonly className?: string;
  readonly children: ReactNode;
}

export function Disclosure({
  summary,
  defaultOpen = false,
  tone = 'inherit',
  className,
  children,
}: DisclosureProps) {
  return (
    <details data-disclosure="" open={defaultOpen} className={cn(className)}>
      <summary
        className={cn(
          'cursor-pointer list-none',
          'min-h-[var(--touch-min)] py-[var(--space-within)]',
          tone === 'apparatus' &&
            'font-[family-name:var(--font-evidence)] text-[length:var(--text-apparatus)] text-[color:var(--ink-apparatus)]',
        )}
      >
        {summary}
      </summary>
      <div data-disclosure-content="" className="pb-[var(--space-within)]">
        {children}
      </div>
    </details>
  );
}
