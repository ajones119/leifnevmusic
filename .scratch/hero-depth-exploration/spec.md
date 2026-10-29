# Hero depth exploration

**Status:** ready-for-agent

## Aim and fallback

Explore a more convincing layered photograph while preserving the approved framed design and hiding all image boundaries. The main Astro page remains option 1. Its checkpoint is `382738676e3f14d1753ae2caa9a637e3d1b7a64e` on `codex/site-launch`.

The additive study lives at `/proof/depth-lab.html?study=depth` on the proof server (4321). The baseline switch and `/` on the main preview server (4322) return to option 1 immediately, without reverting code. Never overwrite the existing hero assets during exploration. Save edited candidates under a new, clearly named directory. Promote the winner only after owner visual review; keep the baseline assets and motion available through that promotion.

## Stages

1. **Alignment and edge audit.** Inspect the existing bridge and musician separately at matching canvas sizes. Check face, hands, guitar, silhouette, feet/contact, painted name and alpha edges. The initial lab uses current assets with deliberately stronger layer separation to reveal problems; it is not a finished option 3.
2. **Asset refinement where evidence requires it.** Create versioned edited copies: a clean, extended bridge plate and a well-registered musician cutout with soft, natural edge treatment. Extend the hidden background and retain extra image area around all edges. Keep the painted name on the bridge plane. Review likeness, hands/guitar and fill quality before adding more movement; fall back if reconstruction changes identity or creates convincing-looking but incorrect anatomy.
3. **Motion tuning.** Keep the rectangular frame stationary. Move background and foreground at different, small amplitudes and periods; preserve photographic perspective and ground contact. Retain the 12px baseline overscan and prove it covers the maximum relative displacement. Start with translation; add rotation or scale only if they improve the result without seams. Maintain automatic motion, optional fine-pointer response, reduced-motion/no-JS stills and hidden/offscreen suspension.
4. **A/B review and promotion.** Compare baseline and candidate with identical content and crop at 320/390/430px and desktop. Observe complete motion cycles, extremes, pointer positions, contact points and image edges. Check no overflow/layout shift and measure performance if asset size/runtime changes materially. If it looks like a sliding sticker, exposes seams or alters likeness, keep option 1. Approval promotes only the chosen assets/motion; remove experimental controls from the main output.

## Working the lab

- `npm run build`, then `node proof/build-depth-lab.mjs` regenerates the isolated A/B document from the current built page.
- `npm run proof` serves the existing proof directory; `npm run preview -- --port 4322` serves the main build/assets. Both servers are already running for this session.
- Lab URLs retain `?study=baseline` or `?study=depth`. The UI identifies the current asset stage, honors reduced motion and pauses its extra animations offscreen/hidden.
- The proof directory is outside Astro's published `dist`; no experiment is deployed with the main site. This file is planning/tracking, not evidence that asset refinement is finished.

## Comments

- 2026-10-29: Owner authorized exploring option 3 with an easy fallback. Option 1 checkpointed. Separate baseline/layer-motion lab created; main page and approved assets are unchanged by the experiment. Next step is the alignment/edge audit, followed by targeted asset work rather than increasing movement indiscriminately.
