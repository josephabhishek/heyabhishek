'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect warns during SSR. GSAP setup needs layout timing on the
 * client, so this selects the correct hook per environment.
 */
export const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
