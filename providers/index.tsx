import { ThemeProvider } from './theme-provider';
import { AnimationProvider } from './animation-provider';
import { RouteAnnouncer } from './route-announcer';

/**
 * Composition root for client providers.
 *
 * Three, deliberately. There is no global state manager and no data-fetching
 * provider: content is static and resolved at build time.
 *
 *   ThemeProvider     light / dark / system, persisted
 *   AnimationProvider GSAP registration and the scroll manager
 *   RouteAnnouncer    focus management and announcement on navigation
 */
export function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <RouteAnnouncer />
        {children}
      </AnimationProvider>
    </ThemeProvider>
  );
}
