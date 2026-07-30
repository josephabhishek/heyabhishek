'use client';

import Lenis from 'lenis';
import { prefersReducedMotion } from './reduced-motion';

/**
 * Smooth-scroll manager.
 *
 * Constraints this obeys, from Phase 02 and Phase 04:
 *   · scroll velocity is never modified — Lenis is used only for frame
 *     synchronisation with ScrollTrigger, not for scroll-jacking
 *   · it does not initialise at all under `prefers-reduced-motion`
 *   · native scrolling remains fully functional if it never initialises
 *
 * If smooth scrolling proves to interfere with anchor navigation or assistive
 * technology in testing, the correct response is to remove it. It is an
 * enhancement, not a dependency.
 */
export interface ScrollManager {
  readonly instance: Lenis | null;
  destroy: () => void;
}

export function createScrollManager(onFrame?: (time: number) => void): ScrollManager {
  if (typeof window === 'undefined' || prefersReducedMotion()) {
    return { instance: null, destroy: () => {} };
  }

  const lenis = new Lenis({ autoRaf: false, duration: 0.8 });

  let frame = 0;
  const tick = (time: number) => {
    lenis.raf(time);
    onFrame?.(time);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  return {
    instance: lenis,
    destroy: () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    },
  };
}
