import type { ComponentType } from 'react';

/**
 * The MDX component registry.
 *
 * The map type is declared locally rather than imported from the MDX
 * toolchain: the exported name has moved between major versions, and a local
 * definition keeps this file stable across upgrades. It is structurally what
 * every MDX provider expects.
 */
export type MdxComponents = Record<string, ComponentType<Record<string, unknown>>>;

/**
 * Deliberately empty in this sprint. The identity components it will map to
 * (Frame, Exhibit, SourceLine, Metric, Annotation, Ledger, OpenQuestion) exist
 * but are not yet wired to MDX — that is the content-rendering sprint.
 * Registering placeholders now would be placeholder code.
 */
export function mdxComponents(): MdxComponents {
  return {};
}
