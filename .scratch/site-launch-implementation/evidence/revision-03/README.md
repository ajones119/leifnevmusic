# Visual proof revision 03

Reviewed proof commit: `7e9e3611652133ea98f42029ffc7e645f190a0b4` on `codex/site-launch`.

Photo framing moves slightly down; composition is slightly taller; curved DM Sans tagline is larger; the name overlaps the lower photo fade. The invisible lower scene is clipped so it cannot obscure icons. Still proof only, awaiting user visual approval.

Captures use the same headless Chromium profile, viewport height 844px and device scale 1 described in the parent README. Widths: 320, 390, 430, 800, and 1440px. All have document scroll width equal to viewport width, local fonts/images loaded, and no page errors or failed responses. Raw bounding-box candidates are intentionally clipped source layers. No-JavaScript/reduced-motion capture is included. Real-device verification remains deferred.

Reproduce with the local server running:

```sh
node .scratch/site-launch-implementation/evidence/capture-proof.mjs http://127.0.0.1:4321/proof/mobile.html ./revision-03/
```

The original and revision-02 captures are retained for comparison. Remaining implementation tickets have not started.
