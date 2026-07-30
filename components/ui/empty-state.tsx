import type { ReactNode } from 'react';
import { Apparatus } from './text';
import { cn } from '@/lib/cn';

/**
 * EmptyState.
 *
 * Says plainly that there is nothing here yet. It never apologises, never
 * jokes, and never pretends something is "coming soon" — a site built on not
 * overstating should not overstate its own inventory either.
 *
 * Used wherever a collection can legitimately be empty: the case study index
 * before the first case study is published, the journal before the first
 * entry, a filtered view with no matches.
 *
 * @example
 * ```tsx
 * <EmptyState>No case studies published yet.</EmptyState>
 * ```
 */
export interface EmptyStateProps {
  readonly children: ReactNode;
  /** An honest next step, when one exists. */
  readonly action?: ReactNode;
  readonly className?: string;
}

export function EmptyState({ children, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn('border border-[color:var(--rule-color)] p-[var(--space-distinct)]', className)}
    >
      <Apparatus as="p">{children}</Apparatus>
      {action ? <div className="mt-[var(--space-related)]">{action}</div> : null}
    </div>
  );
}
