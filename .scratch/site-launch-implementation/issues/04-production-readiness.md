# 04: Production readiness and launch verification

**Status:** ready-for-agent

**What to build:** Integrate the complete content page and motion enhancements into a verified, production-ready artist site with accurate search/social metadata and a working content deployment and daily rebuild process. Carry out infrastructure and public launch steps only within the user's implementation/deployment authorization.

**Blocked by:** 02 — Usable, config-driven artist page; 03 — Handwriting and accessible media motion. Both transitively require ticket 01's explicit user visual approval.

**Source:** [Site launch specification](../../site-launch/spec.md).

- [ ] Integrate 02 and 03 and verify the approved visual composition is preserved. Confirm no horizontal overflow, clipped lettering, overlap, or unreadable table cells at 320px, 390px, and 430px; check the centered 800px maximum column at 800px and 1440px.
- [ ] Verify keyboard navigation, visible focus, 200% text zoom, touch target sizes, WCAG AA text contrast, accessible names, reduced/paused motion, failed video, and JavaScript-disabled content on the integrated page.
- [ ] Inspect generated HTML and verify canonical URL, approved titles/descriptions, Open Graph/social-card image and description, sitemap/robots, and indexing protection for the designated preview deployment.
- [ ] Parse and verify MusicGroup JSON-LD with stable identity, factual description, image, location, and only configured social profiles in sameAs. Omit tipping links, samples, speculative facts, and MusicEvent markup; visible content and structured data agree.
- [ ] Obtain and record owner approval of portrait likeness, factual biography, account links, show facts, and sharing image. Supply the production origin, run production validation, and confirm samples and placeholders are absent from public output.
- [ ] Under setup authorization, confirm current free-hosting eligibility and prerequisites; configure GitHub-triggered Render static deployment and a daily GitHub Actions rebuild using a deploy hook stored only as a repository secret. Verify push deployment and scheduled invocation; document stale-show timing and failure attention for the owner. Never expose the hook in public files or logs.
- [ ] Verify configured account and venue destinations. Check actual iOS Safari and Android Chrome links/media where devices are available; explicitly record checks that could not be performed.
- [ ] Measure a production-like build under a documented mobile test profile against Lighthouse performance >=90, CLS <=0.1, and LCP <=2.5s. Optimize hero assets and defer footer video; record measured results and any unmet targets without claiming field measurements.
- [ ] Record release evidence, content-edit/build instructions, deployment/rebuild operation, remaining limitations, and any required user action under Comments. Do not mark launch complete while required approvals, production inputs, or infrastructure verification remain outstanding.

## Comments

- 2026-10-28: Published from the approved breakdown. Implementation, provisioning, and deployment have not started. Blocked by tickets 02 and 03.
