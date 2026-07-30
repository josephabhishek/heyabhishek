# ADR-0003 — TypeScript 5.9, not 7

**Status:** accepted · **Date:** 2026-07-30

## Context

`typescript@latest` is **7.0.2**. This is the exception the brief's "unless
there is a compelling production reason" clause exists for.

## Decision

TypeScript 5.9.3.

## Reasoning

`typescript-eslint@8` declares `typescript: >=4.8.4 <6.1.0`. TypeScript 7 is
outside that range, so **type-aware linting would not run.**

This project treats type-aware lint rules and `jsx-a11y` errors as quality
gates, not conveniences — the brand is enforced through the type layer. Losing
typed linting to gain a compiler version is a bad trade.

## Consequences

Revisit when `typescript-eslint` supports the TypeScript 7 line. The upgrade
should be a version bump plus a `verify` run.

## Related

The same reasoning pinned **ESLint to 9.39.5**, not 10.8.0:
`eslint-plugin-jsx-a11y@6.10.2` declares support only up to ESLint 9. Installing
ESLint 10 would require `--legacy-peer-deps`, which is exactly the shortcut that
creates future pain in a long-lived project. Accessibility linting is not
optional here, so ESLint waits for the plugin.
