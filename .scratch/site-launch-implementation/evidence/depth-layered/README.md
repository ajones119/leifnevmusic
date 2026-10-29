# Bridge hero depth comparison

Reviewed proof commit: 22c9011f3c73a3db96f05d99023d992d848423ba on codex/site-launch.

Compare /proof/depth-compare.html. Direct pages: /proof/bridge-edge.html (large modern name crossing the lower frame edge) and /proof/bridge-layered.html (large lettering between the bridge and musician, with a readable name below).

Both use the existing reconstructed bridge and transparent musician assets from output/imagegen/bridge-v2. The original-photo comparison remains at /proof/bridge-modern.html; owner likeness, face/hands/guitar, alpha edges, and perspective remain release review items. The user generally selected the bridge photograph; final composition and complete visual approval are pending.

Only the musician moves. Bridge, frame and typography are anchored. Ambient motion plus fine-pointer input is bounded to 3px horizontally and 1.9px vertically at a 460px frame, scaling down with frame width. No scroll framework or production animation dependency. The pause button appears only when the enhancement initializes. Reduced motion presents a still composition and disabled motion control. With JavaScript disabled the complete content remains visible, and no inactive motion control is shown.

Mobile/desktop screenshots at 320/390/430/800/1440 CSS pixels use an 844px viewport height and scale 1. Both have no document overflow or failed responses/page errors. DM Sans and all images load; Allura is intentionally unused. The existing width helper also produces a 390px no-JavaScript/reduced-motion capture. The out-of-bounds raw candidates are decorative photo canvases clipped by the frame. comparison.png uses two 390px frames in an 880px viewport.

check-motion.mjs exercises both actual rendered pages through their visible controls. motion-checks.json records passing movement, anchored frame/title, pause, resume, offscreen pause, hidden-tab pause, and dynamic reduced-motion checks. This helper and the existing capture-proof.mjs use workstation-specific headless Chromium paths described in the parent evidence README; they are not application dependencies. Real iOS/Android checks remain deferred.

This is a limited hero experiment authorized for visual review, not completion of the later production-motion ticket. Samples, account destinations, content and release validation remain pending. No downstream tickets have started.
