'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { primaryNav } from '@/config/routes';
import { site } from '@/config/site';
import { Icon } from '@/components/ui';
import { LANDMARK } from '@/lib/a11y/ids';
import { cn } from '@/lib/cn';

/**
 * Primary navigation.
 *
 * A Client Component, and one of only two in the codebase. The interaction it
 * needs — a disclosure that closes on navigation and on Escape, plus an active
 * route indicator — genuinely requires state and the current pathname.
 *
 * ### Why not a hamburger hiding everything
 * Five links, all nouns a non-technical reader understands, no dropdowns. On
 * narrow screens they collapse into a full-width panel rather than an overlay,
 * because an overlay covers the evidence a reader was looking at.
 *
 * ### Active route
 * Marked with `aria-current="page"` **and** a visible rule. Never colour alone.
 *
 * ### Accessibility
 * - The trigger carries `aria-expanded` and `aria-controls`.
 * - Escape closes the panel and returns focus to the trigger.
 * - The panel is not a focus trap: it is a disclosure in the document flow, so
 *   tabbing past it continues into the page, which is what a document-shaped
 *   site should do.
 * - Navigating closes the panel; a panel left open after a route change is a
 *   common and disorienting bug.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      id={LANDMARK.nav}
      data-print="hide"
      className="sticky top-0 z-[var(--layer-raised)] border-b border-[color:var(--rule-color)] bg-[color:var(--surface-page)]"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[var(--content-max)] items-center justify-between px-[var(--container-margin)] py-[var(--space-related)]"
      >
        <Link
          href="/"
          className="font-[family-name:var(--font-evidence)] text-[length:var(--text-body)]"
        >
          {site.name}
        </Link>

        {/* Wide viewports: the links themselves. */}
        <ul className="hidden items-center gap-[var(--space-distinct)] md:flex">
          {primaryNav.map((route) => (
            <li key={route.path}>
              <NavLink href={route.path} pathname={pathname}>
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Narrow viewports: a disclosure. */}
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((value) => !value);
          }}
          className="-mr-[var(--space-within)] flex min-h-[var(--touch-min)] min-w-[var(--touch-min)] items-center justify-center md:hidden"
        >
          <Icon icon={open ? X : Menu} label={open ? 'Close menu' : 'Open menu'} size={20} />
        </button>
      </nav>

      <div
        id={panelId}
        hidden={!open}
        className="border-t border-[color:var(--rule-color)] md:hidden"
      >
        <ul className="mx-auto w-full max-w-[var(--content-max)] px-[var(--container-margin)] py-[var(--space-related)]">
          {primaryNav.map((route) => (
            <li
              key={route.path}
              className="border-b border-[color:var(--rule-color)] last:border-b-0"
            >
              <NavLink href={route.path} pathname={pathname} block>
                {route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function NavLink({
  href,
  pathname,
  block = false,
  children,
}: {
  readonly href: string;
  readonly pathname: string;
  readonly block?: boolean;
  readonly children: React.ReactNode;
}) {
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      {...(isActive ? { 'aria-current': 'page' as const } : {})}
      className={cn(
        'flex min-h-[var(--touch-min)] items-center',
        'font-[family-name:var(--font-evidence)] text-[length:var(--text-body)]',
        // Active state is a rule, not a colour. Colour alone would fail
        // forced-colors mode and colour-blind readers.
        isActive && 'underline decoration-[color:var(--rule-color-emphasis)] underline-offset-8',
        block && 'w-full',
      )}
    >
      {children}
    </Link>
  );
}
