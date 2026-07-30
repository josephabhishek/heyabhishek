# Folder structure

```
.
├── app/                      Routes, metadata routes, error boundaries
│   ├── layout.tsx            Document, landmarks, providers
│   ├── not-found.tsx         404 — real infrastructure
│   ├── error.tsx             Route error boundary
│   ├── global-error.tsx      Root error boundary
│   ├── sitemap.ts            Generated from config/routes.ts
│   ├── robots.ts
│   └── manifest.ts
│
├── components/               NO BRAND MEANING. Reusable anywhere.
│   ├── ui/                   Text, Apparatus, Heading, Label, Link, Button,
│   │                         Surface, Divider, Icon, Disclosure,
│   │                         VisuallyHidden, SkipLink
│   ├── layout/               Container, Section, Stack, Grid, PageWrapper,
│   │                         ContentWrapper, EditorialLayout
│   ├── navigation/           Nav, Footer
│   └── shared/               (unused)
│
├── features/                 BRAND-MEANINGFUL modules
│   ├── evidence/             SourceLine, Frame, Metric, Exhibit, Ledger
│   ├── annotation/           Annotation, MarginField
│   ├── sections/             PageSection
│   └── hero/                 Hero
│
├── animations/               GSAP registration, Lenis manager, timeline
│                             helpers, motion token bridge, reduced motion
├── hooks/                    Reactive utilities
├── providers/                ThemeProvider, AnimationProvider, composition
├── lib/                      Pure logic
│   ├── content/              schemas, loader, paths, git-history, mdx registry
│   ├── a11y/                 landmark ids, live-region announcer
│   ├── seo.ts                Metadata builders
│   ├── structured-data.ts    JSON-LD builders
│   ├── env.ts                Validated environment
│   ├── format.ts             Dates — one format, everywhere
│   ├── url.ts                Absolute URLs, user URL normalisation
│   └── cn.ts
│
├── config/                   site, routes, performance budgets
├── types/                    Types derived from schemas; ambient declarations
├── styles/
│   ├── globals.css           Entry point
│   ├── fonts.css             @font-face + metric-adjusted fallbacks
│   ├── themes.css            Semantic colour, light/dark/system
│   ├── base.css              Reset, focus, reduced motion, print
│   ├── editorial.css         Rhythm applied, scoped to [data-editorial]
│   └── tokens/               space, size, grid, radius, elevation, layer,
│                             motion, opacity, breakpoint, typography, rhythm
├── content/
│   ├── pages/                Typed page copy (home.ts)
│   └── <six kinds>/          Authored MDX
├── public/                   images, videos, fonts, icons, documents, textures
├── scripts/                  validate-content, check-budgets
├── tests/                    Brand-enforcement tests
└── docs/                     This documentation, plus decisions/
```

## Where does a new file go?

| It is… | Put it in |
|---|---|
| A generic, reusable UI primitive | `components/ui/` |
| A layout mechanism | `components/layout/` |
| Anything encoding an identity element | `features/<name>/` |
| Pure logic with no JSX | `lib/` |
| A value someone might want to change | `config/` |
| A motion pattern | `animations/` |
| Authored prose | `content/` |
| A significant decision | `docs/decisions/ADR-####-*.md` |

`data/` and `constants/` are deliberately absent: they overlap with `config/`
and `content/`, and three places to put a value means nobody knows which.
