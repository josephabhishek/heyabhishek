# Development workflow

## Branches

Trunk-based. `main` is always deployable.

`feat/` `fix/` `content/` `perf/` `a11y/` `docs/` `chore/`

Short-lived. A branch open longer than a week is a scope problem.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/). Not cosmetic:
commit messages on content files surface publicly as the reason for a revision
(`lib/content/git-history.ts`). Write them as if published.

```
feat(evidence): add Frame with fixed provenance offset
content(work): publish first case study
fix(a11y): return focus to trigger when magnifier closes
```

## Before any merge

```bash
npm run verify
```

`typecheck → lint → format:check → validate:content → test → build → budgets`.
One command. If it fails, it has found something.

`check:links` runs nightly, not on merge: slow and flaky gates train people to
bypass gates, which is worse than the bug they catch.

## Environment

Every variable in `.env.example` is optional. The project runs with an empty
`.env.local` so a content-only contribution is never blocked. `/check` degrades
to an honest "unavailable" state without `PAGESPEED_API_KEY`.

## Debugging

`.vscode/launch.json` provides server debugging, client debugging via Chrome,
and Vitest on the current file. Source maps are on in development.

**Real-device testing is a required step, not a suggestion.** Budgets are
measured on a mid-range Android over throttled 4G. A desktop Lighthouse score
is not evidence.
