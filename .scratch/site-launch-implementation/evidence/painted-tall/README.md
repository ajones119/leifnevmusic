# Painted hero width comparison

Reviewed implementation: 4b289447a770850a800dfbc514db3b2bcc183cd8 on codex/site-launch.

Comparison: /proof/painted-width-compare.html. Current inset photo remains at /proof/bridge-painted.html. New pages /proof/bridge-painted-wide.html and /proof/bridge-painted-tall.html test mobile edge-to-edge at the previous aspect ratio and a taller 3:4 frame. Top gutter and rounded corners are removed. Desktop retains the centered 800px boundary. Other content and existing motion code are unchanged.

At 390px: current image is 350x389px at x=20/y=32; edge-to-edge is 390x433 at x=0/y=0; taller is 390x520 at x=0/y=0. At 1440px the new photos are 800px wide at x=320. frame-measurements.json records all three at 320/390/430/800/1440px, including no document overflow and no visible name/tagline/pause control. The hidden H1 remains accessible.

Each new variant has full-page and first-viewport captures, raw width checks and 390px no-JavaScript/reduced-motion captures. Device scale 1, viewport height 844px. The screenshot helper now scrolls to the footer and waits for lazy images before returning to the top; this avoids blank lower images on the longer desktop proofs. DM Sans and all images load, with no page errors/failed responses. Raw source-canvas bounds are clipped by the photo frame. Real-device checks remain deferred.

comparison.png shows three 390px live frames in a 1300px viewport. capture-comparison.mjs and the existing helper use workstation-specific Chromium paths. These are evidence tools, not application dependencies.

The user's latest preference is painted, with more visual weight; no final framing or complete visual proof approval has been recorded. The other site implementation tickets remain blocked.
