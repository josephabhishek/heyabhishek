'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { budgets } from '@/config/performance';

/**
 * Field-data monitoring hook.
 *
 * Lab metrics in CI cannot catch real-world regression (Phase 04, Deliverable
 * 16 — Performance Engineer). This reports field vitals and warns in
 * development when a budget is breached, so a regression is visible while it
 * is still cheap to fix.
 *
 * Wiring to an analytics endpoint happens when analytics ships; the hook does
 * not silently swallow data in the meantime.
 */
export function useWebVitals(onMetric?: (name: string, value: number) => void): void {
  useReportWebVitals((metric) => {
    const { name, value } = metric;

    if (process.env.NODE_ENV === 'development') {
      const limit =
        name === 'LCP'
          ? budgets.vitals.lcpMs
          : name === 'INP'
            ? budgets.vitals.inpMs
            : name === 'CLS'
              ? budgets.vitals.cls
              : name === 'TTFB'
                ? budgets.vitals.ttfbMs
                : null;

      if (limit !== null && value > limit) {
        console.warn(`[budget] ${name} ${value.toFixed(1)} exceeds ${String(limit)}`);
      }
    }

    onMetric?.(name, value);
  });
}
