'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP registration, once, in one place.
 *
 * Only ScrollTrigger is registered. The motion budget is three patterns at MVP
 * with a hard cap of eight (Phase 02): connect, compare, disclose. Any plugin
 * beyond ScrollTrigger needs an ADR before it is added.
 */
let registered = false;

export function registerGsap(): typeof gsap {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    // Only transform and opacity are animated, so force3D is safe and cheap.
    gsap.defaults({ force3D: true, overwrite: 'auto' });
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };
