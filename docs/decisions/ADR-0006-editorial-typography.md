# ADR-0006 — Editorial typography and rhythm

**Status:** accepted · **Date:** 2026-07-30 · **Sprint:** 01.5

## Context

The editorial components (Annotation, SourceLine, Metric, Exhibit, Ledger)
could not be built without typographic decisions. The annotation register in
particular carries both the project's differentiation and its only warmth, and
had been explicitly flagged as "not body copy in a narrower column."

## Decisions

### Two families

| Register | Family | Licence |
|---|---|---|
| Evidence | **IBM Plex Sans** | OFL 1.1 |
| Annotation | **Newsreader**, italic by default | OFL 1.1 |

**IBM Plex Sans** was drawn for an engineering company, which is the register
wanted here: exact without being cold. It has true tabular figures — non-
negotiable, because a column of numbers that does not align is the clearest
signal that the author does not respect data. A Devanagari sibling exists,
which serves the year-one Hindi plan without a third family. It is also
markedly less common than the obvious neutral grotesques, so it does not read
as a default.

**Newsreader** comes from a different design world on purpose. Pairing a sans
with its own serif sibling would have been tidier and wrong: the annotation
must look like a different *voice*, not a different weight.

Both are open-licensed and self-hostable. No licence fee, no per-domain cost,
no attribution in the interface.

### The annotation is set in italic

The load-bearing decision of this sprint.

Marginalia has been set in italic since Renaissance printing, so the convention
already means *"an aside, in someone's voice."* It solves register distinction
in a single move, costs one font file, and makes it structurally impossible for
the Margin Voice to be mistaken for body copy in a narrower column — which was
the specific failure mode this sprint existed to prevent.

Emphasis inside an annotation returns to upright: a plainer voice inside an
already-personal one.

### Seven-step scale, modest ratio

12 · 14 · 16 · 18 · 22 · 26–34 · 32–52.

Roughly 1.2 at text sizes, opening only at display. Hierarchy is carried mainly
by **space and position**, not by size contrast — every additional size halves
the perceived rigour of the system. There is no eighth step.

### A heading binds to what follows it

`--rhythm-heading-above: 48px` · `--rhythm-heading-below: 12px`.

Asymmetric space is what makes the relationship legible. This single rule does
more for document structure than any size decision.

### Measure revised from 68ch to 62ch

`ch` is the width of the digit zero, which in both families is wider than the
average lowercase character. 68ch was rendering at roughly 75 characters —
above the comfortable range. 62ch lands at ~66–70.

The annotation measure stays deliberately narrow at 34ch: marginalia is read in
short bursts beside something else, and a wide annotation competes with the
evidence instead of accompanying it.

### The apparatus does not apologise for itself

Source lines, captions and caveats are set one step below prose (14px) and are
distinguished by **position and structure**, never by diminishment. They are
never greyed into invisibility, never italicised to look incidental, never
tucked below the fold of a figure. They are content.

### Figures: tabular where compared, proportional in prose

Applied by the Metric and Ledger components via `[data-numeric]`, never
globally. Tabular figures in running prose read as gappy and mechanical.

### Density is declared, not improvised

Three levels — compressed (ledgers, apparatus), standard (prose, annotation),
expanded (exhibits, the single figure). Dense evidence inside generous space is
the target. Uniform airiness is the default everywhere else and reads as empty
rather than confident.

### No baseline grid

A true baseline grid is brittle in CSS the moment an image, a table or a
variable-height annotation enters the flow — and this document type is made
almost entirely of those. Consistent *relationships* survive; a rigid grid does
not.

## Consequences

- Four font files, 100KB total, enforced by `check:budgets`.
- `styles/editorial.css` applies the rhythm, scoped to `[data-editorial]` so
  interface surfaces never inherit document spacing.
- Sprint 02 components are unblocked.

## Not decided here

Colour values beyond the existing placeholders, the Frame's exact proportions,
and the ownable connective mark. Those remain open.
