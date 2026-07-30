# features/

Brand-meaningful modules. Populated in Sprint 02, in this order (Phase 04,
Deliverable 15):

```
1. components/ui/disclosure    ← four interactions depend on it
2. features/evidence/frame     ← the visual signature
3. features/evidence/source-line
4. features/evidence/metric
5. features/annotation         ← highest-stakes typography
6. features/evidence/exhibit   (composes 3 + 4 + 5)
7. features/evidence/ledger
8. features/evidence/open-question
9. features/pair               (+ text equivalent)
10. features/trace
```

Dependency rule: `features/` may import from `components/`. Never the reverse.
