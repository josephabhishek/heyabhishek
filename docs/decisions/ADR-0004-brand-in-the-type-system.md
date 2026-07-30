# ADR-0004 — The brand is encoded in the type system

**Status:** accepted · **Date:** 2026-07-30

## Context

The project's differentiation rests on behaviours that are easy to skip under
pressure: sourcing every exhibit, qualifying every number, naming a mistake,
leaving a question open. Discipline erodes — especially for a solo author at
11pm in month eight.

## Decision

Encode the non-negotiables as required fields in Zod schemas that run at build
time. A document that omits them **fails the build.**

## Reasoning

A rule in a document is advisory. A rule in a schema is structural. This
converts a discipline problem into a compiler problem, which is the only version
that survives fatigue and deadlines.

The `tests/content-schemas.test.ts` suite asserts that invalid content is
*rejected* — so if enforcement is ever weakened, a test fails and says so.

## Consequences

- Authoring is harder. That is the intent.
- Weakening a rule requires four deliberate steps: schema, `BRAND.md`, tests,
  and an ADR.
- A failing content build is the system working. The fix is the content.
