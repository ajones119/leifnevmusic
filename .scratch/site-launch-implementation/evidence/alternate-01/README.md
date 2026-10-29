# Alternate hero comparison

Reviewed proof commit: bace5b00cbd49d820e4e9d900dfaa0e12f4c7bbf on codex/site-launch.

Open http://127.0.0.1:4321/proof/compare.html for two 390px live frames, or http://127.0.0.1:4321/proof/alternate.html for the alternate page. The original is preserved at /proof/mobile.html.

The alternate keeps the same source photo layers, palette, shows, about and footer. It explores a crisp rounded rectangle, DM Sans name in deep moss, straight tagline, and closer icon spacing. This is a direction comparison, not final visual approval. The previously requested removal of the visible preview/location notes and increased original icon gap are included in the saved current proof.

All five widths (320/390/430/800/1440) have no document overflow. DM Sans and all four images load; Allura is unused in the alternate. No browser errors or failed responses. Raw out-of-bounds candidates are photo layers clipped by the frame. Social controls are 64x58px and payment controls 48x48px. Still/no-JavaScript/reduced-motion captures are included; real-device checks remain deferred.

Screenshots use device scale 1 and viewport height 844px. comparison.png uses an 880px viewport and two 390px frames. Reproduce alternate captures with the existing capture-proof.mjs helper, URL /proof/alternate.html and output argument ./alternate-01/. The helper and capture-comparison.mjs use existing workstation-specific browser tooling; they are not application dependencies.

Account controls remain non-interactive without destinations, and the show rows are sample content. The user has not selected a final direction or approved ticket 01. Downstream tickets remain blocked.
