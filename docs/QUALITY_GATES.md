# Quality gates

No milestone completes until every gate passes.

| # | Gate | Criteria | Automated by |
|---|---|---|---|
| 1 | **Brand** | Every schema rule; no banned vocabulary | `validate:content` + review vs `BRAND.md` |
| 2 | **UX** | Proof reachable in one action; every interaction returns information; no hover-only affordances | Review |
| 3 | **Accessibility** | WCAG 2.2 AA; axe zero violations; keyboard-complete; screen readers (below); 200% zoom; 400% reflow; forced-colors; reduced motion | `lint` + manual |
| 4 | **Performance** | Budgets in `config/performance.ts`, on a real mid-range Android over throttled 4G | `check:budgets` + real device |
| 5 | **SEO** | Unique title/description; one `h1`; canonical; OG; JSON-LD; sitemap; robots; content server-rendered | Review |
| 6 | **Maintainability** | New case study publishable in <4h; no file >300 lines; ADR per decision | Review |
| 7 | **Code quality** | `verify` passes; zero `any`; zero warnings | CI |
| 8 | **Motion** | ≤8 patterns; every one has a declared job and a reduced-motion variant | Review of `animations/` |
| 9 | **Responsiveness** | 320→2560px, no horizontal scroll; ledgers readable at 320px; targets ≥44px | Manual |
| 10 | **Cross-browser** | Latest 2 Chrome/Safari/Firefox/Edge; iOS Safari; Android Chrome; degrades without JS | Manual |
| 11 | **Documentation** | A senior stranger can build without asking a fundamental question | **Cold-read test** |

## Screen readers — named, so the gate is testable

- NVDA + Firefox (Windows)
- VoiceOver + Safari (iOS)
- VoiceOver + Safari (macOS)

"Screen-reader pass" without naming versions is untestable. Lighthouse
accessibility 100 is the floor, not the goal: it cannot detect most of gate 3.

## Failed-gate policy

Decided in advance, while nobody is under deadline pressure.

| Gate | Near launch |
|---|---|
| Brand | **Blocks.** This is the product. |
| Accessibility | **Blocks.** |
| Performance | **Blocks.** Remove the feature. |
| SEO | Blocks for titles/headings/canonical. Structured data may follow in week 2. |
| Code quality | **Blocks.** |
| Motion | Ship with the pattern disabled rather than delaying launch. |
| Cross-browser | Blocks for Safari and Android Chrome. Others may follow. |
| Documentation | Ships within 7 days of launch. Does not block. |

> **Never raise a budget to pass a gate. Remove the feature.**
