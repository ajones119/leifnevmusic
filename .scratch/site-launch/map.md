# Leif Nevener site launch — Wayfinder map

Label: wayfinder:map

## Destination

An implementation-ready specification for a primarily mobile, single-page artist site. This effort produces planning documents and decisions; implementation follows separately.

## Notes

- Apply Wayfinder, Grilling, and Domain Modeling. Use frontend-design and emil-design-eng for visual and motion decisions.
- Audience: social followers looking for upcoming dates and attendees scanning a show QR code to tip or find social accounts.
- Confirmed visual direction, hero composition, fonts, link rows, motion, footer treatment, and public identity live in the resolved hero decision below.
- Config-driven artist information, shows, Instagram/Spotify/Facebook URLs, Venmo/Cash App URLs. User supplies real account links later.
- Show section: sample dates, linked places, times. No third-party widgets in the first release.
- About: image followed by a short two-to-four-sentence biography; placeholders permitted during implementation, final image to follow from user.
- Astro static output on Render with GitHub-triggered deployments is accepted. Consolidated release criteria are in spec.md for review.
- SEO: Oklahoma City musician identity, structured data, metadata, social preview. Sample shows and invented biography facts must not become factual production claims.
- Existing image assets: output/imagegen/IMGP0627-parallax/. Follow README.md for layer alignment and small movement; production image review remains required.
- Existing fish variants: wip-assets/. Choose the best-fitting variant during visual review.

## Decisions so far

- [Define the hero typography, composition, and motion](issues/01-hero-typography-motion.md): Allura name, DM Sans elsewhere, two link rows, restrained handwriting/parallax, playful fish footer, and Oklahoma City identity confirmed.
- [Define config content and the show lifecycle](issues/02-content-and-show-lifecycle.md): Config ownership, show expiration/empty state, account link fallbacks, and production content gates confirmed.

## Specification

- [Leif Nevener single-page site specification](spec.md): concrete implementation handoff, including the user-requested 800px centered desktop column. Release and handoff review tickets remain open for artifact review, not additional audience or layout discovery.

## Fog

- No remaining product discovery blocks the mobile visual proof. The specification defines visual approval as the first implementation milestone.
- Final domain, account URLs, biography, portrait, and show data remain owner-supplied launch inputs; infrastructure setup remains implementation work.

## Out of scope

- Product implementation, deployment, account setup, and media generation during this phase.
- External widgets, CMS, commerce, and dedicated attendee sharing tools for the initial release.
