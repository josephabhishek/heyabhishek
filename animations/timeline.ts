'use client';

import { registerGsap } from './gsap';
import { duration, ease, type DurationToken, type EaseToken } from './tokens';
import { prefersReducedMotion } from './reduced-motion';
import type gsapType from 'gsap';

/**
 * Timeline helpers.
 *
 * Every pattern must declare one of three permitted jobs. The job is not
 * decoration — it is the argument for the animation existing at all, and it is
 * recorded in the timeline's own data so a motion audit can read it.
 */
export type MotionJob = 'connect' | 'compare' | 'disclose';

export interface TimelineOptions {
  readonly job: MotionJob;
  readonly id: string;
  readonly durationToken?: DurationToken;
  readonly easeToken?: EaseToken;
}

/**
 * Creates a paused timeline carrying its job and id.
 *
 * Under reduced motion it returns a timeline with zero duration: end states
 * are applied instantly. Nothing is lost but movement, because information
 * never lives in an animation.
 */
export function createTimeline(options: TimelineOptions): gsapType.core.Timeline {
  const gsap = registerGsap();
  const reduced = prefersReducedMotion();

  return gsap.timeline({
    paused: true,
    id: options.id,
    data: { job: options.job },
    defaults: {
      duration: reduced ? 0 : duration(options.durationToken ?? 'considered'),
      ease: ease(options.easeToken ?? 'standard'),
    },
  });
}

/** Cleanup contract for React effects: every timeline must be revertible. */
export function disposeTimeline(timeline: gsapType.core.Timeline | null): void {
  timeline?.revert();
  timeline?.kill();
}
