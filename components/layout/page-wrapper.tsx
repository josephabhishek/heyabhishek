import type { ReactNode } from 'react';
import { LANDMARK } from '@/lib/a11y/ids';
import { cn } from '@/lib/cn';

/**
 * Page wrapper — the `main` landmark.
 *
 * `tabIndex={-1}` makes it a programmatic focus target for the skip link and
 * for route-change focus management (Phase 04, Deliverable 16 — accessibility).
 */
export interface PageWrapperProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function PageWrapper({ className, children }: PageWrapperProps) {
  return (
    <main id={LANDMARK.main} tabIndex={-1} className={cn('outline-none', className)}>
      {children}
    </main>
  );
}
