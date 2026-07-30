# public/fonts

Self-hosted, latin-subset, variable. **Four files. 100KB total budget**,
enforced by `npm run check:budgets`.

No font CDN: a third-party request on the critical path is not acceptable
against a 1.8s LCP budget.

## Required files

| File | Family | Style | Licence |
|---|---|---|---|
| `ibm-plex-sans-latin.woff2` | IBM Plex Sans | upright, wght 400–500 | OFL 1.1 |
| `ibm-plex-sans-latin-italic.woff2` | IBM Plex Sans | italic, wght 400–500 | OFL 1.1 |
| `newsreader-latin-italic.woff2` | Newsreader | **italic**, wght 400–500 | OFL 1.1 |
| `newsreader-latin.woff2` | Newsreader | upright, wght 400–500 | OFL 1.1 |

Both families are SIL Open Font Licence 1.1: free to self-host and to use
commercially. No licence purchase, no per-domain fee, no attribution required
in the interface.

## Subsetting

Full variable fonts are 100KB+ each and would blow the budget alone. Subset to
the latin range declared in `styles/fonts.css`, and to the two weights actually
used.

```bash
pip install fonttools brotli

pyftsubset IBMPlexSans[wdth,wght].ttf \
  --output-file=ibm-plex-sans-latin.woff2 \
  --flavor=woff2 \
  --layout-features='kern,liga,tnum,lnum,onum,pnum' \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F,U+2074,U+20B9,U+2122,U+2212" \
  --variations='wght=400:500'
```

Repeat for each face. **Keep `tnum`, `lnum`, `onum` and `pnum`**: the project
switches between tabular and proportional figures deliberately (see
`styles/tokens/typography.css`), and dropping those features would silently
break the distinction.

`U+20B9` is the rupee sign. Outcomes are stated in client currency, so it is
not optional.

## After adding the files

```bash
npm run check:budgets
```

If the four files exceed 100KB, subset harder before considering anything else.
Do not raise the budget.

## Future: Devanagari and Gujarati

IBM Plex has a Devanagari sibling, which serves the year-one Hindi plan without
introducing a third family. **Gujarati coverage has not been verified** — check
before promising it. If Plex has no Gujarati, Noto Sans Gujarati is the fallback
and would be a third family, so it needs its own budget decision.
