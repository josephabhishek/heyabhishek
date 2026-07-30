import { z } from 'zod';

/**
 * Environment is validated once, at module load. Every variable is optional:
 * the project must run with an empty .env so a content-only contribution is
 * never blocked (docs/DEVELOPMENT_WORKFLOW.md).
 */
const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().min(1).optional(),
  PAGESPEED_API_KEY: z.string().min(1).optional(),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  PAGESPEED_API_KEY: process.env.PAGESPEED_API_KEY,
});

if (!parsed.success) {
  throw new Error(`Invalid environment:\n${z.prettifyError(parsed.error)}`);
}

export const env = parsed.data;

/** Capability flags, so features degrade honestly rather than crashing. */
export const capabilities = {
  analytics: Boolean(env.NEXT_PUBLIC_GTM_ID),
  diagnostic: Boolean(env.PAGESPEED_API_KEY),
} as const;
