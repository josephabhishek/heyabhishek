# ADR-0001 — Stack

**Status:** accepted · **Date:** 2026-07-30

## Context

A one-person practice needs a stack maintainable alone for years. Every
dependency is a liability the author will carry personally.

## Decision

Next.js 16 (App Router) · React 19 · TypeScript 5.9 · Tailwind CSS v4 · MDX ·
Zod · GSAP + Lenis · Lucide · Vercel.

Deliberately **absent**: state manager, data-fetching library, component
library, chart library, CSS-in-JS, CMS.

## Consequences

Static generation everywhere; one runtime endpoint planned. Nothing to operate.
The bar for adding a dependency is: *does this solve a problem I actually have,
and could I replace it in a day?*
