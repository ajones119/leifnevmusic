# 03: Approved bridge depth and fish media motion

**Status:** ready-for-agent

**What to build:** A demonstrable enhancement of the approved hero and footer with handwriting, gentle portrait movement, and fish playback that remains usable with reduced motion, paused motion, media failure, or disabled JavaScript. This can be demonstrated against the approved proof independently of 02; final page integration is verified in 04.

**Blocked by:** 01 — Mobile visual proof and approval, including the user's recorded approval of the actual proof.

**Source:** [Site launch specification](../../site-launch/spec.md).

- [ ] Preserve the approved painted name and bridge, with bounded subtle foreground drift. Allura/handwriting is superseded by the approved painted bridge composition; do not implement it.
- [ ] Keep functional links immediately usable. The completed name remains available if enhancement fails or JavaScript is disabled; provide an accessible text equivalent for SVG lettering and tagline.
- [ ] Keep ambient portrait drift within roughly five CSS pixels at 460px portrait width, scale it down on smaller screens, and ground the porch architecture. Any pointer response is optional and fine-pointer-only; mobile requires neither hover nor orientation permissions.
- [ ] Follow the approved removal of the visible pause button. Pause motion when hidden and suspend hero/fish offscreen; honor reduced motion. Record this user-requested control omission accurately, without claiming a visible pause control.
- [ ] Defer fish video loading until the footer approaches the viewport; use muted inline playback with no audio. Use a transparent still for reduced motion, unsupported playback, or failure, with no visible matte. Keep the decorative fish and quote readable independently of playback.
- [ ] Reduced-motion mode presents the completed name and still media without parallax. Supporting interaction feedback remains restrained; avoid unnecessary runtime frameworks or animation of every section.
- [ ] Demonstrate normal, reduced-motion, pause/resume, document-hidden, offscreen-footer, failed-video, and no-JavaScript behavior. Record evidence and any device limitations under Comments.

## Comments

- 2026-10-28: Published from the approved breakdown. Blocked until ticket 01 is complete, including explicit user visual approval.

- 2026-10-29: Ticket 01 explicitly approved. See approved-handoff.md and the spec's Approved implementation direction for overrides. Preview control removal/painted name supersede initial handwriting/pause-button details.
