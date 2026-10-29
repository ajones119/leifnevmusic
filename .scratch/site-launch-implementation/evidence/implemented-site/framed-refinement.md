# Framed desktop refinement — 2026-10-29

Owner selected the framed photograph and asked for a floaty, automatic header effect. Integrated the approved desktop frame, all five visible link labels, clearer faded willow portrait and two-sentence biography into the real Astro page.

TypeScript check, all seven configuration/listing tests and Astro build passed. Live in-app Chromium checks found no horizontal overflow at desktop 1440px (client/scroll width both1425px) and mobile320px (client/scroll width both305px; scrollbar occupies remaining width).

With no pointer or scroll input, desktop photograph transforms changed from translation (1.333,5.360)px/rotation about-0.111deg to (-1.000,-2.868)px/about0.191deg; foreground transforms also changed independently. This verifies automatic movement rather than hover-only motion. Offscreen photograph transform remained exactly unchanged across readbacks. The loaded CSS contains reduced-motion transform:none!important rules for both layers; runtime sync also removes both transforms and stops scheduling when that preference is set. An actual OS preference toggle was not repeated in this browser pass. Existing fish/hidden/reduced-motion implementation is retained.

Screenshots in proof/framed-live-desktop.png and earlier portrait/bio comparison captures are local visual references. No public deployment or actual iOS/Android verification is claimed. Previous Lighthouse results predate this refinement and were not remeasured.
