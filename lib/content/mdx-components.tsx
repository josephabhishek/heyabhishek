import type { MDXComponents } from 'next-mdx-remote';

/**
 * The MDX component registry.
 *
 * Deliberately empty in this sprint. The identity components it will map to
 * (Frame, Exhibit, SourceLine, Metric, Annotation, Ledger, OpenQuestion) are
 * built in Sprint 02 — registering placeholders now would be exactly the
 * placeholder code this sprint forbids.
 *
 * Build order, from Phase 04 Deliverable 15:
 *   Disclosure → Frame → SourceLine → Metric → Annotation → Exhibit → Ledger
 */
export function mdxComponents(): MDXComponents {
  return {};
}
