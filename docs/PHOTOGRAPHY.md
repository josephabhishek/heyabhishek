# Photography

The hero environment is **real photography**. Nothing is illustrated and no
material is simulated in CSS — that rule comes from the art direction
(ADR-0008) and from the Sprint 04 brief, which states that texture must come
from real photography or scanned assets.

Until the frames below exist, `config/environment.ts` stays empty and
`HeroEnvironment` renders nothing. **The hero is complete without it.** The
photograph deepens the first impression; it never carries it.

## What this is not

Not a styled flat-lay. Not a stock desk. Not a rented studio.

It is **your actual working surface**, photographed honestly. The argument the
site makes is that nothing here is faked, and a staged workspace would be the
first visible lie. A slightly imperfect photograph of a real desk is worth more
than a perfect photograph of a fake one.

## Equipment

Your phone is sufficient. This is not a gear problem — it is a light problem
and a restraint problem.

- Shoot in the largest format your camera offers.
- Turn the flash off. Permanently.
- Do not use a portrait or "beauty" mode. No artificial blur.
- Do not apply a filter. Grade to nothing.

## Light

**One window, indirect, mid-morning or late afternoon.** Ahmedabad midday sun
is too hard — it produces black shadows and blown highlights, and both read as
cheap.

Shoot with the window to one side, not behind you. Let the shadows fall
naturally and do not fill them. Real directional light with soft falloff is the
entire effect; it is what "warm materials, natural shadows, realistic depth"
actually means, and it cannot be added later.

## The frames

Two are required. The others are for later sprints.

### 1. `desk-desktop` — required
The working surface, shot from **above at a slight angle** (roughly 60–70°, not
flat overhead). Landscape. The full width of the desk.

**On the surface, only what is genuinely there when you work:**
- a printed audit or analytics sheet, with your own pen marks on it
- a notebook, open, with real handwriting
- the laptop, screen off or showing something real
- a pen
- one warm object if it is true — a cup, a lamp

**Not on the surface:** anything placed for the photograph. No arranged
stationery, no props, no camera, no film. If you would not reach for it during
a working hour, it does not belong in the frame.

Leave the upper third quieter than the lower — text sits over that area.

- Target: 2400px wide, delivered under 200KB as AVIF
- Aspect: roughly 16:10

### 2. `desk-mobile` — required
**A different photograph, not a crop.** At 360px a wide desk becomes unreadable
clutter.

Move in. Three objects at most — the annotated sheet, the notebook corner, the
pen. Portrait or square. The same surface, the same light, a closer story.

- Target: 1200px wide, under 120KB
- Aspect: roughly 4:5

### 3. `annotated-sheet` — later
A single audit page flat on the desk, your handwriting legible. This becomes a
real Exhibit, not atmosphere, so the writing must actually be readable.

### 4. `portrait` — later
One photograph of you. Real portrait, looking at the camera, same window light,
no blurred office background. It appears once on the site, at a considered
moment. Faces attract first fixation more reliably than almost anything else —
using that once, deliberately, is worth more than a face in every corner.

## Processing

```bash
# Resize and convert. Keep the original; commit only the delivered file.
npx @squoosh/cli --avif '{"cqLevel":32}' --resize '{"width":2400}' desk-desktop.jpg
```

- Convert to AVIF, WebP fallback handled by `next/image`.
- **Do not sharpen.** Do not raise contrast. Do not warm it in post — the warmth
  is in the light or it is not there.
- Verify against the budget: `npm run check:budgets`. The ceiling is 200KB per
  image and it is not negotiable.

## Wiring it up

Put the files in `public/images/environment/`, then in `config/environment.ts`:

```ts
export const heroEnvironment: HeroEnvironment = {
  surface: {
    mobile: '/images/environment/desk-mobile.avif',
    desktop: '/images/environment/desk-desktop.avif',
    width: 2400,
    height: 1500,
    alt: '',
  },
};
```

No component changes are needed. The environment appears on the next build.

`alt` stays empty while the photograph is atmosphere — it is marked decorative
and hidden from assistive technology, because every factual claim on the page
is made in text. If a frame ever contains readable evidence, give it a real
description and it stops being decorative.

## The test, before you shoot

> Would a hotel owner in Udaipur recognise this as somebody's real desk, or as
> an advertisement for one?

If the second, put the props away and shoot it again.
