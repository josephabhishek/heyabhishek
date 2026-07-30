# Brand — the rules this codebase enforces

This is not marketing material. It explains why the build fails when a field is
missing, so that a future contributor does not "fix" the schema.

## The premise

The category this project competes in runs on unfalsifiable claims. The
counter-position is that **every claim here can be checked.** That only holds if
it is enforced, and discipline erodes — so it is enforced by validation.

## Non-negotiables, and where they live

| Rule | Enforced by |
|---|---|
| No number appears without a denominator, a timeframe and a caveat | `metricSchema` |
| No exhibit appears without a source (tool, subject, dates, method) | `exhibitSchema` |
| Alt text must carry the *finding*, not the file type | `exhibitSchema` (min length) |
| A comparison states its conditions and its argument in words | `pairSchema` |
| Every case study names at least one mistake | `caseStudySchema` |
| Every case study names at least one rejected option | `strategySchema` |
| Every case study states its attribution limit | `resultsSchema` |
| Every case study lists at least one constraint | `caseStudySchema` |
| Every case study carries at least three exhibits | `caseStudySchema` |
| Every document ends with an open question | `openQuestionSchema` |
| Research findings carry an explicit confidence level | `researchItemSchema` |
| Industry is stated on every case study and teardown | `caseStudySchema`, `teardownSchema` |

## Rules the schemas cannot enforce

These are review responsibilities. They matter as much.

1. **Lessons must be about the problem, never the industry.** This is what makes
   a hospitality case study useful to a manufacturer.
2. **Annotations confide; captions describe.** If an annotation restates what
   the exhibit already shows, delete it.
3. **Client currency only** — bookings, enquiries, rupees. Never sessions or
   impressions unless translated in the same sentence.
4. **Branded and non-branded search are always separated**, unprompted.
5. **A mistake is always paired with the judgement it produced.** A mistake
   alone reads junior; a mistake plus insight reads senior.
6. **Never criticise a competitor explicitly**, and never make a client look
   foolish for their prior situation — they hired you, which was correct.
7. **No inflated counts.** Three live client sites is three, not "15+".
8. **No stock photography. No mockups where a real screenshot exists. No
   redrawn charts where the original exists.**

## Banned vocabulary

synergy · leverage (as a verb) · holistic · cutting-edge · innovative ·
passionate · world-class · game-changing · revolutionary · transformative ·
unlock · supercharge · elevate · curated · bespoke · "in today's digital
landscape" · "data-driven" or "ROI-focused" used as a claim rather than shown

## The review question

> Does this make the working more visible — or just the surface more finished?
> If the surface, remove it.
