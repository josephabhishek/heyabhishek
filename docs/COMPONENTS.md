# Editorial components

Seven components. **All are Server Components — the system ships zero runtime
JavaScript.**

Full API documentation lives in the JSDoc on each component; this page is the
map and the rules that span more than one of them.

## Dependency order

```
Typography tokens
   ↓
Disclosure        components/ui/disclosure.tsx      no brand meaning
   ↓
SourceLine        features/evidence/source-line.tsx
   ↓
Frame             features/evidence/frame.tsx       the visual signature
   ↓
Annotation        features/annotation/annotation.tsx
   ↓
Metric            features/evidence/metric.tsx
   ↓
Exhibit           features/evidence/exhibit.tsx     composes Frame + SourceLine
   ↓
Ledger            features/evidence/ledger.tsx
```

## The rule that spans all of them

**Caption describes. Annotation confides.**

| | Caption | Annotation |
|---|---|---|
| Says | *what this is* | *what I thought* |
| Register | evidence, apparatus | annotation, italic serif |
| Example | "Coverage report, March 2026" | "I expected the images to be the problem. They weren't." |
| Lives in | `<Frame caption>` | `<Annotation>` |

If a piece of annotation only restates what the exhibit already shows, it is a
caption. No prop can enforce this; it is a review responsibility.

## Registers

| Register | Used by | Set in |
|---|---|---|
| evidence | prose, headings, labels | IBM Plex Sans |
| **apparatus** | source lines, captions, **caveats** | IBM Plex Sans, 14px |
| **annotation** | the Margin Voice, ledger bodies | Newsreader **italic** |

A caveat is apparatus, not annotation: it states a limit of a measurement, it
does not think out loud.

## Page composition (Sprint 03)

| Component | Location | Client? |
|---|---|---|
| `Nav` | `components/navigation/` | **yes** — state + pathname |
| `Footer` | `components/navigation/` | no |
| `PageSection` | `features/sections/` | no |
| `Hero` | `features/hero/` | no |
| `EmptyState` | `components/ui/` | no |

`PageSection` is how every route is assembled. Slots: `eyebrow`, `heading`
(with a required `level`), `subheading`, `annotation`, `evidence`, `media`,
`cta`, plus children for prose. A page should be *assembled* from these, never
invented — if a route needs something new, it goes into the design system
first.

`Hero` carries `data-motion` and `data-motion-part` attachment points for
Sprint 04. They have no behaviour today, and everything the hero says is fully
legible with motion disabled.

## Composition

```tsx
<MarginField annotation={<Annotation placement="margin" id="n3">…</Annotation>}>
  <Exhibit
    number={3}
    media={{ kind: 'image', src: '…', alt: '…', width: 1600, height: 900 }}
    caption="Coverage report, first week after launch"
    source={source}
    describedBy="n3"
  />
</MarginField>
```

`MarginField` places the annotation beside the evidence above 64rem and in
sequence below it. **DOM order never changes**, so reading order is identical
at every viewport.

## Accessibility contract

- Every date is `<time datetime>`.
- Status and confidence are **words**, never colours or icons.
- Alt text carries the finding, not the file type. An exhibit whose finding
  cannot be expressed in words is not usable as evidence.
- Rules are `border`s, so they survive forced-colors mode.
- Italic is applied by CSS, never `<em>`, so a screen reader is not told an
  entire paragraph is emphasised.
- No hover-only affordances. Touch targets ≥44px.

## Performance contract

- Exhibit images are lazy by default; `priority` is set only on the LCP image.
- Video is `preload="none"`, poster-first. Budget 400KB per recording.
- Document links state format and size, because a link that silently starts a
  4MB download on mobile data is a hostile act.
