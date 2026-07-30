import { siteUrl } from '@/config/site';

/** Absolute URL for canonicals, Open Graph and structured data. */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl()}${clean === '/' ? '' : clean}`;
}

/** Normalises visitor-supplied input for the diagnostic (v1.1). Forgiving by
 *  design: an error state that rejects a valid site is a lost lead. */
export function normaliseUserUrl(input: string): string | null {
  const trimmed = input.trim();
  if (trimmed.length === 0) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (parsed.hostname.includes('.') === false) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
