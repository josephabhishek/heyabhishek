# ADR-0007 — Editorial component architecture

**Status:** accepted · **Date:** 2026-07-30 · **Sprint:** 02

## 1. Disclosure has no JavaScript

Built on native `<details>`/`<summary>` rather than React state.

It works before hydration and with JavaScript disabled, so a caveat is never
withheld from a reader on a bad connection. Content is in the DOM in both
states, which serves screen readers and crawlers without a second code path.
`aria-expanded`, keyboard operation and focus behaviour come from the browser
and are more reliable than a hand-rolled equivalent. And four interactions in
this project are disclosures; none of them now ships a byte.

The open/close transition uses `interpolate-size` and `::details-content`,
which degrade to an instant toggle where unsupported.

## 2. The entire editorial system is Server Components

Zero `'use client'` across all seven components. The only client component in
the codebase remains `Button`, which needs `onClick`.

The editorial system therefore adds **no runtime JavaScript at all**. That is
not an optimisation applied afterwards; it is what falls out of choosing native
elements and CSS over state.

## 3. The caveat is visible, and it is apparatus

Two decisions, both reversals of a first attempt.

**Visible, not disclosed.** Putting the caveat behind a disclosure contradicted
the rule that the apparatus is content rather than fine print, and it created
an accessibility failure: content inside a closed `<details>` is hidden from
assistive technology, so the reader most reliant on the caveat would have been
least likely to receive it.

**Apparatus register, not the Margin Voice.** ADR-0006 lists caveats under the
apparatus. A caveat states a limit of a measurement; it does not think out
loud. Rendering it in the annotation register mixed the two registers inside a
single component, which is the exact confusion the two-register system exists
to prevent. It carries a rule instead, so it cannot merge with the line above.

## 4. Margin annotations keep their register break on narrow screens

`MarginField` collapses to one column below 64rem. A `placement="margin"`
annotation would have arrived on a phone as italic serif with no rule and no
indent — losing the treatment that makes it legible as a different voice.

The inline treatment is now applied by CSS inside `[data-margin-field]` below
the breakpoint, rather than by asking the caller to switch a prop. The
component cannot be used incorrectly.

## 5. Fonts are dependencies, copied by a script

`@fontsource-variable/*` packages plus `scripts/install-fonts.mjs`, run on
postinstall.

`next/font/local` was rejected: it hard-fails the build when a file is missing,
and the files live in `node_modules` rather than in the repository, so the
build would depend on install order and a fresh clone would break before
install.

The script discovers files by pattern rather than exact name, and **never fails
the install**. If a face cannot be found it warns and exits zero; the
metric-adjusted fallback stacks render and nothing on the site depends on a web
font being present.

## 6. Ledger is chronological, not tabular

The Sprint 02 brief defines Ledger as chronological transparency — revisions,
mistakes, unresolved questions, planned work. Earlier phases had used the same
name for a raw data table (Search Console rows).

This ADR adopts the Sprint 02 definition. **The tabular evidence component
still does not exist** and is recommended for Sprint 03 as `DataTable`, with
the constraint that it must be readable at 320px without horizontal scroll.

## 7. Exhibit requires image dimensions

Stricter than `exhibitSchema`, which has them optional. Undeclared dimensions
cause layout shift and CLS is a hard gate. The schema should be tightened to
match in a later sprint.
