# Grass bird flight — local proof

Implemented the approved four-bird SVG interaction. No deployment or push performed.

## First-arrival refinement

Added a one-shot observer of a one-pixel sentinel at the document bottom. Browser checks confirmed four birds on first arrival, zero on leaving and returning, and four again after refresh. Tap and keyboard replay remain available. No storage or cookie API is used. Evidence: `proof/grass-birds-first-arrival.png`.

## Checks

- Build and TypeScript checks pass; diff whitespace check passes.
- Browser widths: 320, 390, 430, and 1440px; no horizontal overflow. Keyboard focus is visible, and Enter releases four birds. Rapid repeated activations retain one flock.
- Pointer activation on the left side releases four birds traveling left; center/keyboard activation travels right.
- The flight layer has `pointer-events: none` and does not intercept page links. The original pending Cash App/Venmo new-tab change is preserved.
- Controlled browser lifecycle harness passed all 11 assertions: initial enhancement, four-bird creation, stacking prevention, completion cleanup, cooldown, replay, reduced-motion cancellation and disabling, motion re-enabling, hidden-page cleanup, offscreen-grass cleanup, and resize cleanup.
- Reduced-motion and hidden-document states were simulated in the harness against the actual production module; native OS preference changes and physical mobile Safari were not tested.
- No browser console errors observed.

## Evidence and repeatability

- Mobile screenshot: `proof/grass-birds-mobile.png`.
- Integration harness: `proof/grass-birds-lifecycle-check.html`. To rerun, temporarily copy it to `public/__bird-check.html`, open `/__bird-check.html` on the Astro dev server, and wait for the title `PASS: bird lifecycle`. Leave the viewport unchanged while it runs. Remove the public copy afterward; it is not a production route.
- A run interrupted by responsive viewport changes correctly canceled its first flock, invalidating its cooldown timing assertion. Repeating with a stable viewport passed every assertion.
