# 03: Handwriting and accessible media motion

**Status:** ready-for-agent

**What to build:** A demonstrable enhancement of the approved hero and footer with handwriting, gentle portrait movement, and fish playback that remains usable with reduced motion, paused motion, media failure, or disabled JavaScript. This can be demonstrated against the approved proof independently of 02; final page integration is verified in 04.

**Blocked by:** 01 — Mobile visual proof and approval, including the user's recorded approval of the actual proof.

**Source:** [Site launch specification](../../site-launch/spec.md).

- [ ] Coordinate a short portrait fade with an approximately two-second, once-per-load Allura handwriting reveal using authored stroke masks following writing order. The completed name matches the chosen lettering; outline tracing and horizontal wipes do not satisfy this requirement.
- [ ] Keep functional links immediately usable. The completed name remains available if enhancement fails or JavaScript is disabled; provide an accessible text equivalent for SVG lettering and tagline.
- [ ] Keep ambient portrait drift within roughly five CSS pixels at 460px portrait width, scale it down on smaller screens, and ground the porch architecture. Any pointer response is optional and fine-pointer-only; mobile requires neither hover nor orientation permissions.
- [ ] Provide one accessible pause/resume control for all continuous portrait and fish motion. Pause motion when the document is hidden and fish playback when offscreen; visibility changes must respect the user's paused preference.
- [ ] Defer fish video loading until the footer approaches the viewport; use muted inline playback with no audio. Use a transparent still for reduced motion, unsupported playback, or failure, with no visible matte. Keep the decorative fish and quote readable independently of playback.
- [ ] Reduced-motion mode presents the completed name and still media without parallax. Supporting interaction feedback remains restrained; avoid unnecessary runtime frameworks or animation of every section.
- [ ] Demonstrate normal, reduced-motion, pause/resume, document-hidden, offscreen-footer, failed-video, and no-JavaScript behavior. Record evidence and any device limitations under Comments.

## Comments

- 2026-10-28: Published from the approved breakdown. Blocked until ticket 01 is complete, including explicit user visual approval.
