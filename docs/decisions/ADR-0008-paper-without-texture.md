# ADR-0008 — Paper without texture

**Status:** accepted · **Date:** 2026-07-30 · **Sprint:** 03

## Context

The Sprint 03 brief asked for a "paper-inspired background" with "subtle paper
texture" and "soft lighting".

This conflicts with an approved decision. The material ruling (ADR-0006 and the
art direction it implements) states that **materials may be photographed, never
simulated**: a real scanned sheet with real handwriting is evidence, a paper
texture applied to a `div` is a costume. In a project whose entire proposition
is that nothing is faked, simulated materiality is a self-inflicted
contradiction — and a sophisticated visitor detects it immediately.

There are two further objections. Simulated grain is a recognisable period
style that will date. And a noise overlay costs bytes on the critical path
against a 1.8s LCP budget.

## Decision

Deliver the *intent* — paper, calm, soft light — through **value
relationships** rather than through texture.

| Token | Before | After |
|---|---|---|
| `--surface-page` | `#ffffff` | `#fbfaf7` |
| `--surface-sunken` | `#f4f4f4` | `#f3f1ec` |
| `--ink-primary` | `#141414` | `#16150f` |
| `--rule-color` | `#d8d8d8` | `#d6d2c8` |

Dark theme values were warmed to match.

## Reasoning

What actually makes a surface read as paper is not grain. It is that the
surface is **warm, slightly off-white, and non-luminous** — pure `#ffffff` on a
modern display glows, and glow is the single quality paper does not have. A
warm near-white with warm-black ink and a warm rule reads as paper immediately,
at any zoom level, on any device.

This carries the quality with **no asset, no request, and nothing to date**.

## Consequences

- The "premium whitespace, calm confidence" objective is met without ornament,
  which is also what the precision-as-luxury argument requires.
- If real paper is wanted later, it arrives as **photography** — a scanned,
  annotated printout presented as an exhibit. That would be evidence, and it is
  admissible.
- Contrast ratios changed and are **unverified**. They must be checked against
  WCAG 2.2 AA before the accessibility gate can pass.
