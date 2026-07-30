'use client';

import { gsap } from 'gsap';
import { registerGsap } from './gsap';
import { duration, ease, type DurationToken, type EaseToken } from './tokens';
import { prefersReducedMotion } from './reduced-motion';

/**
 * Timeline helpers.
 *
 * Every pattern must declare one of three permitted jobs. The job is not
 * decoration — it is the argument for the animation existing at all, and it is
 * recorded in the timeline's own data so a motion audit can read it.
 */
export type MotionJob = 'connect' | 'compare' | 'disclose';

/**
 * The timeline type, derived from the value rather than from a namespace.
 *
 * GSAP declares `gsap` as both a const and a namespace. A default type import
 * cannot carry the namespace meaning, so `gsapType.core.Timeline` does not
 * resolve. Deriving from `typeof gsap.timeline` is version-proof and needs no
 * knowledge of GSAP's internal type layout.
 */
export type MotionTimeline = ReturnType<typeof gsap.timeline>;

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
export function createTimeline(options: TimelineOptions): MotionTimeline {
  const instance = registerGsap();
  const reduced = prefersReducedMotion();

  return instance.timeline({
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
export function disposeTimeline(timeline: MotionTimeline | null): void {
  timeline?.revert();
  timeline?.kill();
}
