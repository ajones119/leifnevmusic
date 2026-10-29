# Painted walkway comparison evidence

Reviewed implementation: 55039926c6767d8abd926849ae7709c916769147 on codex/site-launch.

Open /proof/bridge-painted.html, or compare all three at /proof/depth-compare.html. The third option replaces only the background plane with a non-destructive generated image edit containing weathered deep-moss LEIF / NEVENER paint on the floor. The existing musician layer and motion behavior remain unchanged. Painting provenance is next to the new image asset. The old backgrounds and hero pages remain available.

Checked 320/390/430/800/1440px, plus 390px with JavaScript disabled/reduced motion: no document overflow, failed responses, or page errors. DM Sans and all three image assets load. Source canvas bounds intentionally extend within the clipped frame. Reviewed mobile lettering, perspective, shadows, crop, and readable caption. Real-device checks remain deferred.

check-motion.mjs and motion-checks.json verify active motion, anchored name/frame, pause/resume, offscreen pause, hidden-tab pause, and dynamic reduced-motion behavior. The 1300px comparison screenshot contains three 390px live frames. The screenshot helper uses the existing workstation-specific headless Chromium setup documented in the parent evidence README.

No final composition is approved. Final photo/likeness and generated-background review remain pending. This is an exploratory comparison within ticket 01; downstream tickets remain unstarted.
