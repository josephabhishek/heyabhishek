'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Button primitive — for actions only. Navigation uses Link.
 *
 * `intent` is deliberately minimal: this project has three CTAs that ask for
 * business and four that navigate (Phase 04, Deliverable 10). A large button
 * taxonomy would be inventing variety the site does not have.
 *
 * Touch target is enforced at 44px via --touch-min, not left to the caller.
 */
export type ButtonIntent = 'primary' | 'quiet';

export interface ButtonProps {
  readonly type?: 'button' | 'submit';
  readonly intent?: ButtonIntent;
  readonly disabled?: boolean;
  readonly ariaExpanded?: boolean;
  readonly ariaControls?: string;
  readonly className?: string;
  readonly onClick?: () => void;
  readonly children: ReactNode;
}

const intentClass: Record<ButtonIntent, string> = {
  primary: 'border border-[var(--rule-color-emphasis)]',
  quiet: 'border border-transparent underline underline-offset-4',
};

export function Button({
  type = 'button',
  intent = 'primary',
  disabled = false,
  ariaExpanded,
  ariaControls,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'min-h-[var(--touch-min)] min-w-[var(--touch-min)] px-[var(--space-related)]',
        'disabled:opacity-50',
        intentClass[intent],
        className,
      )}
      {...(ariaExpanded === undefined ? {} : { 'aria-expanded': ariaExpanded })}
      {...(ariaControls ? { 'aria-controls': ariaControls } : {})}
    >
      {children}
    </button>
  );
}
