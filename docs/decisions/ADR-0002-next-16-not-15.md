# ADR-0002 — Next.js 16, not 15

**Status:** accepted · **Date:** 2026-07-30

## Context

The build brief specified Next.js 15 and also instructed: *use the latest stable
versions unless there is a compelling production reason not to.* At the time of
scaffolding, `next@latest` is **16.2.12**.

## Decision

Next.js 16.2.12.

## Reasoning

The two instructions conflict, and the general instruction should win over the
specific version number. Starting a project intended to be maintained for years
one major version behind means an upgrade is owed on day one. React 19 is
satisfied as a peer; the App Router APIs used here are stable across both.

## Consequences

If a Next 16 regression is encountered, downgrading to 15 is a contained change:
no Next-16-specific API is used anywhere in this foundation.
