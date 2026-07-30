# Architecture

## Shape

A statically generated Next.js application. No database, no CMS, no state
manager, no data-fetching library, no component library, no chart library.
Content is MDX in git; everything renders at build time.

One runtime endpoint is planned (`/api/check`, v1.1). Nothing else needs a
server, which is why this is cheap to host and cheap to keep alive for years.

## Data flow

```
content/**/*.mdx  (authored, git-tracked)
   │
   ├─ gray-matter ────────────► frontmatter + body
   │
   ├─ lib/content/schemas.ts ─► Zod validation  ──► FAILS BUILD on violation
   │
   ├─ lib/content/loader.ts ──► LoadedDocument[]
   │
   ├─ lib/content/git-history ─► revisions (derived from `git log`, never authored)
   │
   └─ generateStaticParams ───► Server Components ──► static HTML
```

Client Components are the exception, not the default. Every `'use client'`
needs a reason a reviewer would accept.

## Folder boundaries — the rule that settles arguments

> **Does it carry brand meaning?**
> Yes → `features/`. No → `components/`.

`Disclosure` is a generic accessible primitive that happens to serve four
identity interactions. It has no brand meaning: it lives in `components/`.
The `Frame`, `SourceLine`, `Metric` and `Annotation` encode identity elements:
they live in `features/`.

**Dependency direction:** `features/` may import from `components/`. Never the
reverse. This is not stylistic — it keeps the primitives reusable and prevents
a circular graph.

## Why these choices

**No `src/`.** The project root is the application root, matching the structure
specified in the build brief. Path aliases (`@/*`) make depth irrelevant.

**No CMS.** A CMS solves the problem of non-technical people publishing
content. There is one author, and that author is technical. A CMS would add a
vendor, a monthly cost, a runtime fetch, a preview environment and a schema to
keep in sync — to solve a problem that does not exist. Revisit at 150 documents
or a second author.

**Revision history from `git log`.** Every document is a git-tracked file, so
its history already exists. Deriving it means the "Amendment" element is free,
automatic and incapable of drifting from reality — because it *is* the reality.
Side effect: commit messages become the public reason-for-revision field, which
is why Conventional Commits are mandatory and why commit messages must be
written as if published. Requires `fetch-depth: 0` in CI; degrades to an empty
list rather than failing.

**Tokens in CSS, not TypeScript.** Tailwind v4 is configured in CSS. Motion
durations are read from computed custom properties at runtime
(`animations/tokens.ts`) so there is exactly one numeric value per token and
`prefers-reduced-motion` — which zeroes the CSS durations — is honoured by GSAP
automatically, without a second code path.

**No chart library.** Real screenshots replace redrawn charts. This removes a
component family, a dependency, and the risk of drifting into dashboard
aesthetics.

## Route map

Routes are registered in `config/routes.ts` with their shipping milestone. The
sitemap is generated from that registry, so a route cannot exist without being
classified.

| Milestone | Routes |
|---|---|
| MVP | `/` `/work` `/work/[slug]` `/teardowns` `/teardowns/[slug]` `/journal` `/journal/[slug]` `/about` `/process` `/contact` `/resume` `404` |
| v1.1 | `/check` (+ `/api/check`), `/measure` |
| v2 | `/archive`, `/unresolved` |

`/resume` renders without the site shell: a recruiter should never be routed
through the homepage narrative.
