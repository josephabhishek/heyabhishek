# Contributing

## Setup

```bash
nvm use && npm install && cp .env.example .env.local && npm run dev
```

No environment variable is required for a content-only contribution.

## Before opening a pull request

```bash
npm run verify
```

## Checklist

- [ ] `npm run verify` passes
- [ ] New decisions recorded in `docs/decisions/`
- [ ] Documentation updated if behaviour changed
- [ ] No new dependency without a stated reason
- [ ] Accessibility: keyboard path checked, focus visible, no colour-only meaning
- [ ] Any motion pattern declares a job and ships its reduced-motion variant
- [ ] Content changes pass `validate:content`; commit message written as if public

## Where to put things

See `docs/FOLDER_STRUCTURE.md`. The boundary rule: **does it carry brand
meaning?** Yes → `features/`. No → `components/`.

## What not to do

- Do not weaken a content schema to make a document pass. Fix the document.
- Do not raise a performance budget to pass a gate. Remove the feature.
- Do not add `--legacy-peer-deps` to make an install work. Resolve the conflict
  or wait for the ecosystem.
- Do not use `outline: none`.
