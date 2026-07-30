import NextLink from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Link primitive.
 *
 * External links state that they leave the site in their accessible name
 * rather than relying on an icon, which would be a colour- or glyph-only
 * signal. Focus styling comes from :focus-visible in base.css and is never
 * removed.
 */
export interface LinkProps {
  readonly href: string;
  readonly external?: boolean;
  readonly className?: string;
  readonly ariaLabel?: string;
  readonly children: ReactNode;
}

export function Link({ href, external, className, ariaLabel, children }: LinkProps) {
  const isExternal = external ?? /^https?:\/\//i.test(href);
  const classes = cn('underline underline-offset-4 decoration-[var(--rule-color)]', className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        rel="noreferrer noopener"
        target="_blank"
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}>
      {children}
    </NextLink>
  );
}
