'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Theme architecture.
 *
 * Dark mode is NOT an MVP deliverable — a second theme doubles contrast
 * verification for no business value. This provider exists so it can be added
 * in v2 without touching a component: themes resolve by `data-theme`, and
 * absence of that attribute falls through to the system preference in CSS.
 */
export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  readonly theme: Theme;
  setTheme: (next: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'theme';

export function ThemeProvider({ children }: { readonly children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
