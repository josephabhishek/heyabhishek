/**
 * Content types are DERIVED from the Zod schemas in lib/content/schemas.ts.
 *
 * The schemas are the single source of truth: they run at build time and fail
 * the build when the brand's non-negotiables are missing. Hand-writing these
 * types would allow the two to drift, so nothing here is authored by hand.
 */
export type {
  Source,
  Exhibit,
  Metric,
  Pair,
  OpenQuestion,
  ResearchItem,
  Mistake,
  Strategy,
  Results,
  CaseStudy,
  Teardown,
  JournalEntry,
  Experiment,
  Insight,
  Project,
  Revision,
  ContentKind,
} from '@/lib/content/schemas';
