import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Section — a narrative beat.
 *
 * `spacing` maps to the semantic space tokens, so the amount of space between
 * two things states what kind of relationship they have (Phase 02): a beat, a
 * pause before evidence, or the single silence per route.
 */
export type SectionSpacing = 'beat' | 'pause' | 'silence';

const spacingClass: Record<SectionSpacing, string> = {
  beat: 'py-[var(--space-beat)]',
  pause: 'py-[var(--space-pause)]',
  silence: 'py-[var(--space-silence)]',
};

export interface SectionProps {
  readonly spacing?: SectionSpacing;
  readonly labelledBy?: string;
  /** Anchor target. Required for in-page links and for skip navigation. */
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Section({ spacing = 'beat', labelledBy, id, className, children }: SectionProps) {
  return (
    <section
      className={cn(spacingClass[spacing], className)}
      {...(id ? { id } : {})}
      {...(labelledBy ? { 'aria-labelledby': labelledBy } : {})}
    >
      {children}
    </section>
  );
}
