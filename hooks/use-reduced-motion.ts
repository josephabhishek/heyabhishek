'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion, watchReducedMotion } from '@/animations/reduced-motion';

/** Reactive reduced-motion preference. Defaults to `true` before hydration. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    return watchReducedMotion(setReduced);
  }, []);

  return reduced;
}
