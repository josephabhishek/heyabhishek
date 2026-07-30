import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Content wrapper — constrains reading measure.
 *
 * Measures are reading lengths, not container widths. `prose` is the default;
 * `caption` and `annotation` exist so the apparatus keeps its own measure.
 */
export type Measure = 'prose' | 'annotation' | 'caption';

const measureClass: Record<Measure, string> = {
  prose: 'max-w-[var(--measure-prose)]',
  annotation: 'max-w-[var(--measure-annotation)]',
  caption: 'max-w-[var(--measure-caption)]',
};

export interface ContentWrapperProps {
  readonly measure?: Measure;
  readonly className?: string;
  readonly children: ReactNode;
}

export function ContentWrapper({ measure = 'prose', className, children }: ContentWrapperProps) {
  return <div className={cn(measureClass[measure], className)}>{children}</div>;
}
