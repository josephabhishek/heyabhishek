import { cn } from '@/lib/cn';

/**
 * ScrollHint — a quiet indication that the page continues.
 *
 * A rule that lengthens, not an arrow that bounces. A bouncing arrow is an
 * anxiety signal: it says *please keep going*. A rule that simply extends says
 * the document continues, and trusts the reader to decide.
 *
 * ### It does not move
 * A looping pulse was built and then removed in self-review: it failed the
 * project's motion rule, which requires every pattern to connect, compare or
 * disclose. An infinite loop does none of those. A rule at fixed length
 * already says the document continues, and saying it calmly is the point.
 *
 * ### Accessibility
 * Decorative and hidden from assistive technology. Scroll position is already
 * conveyed by the browser; announcing it again is noise. The label exists for
 * sighted readers only.
 */
export interface ScrollHintProps {
  readonly label?: string;
  readonly className?: string;
}

export function ScrollHint({ label = 'Keep reading', className }: ScrollHintProps) {
  return (
    <div
      data-scroll-hint=""
      aria-hidden="true"
      className={cn('flex items-center gap-[var(--space-related)]', className)}
    >
      <span data-apparatus="">{label}</span>
      <span data-scroll-hint-rule="" />
    </div>
  );
}
