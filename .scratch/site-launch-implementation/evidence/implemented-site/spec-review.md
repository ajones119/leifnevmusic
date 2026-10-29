# Spec review

Reviewed `af9806a...0aa4c38` against the approved-direction override, handoff, DESIGN.md, implementation tickets 02–04 and deployment handoff. Seven config/show tests pass. Inspected implementation and recorded integrated browser/production-fixture evidence.

## Finding

**[P2] Validate sharing-image content as well as its approval flag** — `src/data/site.ts:127` (consumed by `src/pages/index.astro:13`). The production gate checks only `socialImage.approved`. A launch-ready config with `socialImage: { src: '', alt: '', approved: true }` returns no errors, then resolves `og:image`, Twitter image and MusicGroup image to the homepage URL, with an empty image description. A malformed nonempty source can instead throw during rendering. The spec requires “Open Graph and social-card metadata with an approved sharing image and image description” (`.scratch/site-launch/spec.md:132`) and build-time malformed-URL validation (`:127`). Require a nonempty source and alt description, validate an allowed local image path or HTTPS image URL, and reject malformed sources with a descriptive validation error before approval can pass. Reproduced using a cloned config; no source edits.

No additional actionable spec deviations found in show sorting/end-time expiry/DST validation, preview indexing, production release-mode propagation, MusicGroup identity/sameAs, deferred fish playback/fallbacks, or reduced/hidden/offscreen motion. Existing content approvals, actual device checks, and GitHub/Render/live deployment verification remain explicit ticket04 gates, not code findings. The owner-requested root tip links, removed caption/tagline/pause control, and painted mobile framing were treated as approved overrides.
