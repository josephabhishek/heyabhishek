'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { announce } from '@/lib/a11y/announce';
import { LANDMARK } from '@/lib/a11y/ids';

/**
 * Route announcer and focus manager.
 *
 * On client navigation the page changes but focus does not move, so a keyboard
 * or screen-reader user is left where they were with no indication that
 * anything happened. This was flagged as blocking for the accessibility gate.
 *
 * On every route change this:
 *   1. moves focus to the `main` landmark, so the next Tab continues from the
 *      top of the new page rather than from the old page's position;
 *   2. announces the new document title through a polite live region;
 *   3. resets scroll position, including for the smooth-scroll manager, which
 *      does not reset itself on navigation.
 *
 * The first render is skipped: a full page load already places focus and
 * announces the title natively, and announcing twice is worse than not at all.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const main = document.getElementById(LANDMARK.main);
    main?.focus({ preventScroll: true });

    window.scrollTo({ top: 0, behavior: 'instant' });

    announce(document.title);
  }, [pathname]);

  return null;
}
