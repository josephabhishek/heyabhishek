# Coding standards

## TypeScript

`strict` plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
`noImplicitOverride`, `noUnusedLocals`, `noUnusedParameters`,
`verbatimModuleSyntax`.

- **No `any`.** Lint error, not a warning.
- **Absolute imports only** (`@/...`). Relative chains rot first.
- **Inline type imports:** `import { type Foo, bar } from '…'`.
- Props interfaces use `readonly` members. Component props are not mutated.
- Derive types from Zod schemas. Never hand-write a type that a schema already
  describes — the two will drift.

## React

- Server Components by default. `'use client'` needs a defensible reason.
- No default exports for components; named exports keep refactors honest.
- No file over 300 lines. If it grows, it is doing two things.

## Accessibility — enforced at lint level

- `jsx-a11y` strict rules are **errors**.
- Real `<button>` for actions, real `<a>` for navigation. No `<div>` handlers.
- `outline: none` is never acceptable. Focus comes from `:focus-visible` in
  `base.css`.
- Icons are decorative (`label={null}`) or labelled. The required prop forces
  the choice at every use.
- No hover-only affordances — they do not exist on touch.
- Information is never conveyed by colour or by movement alone.

## Typography

Decided in Sprint 01.5 (ADR-0006). Do not re-litigate at component level.

- **Two registers.** `evidence` (IBM Plex Sans) and `annotation` (Newsreader,
  **italic by default**). Use the `register` prop on `Text`; never set a family
  in a class name.
- **Seven sizes. There is no eighth.** Adding one halves the perceived rigour.
- **Two weights.** Bold is never used for emphasis inside prose — emphasis is a
  change of *voice* (italic), not of volume.
- **The apparatus is content.** Source lines, captions and caveats are set one
  step below prose and distinguished by position, never by being smaller,
  greyer or tucked away.
- **Figures:** `data-numeric="tabular"` where numbers are compared,
  `"prose"` in running text. Never applied globally.
- **Measure:** 62ch prose, 34ch annotation, 48ch caption. Text is never full
  viewport width.

## CSS

- Tailwind utilities referencing tokens. No arbitrary numeric values.
- Space uses the **semantic** tokens (`--space-related`, `--space-pause`), not
  the primitives. The amount of space states the kind of relationship.
- No drop shadows. Weight is space and scale, never simulated depth.
- Only `transform` and `opacity` are animated.

## Naming

- Files: `kebab-case.tsx`. Components: `PascalCase`. Hooks: `useThing`.
- One word per concept, forever. `Before`/`After` — never "Previously"/"Old".
  Consistent nomenclature is a precision signal.
