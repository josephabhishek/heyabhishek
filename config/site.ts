/**
 * Single source of truth for identity-level facts.
 *
 * NOTE: `name` is deliberately left as a placeholder. The naming decision
 * (own name vs. studio name) is unresolved and blocks metadata, domain and
 * authored voice. See docs/decisions/ADR-0004-open-decisions.md.
 */
export const site = {
  name: 'TBD',
  role: 'Marketing Technologist',
  locale: 'en-IN',
  timeZone: 'Asia/Kolkata',
  region: 'Ahmedabad, Gujarat, India',
  contact: {
    // Canonical email is unresolved (two addresses in circulation).
    email: '',
    whatsapp: '',
  },
  social: {
    github: 'https://github.com/josephabhishek',
    linkedin: '',
  },
} as const;

/** Canonical origin. Never hard-code a URL anywhere else. */
export function siteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && fromEnv.length > 0) return fromEnv.replace(/\/$/, '');
  return 'http://localhost:3000';
}
