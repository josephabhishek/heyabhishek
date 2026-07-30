# Content workflow

## Adding a document

1. Create `content/<kind>/<slug>.mdx`, or `content/<kind>/<slug>/index.mdx`
   with co-located `exhibits/` if it carries media.
2. Write the frontmatter. Consult `lib/content/schemas.ts` — it is the contract.
3. Run `npm run validate:content`. It reports **every** failure at once.
4. Commit with a Conventional Commit message. **Commit messages become the
   public reason-for-revision field**, so write them as if published.

## The seven beats — invariant

Every case study, teardown and journal entry follows this order. The invariance
is what makes a small number of documents read as a practice rather than a list.

1. **Situation** — in the client's words
2. **What I found** — including what surprised you
3. **The evidence** — exhibits, sources, ledgers
4. **What I decided, and what I rejected** — the highest-value beat
5. **What happened** — client currency, with the attribution limit inside the claim
6. **What I now know** — about the *problem*, never the industry
7. **Still unresolved** — the open question

## When validation fails

The fix is the content. Not the schema.

| Message | Meaning |
|---|---|
| `metric.caveat is required` | You wrote a number without stating its limits |
| `source is required` | An exhibit has no provenance |
| `At least one mistake is required` | The case study is too flattering to be true |
| `At least three exhibits are required` | The claims are not yet evidenced |
| `results.attributionLimit is required` | You have not said what you cannot prove |
| `Alt text must describe what the evidence shows` | "screenshot" is not a description |

If a rule genuinely no longer applies, change it in `lib/content/schemas.ts`,
update `docs/BRAND.md`, update `tests/content-schemas.test.ts`, and write an
ADR explaining why. Three deliberate steps — because weakening enforcement
should be hard.

## Media

- Images: AVIF or WebP, ≤200KB delivered, dimensions always declared.
- Recordings: ≤400KB, poster-first, one Pair per document maximum.
- Source files live outside the repo (`/media-source`, git-ignored).
- Exhibit IDs are stable and permanent: they are citable.
