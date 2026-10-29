# 04: Production readiness and launch verification

**Status:** needs-info

**What to build:** Integrate the complete content page and motion enhancements into a verified, production-ready artist site with accurate search/social metadata and a working content deployment and daily rebuild process. Carry out infrastructure and public launch steps only within the user's implementation/deployment authorization.

**Blocked by:** 02 — Usable, config-driven artist page; 03 — Handwriting and accessible media motion. Both transitively require ticket 01's explicit user visual approval.

**Source:** [Site launch specification](../../site-launch/spec.md).

- [x] Integrate 02 and 03 and verify the approved visual composition is preserved. Confirm no horizontal overflow, clipped lettering, overlap, or unreadable table cells at 320px, 390px, and 430px; check the centered 800px maximum column at 800px and 1440px.
- [x] Verify keyboard navigation, visible focus, 200% text zoom, touch target sizes, WCAG AA text contrast, accessible names, reduced/paused motion, failed video, and JavaScript-disabled content on the integrated page.
- [ ] Inspect generated HTML and verify canonical URL, approved titles/descriptions, Open Graph/social-card image and description, sitemap/robots, and indexing protection for the designated preview deployment.
- [x] Parse and verify MusicGroup JSON-LD with stable identity, factual description, image, location, and only configured social profiles in sameAs. Omit tipping links, samples, speculative facts, and MusicEvent markup; visible content and structured data agree.
- [ ] Obtain and record owner approval of portrait likeness, factual biography, account links, show facts, and sharing image. Supply the production origin, run production validation, and confirm samples and placeholders are absent from public output.
- [ ] Under setup authorization, confirm current free-hosting eligibility and prerequisites; configure GitHub-triggered Render static deployment and a daily GitHub Actions rebuild using a deploy hook stored only as a repository secret. Verify push deployment and scheduled invocation; document stale-show timing and failure attention for the owner. Never expose the hook in public files or logs.
- [ ] Verify configured account and venue destinations. Check actual iOS Safari and Android Chrome links/media where devices are available; explicitly record checks that could not be performed.
- [x] Measure a production-like build under a documented mobile test profile against Lighthouse performance >=90, CLS <=0.1, and LCP <=2.5s. Optimize hero assets and defer footer video; record measured results and any unmet targets without claiming field measurements.
- [ ] Record release evidence, content-edit/build instructions, deployment/rebuild operation, remaining limitations, and any required user action under Comments. Do not mark launch complete while required approvals, production inputs, or infrastructure verification remain outstanding.

## Comments

- 2026-10-28: Published from the approved breakdown. Implementation, provisioning, and deployment have not started. Blocked by tickets 02 and 03.

- 2026-10-29: Tickets02/03 implemented and locally verified. Production build command now sets release mode itself and fails closed on five missing content gates. Added metadata/MusicGroup, conditional canonical and absolute social image URLs, production robots/sitemap and preview indexing block; verified both preview and isolated synthetic production output without changing the owner config. Added prepared Render blueprint and CI/daily hook workflow (disabled until configured). No GitHub remote, Render service, domain or deploy hook supplied; nothing deployed.
- Local Lighthouse13.6 mobile simulation (412x823, DPR1.75, 150ms RTT, ~1.6Mbps, CPU4x): performance99, accessibility100, LCP2.115s, CLS0. First run was performance88/LCP3.981s before responsive WebP/font optimization and small-text contrast correction. These are simulated desktop measurements, not field or real-device results. Preview SEO score is reduced intentionally by noindex and absent production origin. All audits and profile details are in ../evidence/implemented-site/.
- Remaining release requirements: owner's verified show dates or explicit empty listing, final factual biography, lower portrait, production origin, sharing-image approval and likeness review; real iOS/Android checks; GitHub/Render setup, push deployment, daily-run/live-origin verification. Social URLs match owner-provided values; read-only external fetches did not return usable pages. Current preview keeps Cash App and Venmo visible with root links per user request; production omits them until configured. See docs/deployment.md. Ticket04 is incomplete and waiting for these concrete inputs/setup.
