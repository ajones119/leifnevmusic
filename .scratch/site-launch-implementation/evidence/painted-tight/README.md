# Tighter crop and stronger inset evidence

Reviewed implementation: 232f8b5ac0017184101440fbdf48629a9fe4982f on codex/site-launch.

Compare /proof/painted-width-compare.html. The new choices are first: /proof/bridge-painted-tight.html and /proof/bridge-painted-sleeve.html. Older references remain. The taller direction was rejected; no final alternative is approved.

The tighter frame is the same shorter edge-to-edge size, with a 14% scene zoom and a separate generated background copy with inset painted lettering. The bridge and unchanged musician are cropped together; the existing foreground drift still works within that group. The stronger inset has a 12px mobile cream border, square corners and a larger photo. No extra visible name, tagline or motion button was reintroduced.

At 390px: tighter photo 390x433 at x=0/y=0; stronger inset 366x407 at x=12/y=12. At 1440px: tighter width 800 at x=320, inset width 768 at x=336. frame-measurements.json records both across all five widths. Both have document scroll width equal to viewport width, images/fonts loaded and no browser/request errors. Raw canvas bounding boxes extend inside the clipped photo by design.

Screenshots use viewport height 844px and device scale 1; the capture helper scrolls to load lower lazy images before returning to top. Full-page and no-JavaScript/reduced-motion captures are included. comparison.png shows all five options with 390px frames in a 1300px viewport. The helper uses workstation-specific Chromium paths, documented in parent evidence notes. No real-device certification is claimed.

Source image provenance is beside 04-bridge-painted-inset-name.png. Final owner likeness/image and full visual proof approval are pending. No downstream tickets started.
