# Integrated site verification

Date: 2026-10-29. Integration branch: `codex/site-launch`.

The owner approved the tighter painted bridge proof. Tickets 02 and 03 are integrated. Ticket 04 remains `needs-info`; this evidence does not authorize or claim a public launch.

## Browser checks

`browser-checks.json` records built-site checks at 320, 390, 430, 800 and 1440px. Screenshots preserve the visual results. Mobile frames fill the width, the desktop column caps at 800px, and document width matches the viewport. The 320/390px text enlargement screenshots use a simulated 200% font size, not a physical-device browser setting.

Checked keyboard skip navigation, accessible link names and target dimensions, exact owner-provided social destinations, visible preview tip icons linking to `/`, no-JavaScript content, deferred fish loading, actual muted playback, offscreen/hidden suspension, reduced motion with no video source, and video-failure still fallback. The hero's static bridge/paint framing matches the approved proof; only the musician layer drifts.

Preview output has noindex, disallowed robots, empty sitemap, and no invented canonical origin. Structured data parses and includes only the three supplied social profiles. `production-checks.json` records an isolated synthetic release build verifying canonical/absolute sharing URLs, MusicGroup identity, production indexing, empty show state and omission of unset tipping links. Its `.invalid` origin and content were never published and did not replace the owner's configuration.

## Mobile performance

Lighthouse 13.6.0 simulated mobile profile: 412x823, DPR 1.75, RTT 150ms, approximately 1.6Mbps throughput, CPU slowdown 4x. Final performance **99**, automated accessibility **100**, LCP **2.115s**, CLS **0**. Full profile and audit details are in `performance-summary.json` and `lighthouse.json`. The earlier audit is retained to document responsive-image/font optimization and the small-text contrast correction. Preview SEO is deliberately limited by noindex and the unset production origin.

These are local Chromium simulations, not field measurements or iOS/Android device verification. Automated accessibility results supplement the recorded manual/browser checks.

## Review

Independent Standards and Spec reports are retained in their respective Markdown files. Both P2 findings were fixed in `7eedb0e`; the final source revision is `22f8fcb` (including a comment correction). Seven tests, TypeScript checking and Astro build pass. See `review-resolution.md` for the two-axis resolution. Browser/Lighthouse evidence was captured at `0aa4c38`; the subsequent fixes affect config validation, fixtures and a comment, with no rendered visual or motion changes.

## Remaining launch inputs

Verified show dates or explicit approval of an empty listing; final factual biography; lower portrait; production origin; sharing-image and likeness approval. Actual mobile-device checks and GitHub/Render provisioning, push deployment, scheduled rebuild and live-origin verification remain outstanding. External account destinations preserve the exact owner-supplied URLs; live ownership was not independently verified. Nothing was deployed.

See `docs/deployment.md` and ticket 04 for the release steps and content gates.
