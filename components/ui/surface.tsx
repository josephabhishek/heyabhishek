import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Surface primitive.
 *
 * There are no drop shadows in this system: weight is expressed through space
 * and scale, never simulated depth (Phase 02, material ruling). A surface is
 * therefore a background value and, optionally, a rule.
 */
export type SurfaceLevel = 'page' | 'raised' | 'sunken';

const levelClass: Record<SurfaceLevel, string> = {
  page: 'bg-[var(--surface-page)]',
  raised: 'bg-[var(--surface-raised)]',
  sunken: 'bg-[var(--surface-sunken)]',
};

export interface SurfaceProps {
  readonly level?: SurfaceLevel;
  readonly ruled?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Surface({ level = 'page', ruled = false, className, children }: SurfaceProps) {
  return (
    <div className={cn(levelClass[level], ruled && 'border border-[var(--rule-color)]', className)}>
      {children}
    </div>
  );
}
