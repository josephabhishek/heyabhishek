import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Container.
 *
 * Content stops at --content-max; margins grow beyond it (Phase 04, wide
 * breakpoint). Text is never set to full viewport width.
 */
export interface ContainerProps {
  readonly className?: string;
  readonly children: ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[var(--content-max)] px-[var(--container-margin)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
