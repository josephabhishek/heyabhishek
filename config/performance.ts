/**
 * Performance budgets. Enforced by scripts/check-budgets.mjs in CI.
 *
 * Policy (Phase 04, Deliverable 12): never raise a budget to pass a gate.
 * Remove the offending feature instead.
 */
export const budgets = {
  /** Field targets, p75, throttled 4G on a mid-range Android device. */
  vitals: {
    lcpMs: 1800,
    inpMs: 200,
    cls: 0.1,
    ttfbMs: 600,
  },
  /** Build-time asset ceilings, in kilobytes. */
  assets: {
    initialJsPerRouteKb: 120,
    totalRouteWeightKb: 900,
    fontsTotalKb: 100,
    largestImageKb: 200,
    largestRecordingKb: 400,
  },
  lighthouse: {
    performance: 95,
    accessibility: 100,
  },
} as const;
