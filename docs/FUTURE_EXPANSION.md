# Future expansion

Provisions already in place, so none of these requires a migration.

| Addition | Milestone | Provision made now |
|---|---|---|
| `/check` diagnostic | v1.1 | `normaliseUserUrl`, capability flag, honest degradation without an API key |
| `/measure` self-report | v1.1 | `useWebVitals`, budgets in config, ISR-ready route shape |
| Amendment reveal | v1.2 | `git-history.ts`, `revisionSchema`, `fetch-depth: 0` in CI |
| A co-author | v2 | `author` field on every document schema from day one |
| Dark mode | v2 | Full semantic token architecture; `ThemeProvider` already supports it |
| `/unresolved` index | v2 | Open questions are structured and aggregable |
| `/archive` | v2 | `projectSchema` with honest `kind` labelling |
| Search | v2 | Deferred until 15+ documents; nothing to search before that |
| Hindi / Gujarati | v2 | Route shape locale-ready; no i18n library added prematurely |
| `/benchmarks` | v2+ | Audit results designed to be anonymised and aggregated |

## Deliberately not built

**Dark mode at MVP** — a second theme doubles contrast verification for no
business value.

**A contact form** — WhatsApp plus `mailto`. One less component, one less spam
vector, one less failure state, and it matches how business is actually
conducted in this market.

**Filtering on `/work`** — with three documents, a filter advertises thin
inventory. The industry label does the work.

**A chart library** — real screenshots replace redrawn charts.

**A unit test framework beyond the schema tests** — there is almost no business
logic. The real risks are content validity, budgets and accessibility, all
gated. Vitest coverage expands when `/check` arrives, because its findings logic
genuinely needs tests.
