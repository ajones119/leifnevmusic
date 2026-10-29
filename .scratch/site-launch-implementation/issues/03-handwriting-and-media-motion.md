# 03: Approved bridge depth and fish media motion

**Status:** in-progress

**What to build:** A demonstrable enhancement of the approved hero and footer with handwriting, gentle portrait movement, and fish playback that remains usable with reduced motion, paused motion, media failure, or disabled JavaScript. This can be demonstrated against the approved proof independently of 02; final page integration is verified in 04.

**Blocked by:** 01 — Mobile visual proof and approval, including the user's recorded approval of the actual proof.

**Source:** [Site launch specification](../../site-launch/spec.md).

- [x] Preserve the approved painted name and bridge, with bounded subtle foreground drift. Allura/handwriting is superseded by the approved painted bridge composition; do not implement it.
- [x] Keep functional links immediately usable. The completed name remains available if enhancement fails or JavaScript is disabled; provide an accessible text equivalent for SVG lettering and tagline.
- [x] Keep ambient portrait drift within roughly five CSS pixels at 460px portrait width, scale it down on smaller screens, and ground the porch architecture. Any pointer response is optional and fine-pointer-only; mobile requires neither hover nor orientation permissions.
- [x] Follow the approved removal of the visible pause button. Pause motion when hidden and suspend hero/fish offscreen; honor reduced motion. Record this user-requested control omission accurately, without claiming a visible pause control.
- [x] Defer fish video loading until the footer approaches the viewport; use muted inline playback with no audio. Use a transparent still for reduced motion, unsupported playback, or failure, with no visible matte. Keep the decorative fish and quote readable independently of playback.
- [x] Reduced-motion mode presents the completed name and still media without parallax. Supporting interaction feedback remains restrained; avoid unnecessary runtime frameworks or animation of every section.
- [x] Demonstrate normal, reduced-motion, pause/resume, document-hidden, offscreen-footer, failed-video, and no-JavaScript behavior. Record evidence and any device limitations under Comments.

## Comments

- 2026-10-28: Published from the approved breakdown. Blocked until ticket 01 is complete, including explicit user visual approval.

- 2026-10-29: Ticket 01 explicitly approved. See approved-handoff.md and the spec's Approved implementation direction for overrides. Preview control removal/painted name supersede initial handwriting/pause-button details.

- 2026-10-29: Motion implementation claimed in codex/media-motion. Added src/scripts/media-motion.ts and media-motion-notes.md against approved data attributes. No handwriting or visible pause control per explicit approved overrides. Integrated TypeScript and actual browser verification remain pending parent integration; no implementation-coupled tests added.

- 2026-10-29: Implementation integrated on codex/site-launch. Source spec approved-direction overrides apply. Config/show tests and TypeScript check pass; actual browser validation at 320/390/430/800/1440 shows no horizontal overflow, correct configured social destinations, requested preview-only / tip fallbacks, stable composition and working skip link. H1/content/links survive no JavaScript. Reduced motion blocks parallax and fish source attachment; hidden/offscreen media suspends, and failed video retains the still. Manual pause button and handwriting were explicitly removed by the approved visual iteration. [Browser evidence](../evidence/implemented-site/browser-checks.json), [390px page](../evidence/implemented-site/site-390.png), [no-JS](../evidence/implemented-site/site-390-no-js.png), and [enlarged text](../evidence/implemented-site/site-320-text-200.png). Production launch inputs and real-device verification remain ticket04 work.

- 2026-10-29: Owner selected the desktop framed photograph and asked for a floatier automatic header motion. Added whole-photograph bob/tilt, retaining smaller foreground depth and existing reduced/hidden/offscreen gates. Framed layout, clearer faded willow portrait and researched two-sentence bio integrated into the actual site. Browser readbacks confirm changing transforms without input at desktop and mobile widths; desktop has no horizontal overflow. TypeScript, 7 behavior tests and build pass.
