# Approved implementation handoff

User approval: 2026-10-29, "I think i like tighter crop, lets charge agead with that". Integration branch codex/site-launch. Proof source 232f8b5, evidence 90d7870. Ticket 01 complete; 02/03 unblocked.

Read docs/agents/domain.md, issue-tracker.md, source spec (approved-direction section overrides older visual requirements), DESIGN.md and your assigned ticket.

## Visual and assets

Preserve proof/bridge-painted-tight.html and its CSS composition: mobile edge-to-edge .9 ratio, centered 800px max desktop, .depth-crop translateY(-10px) scale(1.14) origin 0 30%, source canvas 2/3 at top -8%, musician left6% top8% width/height88%. DM Sans, painted name, hidden accessible H1. No extra visible name, tagline, sample-date label or account-placeholder note. Social-first, icon-only payments. No visible motion button (explicit user request). Blank account values must hide links; proof remains available separately.

Optimized public assets already prepared: /media/hero-background.webp (1024x1536), hero-musician.webp (1024x1536), fish-still.webp (320 square), fish-loop.webm (transparent), social-preview.jpg (1200x630, owner approval pending). /fonts/DMSans-Variable.ttf and OFL. Original source assets unchanged.

## Ownership and DOM seam

Ticket02 implementer owns Astro scaffold/package/lock/config, src/data/site.ts and content validation/filtering, page markup/styles, content tests, README instructions. Parent handles SEO/release/infrastructure files after merges. Ticket03 implementer owns src/scripts/media-motion.ts only plus media notes; do not edit Astro page, package, shared CSS or public files. Ticket02 provides data-depth-frame on frame, data-depth-subject on subject canvas, data-fish-container on decorative media container, data-fish-video on video (data-src pointing to /media/fish-loop.webm, preload none, muted playsinline loop), data-fish-still on fallback still. Fish still visible by default; no video src until enhanced. Script marks container data-playing=true only after playback actually starts; CSS displays video only then. Script path imported from Astro page after integration. No visible controls.

## Verification boundaries already specified

The approved specification explicitly requires build-time config validation/production rejection and rendered upcoming shows. These are the agreed public behavior seams: validate config and production validation command (catch malformed/incomplete content, not external account ownership); upcoming show listing/formatting (sorting, end time, DST, not live date removal). Follow tdd at those spec-required seams. Visual and motion behavior are verified through actual browser controls/page states by parent, not implementation-mirroring tests. Do not ask again about the settled composition. Do not write implementation-coupled tests.

## Release bounds

Missing real accounts, verified show dates, final bio/portrait/origin/sharing approval stay unset/placeholder. Preview builds allowed; documented production validation must reject missing inputs/samples. No services provisioning, API keys, public push or deploy until concrete inputs/setup are provided. No GitHub remote currently known. All unrelated untracked source media remains untouched.
