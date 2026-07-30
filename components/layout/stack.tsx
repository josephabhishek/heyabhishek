import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Stack — one-dimensional flow with semantic gaps.
 *
 * The gap tokens carry meaning, so `gap` is a relationship, not a number.
 */
export type StackGap = 'within' | 'related' | 'distinct' | 'beat';

const gapClass: Record<StackGap, string> = {
  within: 'gap-[var(--space-within)]',
  related: 'gap-[var(--space-related)]',
  distinct: 'gap-[var(--space-distinct)]',
  beat: 'gap-[var(--space-beat)]',
};

export interface StackProps {
  readonly direction?: 'vertical' | 'horizontal';
  readonly gap?: StackGap;
  readonly as?: 'div' | 'ul' | 'ol' | 'dl';
  readonly className?: string;
  readonly children: ReactNode;
}

export function Stack({
  direction = 'vertical',
  gap = 'related',
  as: Tag = 'div',
  className,
  children,
}: StackProps) {
  return (
    <Tag
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        gapClass[gap],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
