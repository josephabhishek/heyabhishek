# Animation workflow

## The budget

**Three patterns at MVP. Hard cap of eight.** Centralised in `animations/` so
the cap is visible; scattered animation is how a cap gets silently broken.

## Every pattern declares a job

Exactly one of three. The job is the argument for the animation existing:

| Job | Meaning | Example |
|---|---|---|
| `connect` | shows that one thing caused another | Trace connective rule |
| `compare` | moves between two states so difference is felt | Pair transition |
| `disclose` | opens a claim to its evidence | Any disclosure |

**"It felt nice" is not a job.** A pattern that cannot name one of the three
does not ship.

## Adding a pattern

1. Name the job. If you cannot, stop.
2. Build it with `createTimeline({ job, id })`. The job is recorded on the
   timeline so a motion audit can read it.
3. Use duration and easing **tokens**. Never a literal number.
4. **Write the reduced-motion variant in the same file.** If it is not written,
   the pattern is not done.
5. Verify the information is fully legible with motion disabled. Information
   never lives in an animation.
6. Only `transform` and `opacity`. Anything touching layout is rejected.
7. `IntersectionObserver`, never scroll listeners.
8. Every timeline is revertible: `disposeTimeline` in the effect cleanup.

## Scroll

Lenis exists for frame synchronisation with ScrollTrigger, **not** for
scroll-jacking. Scroll velocity is never modified. It does not initialise at
all under `prefers-reduced-motion`, and native scrolling remains fully
functional if it never initialises.

If smooth scrolling interferes with anchor navigation or assistive technology in
testing, remove it. It is an enhancement, not a dependency.

## Prohibited

Page transitions · parallax · scroll hijacking · number count-ups (a number
that animates upward is theatre attached to a figure, which is the inflation
this project opposes) · text reveal on body copy · cursor effects · preloaders ·
entrance animations · anything requiring a tooltip.
