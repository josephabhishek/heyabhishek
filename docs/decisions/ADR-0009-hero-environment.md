# ADR-0009 — The hero environment is photography, and it is optional

**Status:** accepted · **Date:** 2026-07-30 · **Sprint:** 04

## Context

Sprint 04 asked for a desk environment: walnut, warm paper, cream reports,
audit sheets, wireframes, handwritten annotation, laptop, phone, stationery,
soft natural light, layering and depth. The same brief states that texture must
**not** be faked with CSS and must come from real photography or scanned
assets.

Those two instructions are consistent with each other and with ADR-0008. But
together they produce a hard constraint: **the environment cannot be built
without photographs, and no photographs exist.**

The three available routes were all unacceptable:

1. **Simulate it in CSS** — gradients, noise, layered shapes. Prohibited by
   this sprint's own brief and by the art direction. It would also be the first
   visible lie on a site whose entire argument is that nothing here is faked.
2. **Use stock photography** — blacklisted without exception. A stock desk is
   somebody else's workspace presented as this one.
3. **Generate imagery** — same objection as stock, with less provenance.

## Decision

Build the **environment system** and leave the manifest empty.

- `config/environment.ts` holds a typed, art-directed manifest, empty by
  default.
- `HeroEnvironment` returns `null` when no layer is configured.
- The hero is complete, premium and fully legible on typography, composition
  and space alone.
- `docs/PHOTOGRAPHY.md` specifies the two required frames precisely enough to
  shoot in an afternoon with a phone.

Adding the photographs is a config change. No component work is required.

## Reasoning

The first impression should not *depend* on a photograph. Precision reads
through space, alignment, restraint and tolerance — a well-set first screen is
already premium, and an environment layered on top deepens it rather than
rescuing it. Building it the other way round would have produced a hero that
looks broken until an asset arrives.

Art direction is per breakpoint rather than per size: the mobile frame is a
different photograph, composed tighter with fewer objects. A wide desk crop at
360px is clutter, and scaling one image to serve both is the usual way this
kind of hero fails on a phone.

## Consequences

- The hero ships without an environment and improves when it is shot.
- A scrim keeps body copy at full contrast over any future photograph, because
  contrast is a hard gate and a beautiful image that costs legibility has
  failed.
- The environment is never the LCP element: lazy, behind the content, never
  `priority`. The headline stays the largest contentful paint, which is what
  makes a sub-1.8s LCP achievable on a mid-range phone over 4G.

## The concern that remains, stated once

A desk is the practitioner's workspace. The site's stated objective is that a
visitor leaves understanding how *their* business problem gets solved, and the
strongest version of this page centres the visitor's problem rather than the
author's furniture.

The composition here resolves that as far as it can: the environment is
atmosphere behind the content, and the first words the visitor reads are about
their own situation, not about this desk. If the photography ever begins to
compete with that headline for attention, the photography is what should go.
