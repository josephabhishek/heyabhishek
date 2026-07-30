/**
 * Motion token bridge.
 *
 * CSS is the single source of truth for durations and easings (see
 * styles/tokens/motion.css). This module reads the computed custom properties
 * at runtime so there is no duplicated numeric value to drift, and so
 * `prefers-reduced-motion` — which zeroes the CSS durations — is honoured
 * automatically by GSAP without a second code path.
 */

export type DurationToken = 'instant' | 'quick' | 'considered';
export type EaseToken = 'standard' | 'exit';

const DURATION_FALLBACK_MS: Record<DurationToken, number> = {
  instant: 0,
  quick: 180,
  considered: 420,
};

function cssValue(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw.length > 0 ? raw : null;
}

/** Duration in seconds, which is what GSAP expects. */
export function duration(token: DurationToken): number {
  const raw = cssValue(`--duration-${token}`);
  if (!raw) return DURATION_FALLBACK_MS[token] / 1000;

  const ms = raw.endsWith('ms')
    ? Number.parseFloat(raw)
    : raw.endsWith('s')
      ? Number.parseFloat(raw) * 1000
      : Number.parseFloat(raw);

  return Number.isFinite(ms) ? ms / 1000 : DURATION_FALLBACK_MS[token] / 1000;
}

/** GSAP accepts a CSS cubic-bezier string directly via CustomEase-free syntax. */
export function ease(token: EaseToken): string {
  return cssValue(`--ease-${token}`) ?? 'cubic-bezier(0.2, 0, 0.2, 1)';
}
