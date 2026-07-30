import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Heading primitive.
 *
 * `level` sets the semantic element and is required: heading levels are never
 * skipped and exactly one h1 exists per route. `scale` is separate so a
 * visually small h2 never becomes an h4 in the markup — the outline of the
 * document is a structural fact, not a styling side effect.
 *
 * Hierarchy here is carried mainly by space and position (see
 * styles/editorial.css: generous space above a heading, tight below, so it
 * binds to what follows). Size contrast does the smaller share of the work,
 * which is why the scale is modest.
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingScale = 'display' | 'heading' | 'title' | 'lead';

const scaleClass: Record<HeadingScale, string> = {
  display:
    'text-[length:var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)]',
  heading:
    'text-[length:var(--text-heading)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]',
  title: 'text-[length:var(--text-title)] leading-[var(--leading-title)]',
  lead: 'text-[length:var(--text-lead)] leading-[var(--leading-prose)]',
};

export interface HeadingProps {
  readonly level: HeadingLevel;
  readonly scale?: HeadingScale;
  readonly id?: string;
  readonly className?: string;
  /** Motion attachment point. Carries no behaviour; see features/hero. */
  readonly 'data-motion-part'?: string;
  readonly children: ReactNode;
}

export function Heading({
  level,
  scale = 'title',
  id,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${String(level)}` as 'h1';
  return (
    <Tag
      className={cn('font-[family-name:var(--font-evidence)]', scaleClass[scale], className)}
      {...(id ? { id } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Label — small, tracked, used for exhibit numbers and field names.
 * Set in the evidence register with tabular figures, because a label is
 * frequently a number and numbers in labels are compared across a page.
 */
export interface LabelProps {
  readonly as?: 'span' | 'dt' | 'div';
  readonly className?: string;
  readonly children: ReactNode;
}

export function Label({ as: Tag = 'span', className, children }: LabelProps) {
  return (
    <Tag
      data-numeric="tabular"
      className={cn(
        'font-[family-name:var(--font-evidence)] text-[length:var(--text-micro)]',
        'tracking-[var(--tracking-label)] uppercase',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
