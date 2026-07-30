# ADR-0005 — Open decisions blocking content

**Status:** open · **Date:** 2026-07-30

These are not engineering blockers. The foundation is complete without them.
They block **authoring**, and therefore launch.

## 1. The name

`config/site.ts` carries `name: 'TBD'`.

Unresolved: own name vs. studio name. It determines the repository name, the
domain, every metadata string, the JSON-LD `Person`, and the voice of every
authored sentence. A brand whose central claim is personal accountability
operating under a studio pseudonym is internally contradictory.

**Recommendation on record:** use the personal name; keep any studio name as a
legal or invoicing entity only.

## 2. The branded / non-branded split

The headline search result has not been separated into branded and non-branded
queries. The first case study cannot state its attribution limit honestly
without this, and `resultsSchema` requires `attributionLimit`.

**The schema will block the first case study until this is known.** That is
correct behaviour.

## 3. One outcome in client currency

No revenue-denominated outcome exists yet. `resultsSchema.currency` requires
client currency — bookings, enquiries, rupees.

**Recommendation on record:** obtain this before authoring. It is a phone call,
not a build task, and it is worth more than the next hundred hours of
engineering.

## 4. Canonical email

Two addresses are in circulation. `config/site.ts` leaves `contact.email` empty
rather than guessing.
