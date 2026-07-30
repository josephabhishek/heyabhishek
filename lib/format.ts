import { site } from '@/config/site';

/**
 * Every date on the site renders through here, in one format, everywhere.
 * Consistency of nomenclature is a precision signal (Phase 02, editorial
 * Rule 2) and every document carries dates, so this is pervasive.
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(site.locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: site.timeZone,
  }).format(new Date(iso));
}

export function formatDateRange(start: string, end?: string): string {
  const from = formatDate(start);
  return end ? `${from} – ${formatDate(end)}` : `${from} – present`;
}

/** Machine-readable value for <time datetime>. */
export function isoDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}
