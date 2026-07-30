'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createScrollManager, type ScrollManager } from '@/animations/scroll-manager';
import { registerGsap, ScrollTrigger } from '@/animations/gsap';
import { prefersReducedMotion, watchReducedMotion } from '@/animations/reduced-motion';

/**
 * Animation context.
 *
 * Owns the two pieces of global animation state: GSAP registration and the
 * scroll manager. Components never register GSAP or construct Lenis
 * themselves, so the motion budget stays auditable in one place.
 *
 * Under reduced motion no scroll manager is created at all.
 */
interface AnimationContextValue {
  readonly reducedMotion: boolean;
  readonly scroll: ScrollManager | null;
}

const AnimationContext = createContext<AnimationContextValue>({
  reducedMotion: true,
  scroll: null,
});

export function AnimationProvider({ children }: { readonly children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(true);
  const scrollRef = useRef<ScrollManager | null>(null);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    return watchReducedMotion(setReducedMotion);
  }, []);

  useEffect(() => {
    registerGsap();

    if (reducedMotion) {
      scrollRef.current?.destroy();
      scrollRef.current = null;
      return;
    }

    // Drive ScrollTrigger from the same frame loop as the scroll manager so
    // the two never disagree about scroll position.
    const manager = createScrollManager(() => ScrollTrigger.update());
    scrollRef.current = manager;

    return () => {
      manager.destroy();
      scrollRef.current = null;
    };
  }, [reducedMotion]);

  const value = useMemo(() => ({ reducedMotion, scroll: scrollRef.current }), [reducedMotion]);

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

export function useAnimation(): AnimationContextValue {
  return useContext(AnimationContext);
}
