# 02: Usable, config-driven artist page

**Status:** ready-for-agent
**Completed:** 2026-10-29 (implementation and integrated local verification)

**What to build:** The complete responsive Astro static page, using the approved visual proof, where visitors can immediately tip, find social profiles, read upcoming shows, and learn about the artist. One typed local config owns editable content.

**Blocked by:** 01 — Mobile visual proof and approval, including the user's recorded approval of the actual proof.

**Source:** [Site launch specification](../../site-launch/spec.md).

- [x] Deliver the hero, semantic upcoming-shows table, portrait/biography, and fish/quote footer using the approved composition. Keep the completed artist name, content, and links usable with JavaScript disabled. Motion is enhanced independently in 03.
- [x] Provide the specification's typed artist, link, show, site/SEO, footer, and media config fields. Self-host required font files/weights and preserve licenses; use recognizable vector service logos and accessible visible labels.
- [x] Hide blank account URLs and recenter remaining controls in production, while preview-only missing accounts link to / at the user's request; validate nonempty HTTPS URLs against intended services. No invented account destinations or dead placeholders are rendered.
- [x] Sort shows by start time, omit canceled and ended shows at build time, format in America/Chicago, validate explicit timestamp offsets against that timezone, and retain overnight shows until their actual end. Venue names wrap and link to configured HTTPS destinations.
- [x] Support three clearly marked sample rows in previews and the "More shows soon." empty state with Instagram when configured. Validate duplicate IDs, malformed URLs, impossible timestamps, end-after-start, and mandatory artist fields.
- [x] Provide a documented production validation command rejecting sample shows, placeholder biography/portrait, and missing production origin while allowing preview builds with explicit placeholders.
- [x] Use semantic landmarks/headings, informative portrait alt text, image dimensions, lazy loading for the lower portrait, visible focus, and at least 44px touch targets. Keep biography factual or explicitly placeholder.
- [x] Verify show sorting, overnight and daylight-saving cases, missing URLs, empty shows, malformed config, and production rejection. Check the static page at the specified widths and record evidence under Comments.

## Comments

- 2026-10-28: Published from the approved breakdown. Blocked until ticket 01 is complete, including explicit user visual approval.

- 2026-10-29: Implementation integrated on codex/site-launch. Source spec approved-direction overrides apply. Config/show tests and TypeScript check pass; actual browser validation at 320/390/430/800/1440 shows no horizontal overflow, correct configured social destinations, requested preview-only / tip fallbacks, stable composition and working skip link. H1/content/links survive no JavaScript. Reduced motion blocks parallax and fish source attachment; hidden/offscreen media suspends, and failed video retains the still. Manual pause button and handwriting were explicitly removed by the approved visual iteration. [Browser evidence](../evidence/implemented-site/browser-checks.json), [390px page](../evidence/implemented-site/site-390.png), [no-JS](../evidence/implemented-site/site-390-no-js.png), and [enlarged text](../evidence/implemented-site/site-320-text-200.png). Production launch inputs and real-device verification remain ticket04 work.
