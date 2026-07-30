import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Grid — the column field.
 *
 * Column counts come from --grid-columns, which changes at each breakpoint
 * (4 / 8 / 12). Components ask for a span rather than a column count so the
 * same markup holds at every breakpoint.
 */
export interface GridProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function Grid({ className, children }: GridProps) {
  return (
    <div
      className={cn('grid gap-[var(--container-gutter)]', className)}
      style={{ gridTemplateColumns: 'repeat(var(--grid-columns), minmax(0, 1fr))' }}
    >
      {children}
    </div>
  );
}

export type GridRegion = 'evidence' | 'annotation' | 'full';

export interface GridCellProps {
  readonly region?: GridRegion;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * A cell in the column field.
 *
 * `annotation` spans the last four desktop columns. Below 64rem
 * --grid-annotation-span is 0, so the cell falls back to full width and the
 * annotation reads inline — which is the canonical form, not a fallback
 * (Phase 04, Deliverable 09).
 */
export function GridCell({ region = 'full', className, children }: GridCellProps) {
  const span =
    region === 'evidence'
      ? 'var(--grid-evidence-span)'
      : region === 'annotation'
        ? 'max(var(--grid-annotation-span), var(--grid-columns))'
        : 'var(--grid-columns)';

  return (
    <div className={cn(className)} style={{ gridColumn: `span ${span} / span ${span}` }}>
      {children}
    </div>
  );
}
