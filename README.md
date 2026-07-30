# Portfolio

A production Next.js application. Sprint 01 delivers the **foundation only** —
architecture, configuration, tokens, primitives and the content contract. There
is no homepage, no navigation UI, no animations and no content, by design.

## Setup

```bash
nvm use              # Node 22 (see .nvmrc)
npm install
cp .env.example .env.local   # every variable is optional
npm run dev
```

`http://localhost:3000` returns the 404 route. That is correct: no page routes
exist yet. `/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` are live.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (fails on type or lint errors) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint, type-aware, a11y as **error** |
| `npm run format` / `format:check` | Prettier |
| `npm run validate:content` | Validates all MDX frontmatter against the schemas |
| `npm run check:budgets` | Performance budget gate |
| `npm run test` | Brand-enforcement tests |
| `npm run fonts:install` | Copies font files from the Fontsource packages (runs on postinstall) |
| **`npm run verify`** | **Everything above. Must pass before any merge.** |

## The one thing to understand first

**The brand is encoded in the type system.**

`lib/content/schemas.ts` makes the project's non-negotiables structural rather
than remembered:

- a number without a denominator and a caveat will not validate
- an exhibit without a source will not validate
- a case study without a mistake, an open question, an attribution limit, a
  rejected option, a constraint or three exhibits will not validate

A failing content build is the system working. **The fix is always the content,
never the schema.** See `docs/CONTENT_WORKFLOW.md`.

## Documentation

| Document | Read it for |
|---|---|
| `docs/ARCHITECTURE.md` | Route map, data flow, folder boundaries |
| `docs/COMPONENTS.md` | The editorial component library |
| `docs/FOLDER_STRUCTURE.md` | Where a new file goes and why |
| `docs/BRAND.md` | The rules the schemas enforce |
| `docs/CODING_STANDARDS.md` | Conventions |
| `docs/CONTENT_WORKFLOW.md` | Authoring a document |
| `docs/DEVELOPMENT_WORKFLOW.md` | Branches, commits, review |
| `docs/ANIMATION_WORKFLOW.md` | Adding a motion pattern |
| `docs/QUALITY_GATES.md` | What must pass, and the failed-gate policy |
| `docs/FUTURE_EXPANSION.md` | What is deliberately deferred |
| `docs/decisions/` | Why each significant decision was made |

## Open decisions blocking content

Three decisions block authoring and are recorded in
`docs/decisions/ADR-0005-open-decisions.md`. They are not engineering blockers —
the foundation is complete without them — but the first case study cannot be
written until they are resolved.
