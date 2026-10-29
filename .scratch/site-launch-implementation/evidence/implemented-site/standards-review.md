# Standards review

Reviewed af9806a...0aa4c38 against AGENTS.md, docs/agents/domain.md, docs/agents/issue-tracker.md, DESIGN.md and approved-handoff.md. No glossary/ADRs or additional coding-standard files exist.

No hard documented-standard violations found. The approved tighter bridge, omitted caption/pause control, and preview-only `/` account destinations are intentional overrides.

## Finding

- **[P2] Decouple behavioral tests from editable launch content — tests/site.test.ts:16–53 (also 70–73).** Tests clone/index the live `site.shows` and assert its sample IDs and times, while production tests require the actual config to remain incomplete and the CLI to exit 1. The documented normal launch step (remove samples, approve content, set siteUrl) therefore makes `npm test` fail even when the site is correct; removing all samples also creates undefined show fixtures. `.github/workflows/validate.yml` runs this suite on pushes and Render waits for CI, so filling the required launch data blocks the intended deploy path. Use explicit independent preview/show fixtures for negative/formatting cases, and exercise CLI failure through an isolated fixture/config input rather than requiring the real config to be invalid. This is a concrete test-maintainability regression at the config/release seam, not a hard style violation.

No additional smell-only findings warrant changes at this scope.
