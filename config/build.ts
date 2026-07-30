import pkg from '../package.json' with { type: 'json' };

/**
 * Build record, published in the footer.
 *
 * Evaluated once at build time on the server. `BUILD_TIME` is injected by
 * next.config.ts; the fallback keeps local development working without it.
 */
const builtAt = process.env.BUILD_TIME ?? new Date().toISOString();

export const buildInfo = {
  version: pkg.version,
  builtAt,
  builtAtLabel: new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(builtAt)),
  year: new Date(builtAt).getFullYear(),
} as const;
