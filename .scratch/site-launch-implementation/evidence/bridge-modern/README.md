# Bridge photo hero comparison

Reviewed implementation: 0b459a475c074f59fd386f1a846ceb6d998432b8 on codex/site-launch.

Open /proof/bridge-compare.html for bridge/script and bridge/modern, followed by the porch references. Both bridge treatments use the original source.jpeg (428x640px); no new generated image or reconstructed cutout was used. Palette and other content stay consistent.

Each directory contains captures at 320/390/430/800/1440px with viewport height 844px and device scale 1, and a 390px no-JavaScript/reduced-motion capture. Both have no document overflow, page errors, or failed responses. Relevant fonts and both images load; Allura is intentionally unused in the modern variant. Source photo bounds extend within the clipped frame in raw measurements. The 880px comparison page contains four 390px live frames, with no document overflow. comparison.png and capture-comparison.mjs are in bridge-modern/.

Use the existing capture-proof.mjs helper with /proof/bridge-script.html and output ./bridge-script/, or /proof/bridge-modern.html and output ./bridge-modern/. Local server must be running. Browser helpers use workstation-specific paths described in the parent evidence README.

No direction is selected or approved. Real-device checks, final higher-resolution image selection, real links and show facts remain later work. Owner review remains required; downstream tickets have not started.
