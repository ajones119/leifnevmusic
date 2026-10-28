# Mobile visual proof - revision 02

Reviewed proof commit: `c7aeb537ba6a311c11ff7ff2fa4d5a28f07e687d` on `codex/site-launch`.

Requested refinement: closer portrait, flatter fade completed above the knees, more space around the tagline and before the icon group, social row first, bare payment icons second, and increased major section spacing. Show table treatment preserved. Still composition only; visual approval is pending.

Captured at device scale 1 with an 844px viewport height in headless Chromium. Full-page PNG filenames encode viewport width; the 390px hero image captures the first viewport. The no-JavaScript/reduced-motion capture confirms the still composition remains complete. No real-device claim is made.

All requested widths (320/390/430px) and baseline desktop widths (800/1440px) have no document overflow. Both fonts and all images loaded, with no page errors or failed responses. Raw bounding-box overflow candidates are the zoomed source layers intentionally clipped inside `.scene`; they are not visible page overflow. Payment icon controls are 48x48px with accessible names; social controls are 64x58px. Missing destinations remain explicitly illustrative, non-interactive controls.

Reproduce while the local server runs:

```sh
node .scratch/site-launch-implementation/evidence/capture-proof.mjs http://127.0.0.1:4321/proof/mobile.html ./revision-02/
```

The helper uses the workstation-specific browser paths described in the parent evidence README. Source likeness and cutout-edge concerns remain release review items. Downstream implementation has not started.
