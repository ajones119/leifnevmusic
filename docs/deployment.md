# Content and launch handoff

The approved tighter painted bridge composition is implemented locally. This checkout has no GitHub remote or connected Render service. Nothing has been published. The prepared files do not create infrastructure by themselves.

## Content owner

Edit `src/data/site.ts`. The three social profiles are owner supplied. Cash App and Venmo are empty and link to `/` only in previews, as requested; production omits blank optional links. Add their real HTTPS URLs when available.

Replace or remove all sample shows, approve a factual biography, supply the final lower portrait and alt text, set the actual HTTPS production origin, and review the sharing image before setting its approval flag. Keep explicit `America/Chicago` offsets on each show's start/end; the validator catches impossible dates, reversed times and incorrect daylight-saving offsets. A show remains listed until its end, then disappears at the next successful build. The sample rows are not bookings.

Run `npm run check`, `npm test`, and `npm run build` for the non-indexed preview. `npm run validate:production` reports missing launch inputs. `npm run build:production` validates them and sets production rendering itself, including canonical/social URLs, indexing, sitemap, and removal of preview-only account fallbacks. It currently stops on five content gates. Do not deploy a preview build as the final site.

The hero includes reconstructed layers and edited floor lettering. Approving the layout does not confirm likeness, hands/guitar detail, background edits, or a final sharing crop. Review `/media/social-preview.jpg` and the hero before launch. The current previews keep the name as a semantic hidden H1, omit the visible below-image caption/tagline and motion button at the owner's request, and still honor reduced motion. Do not describe the page as having a visible pause control or as a complete manual WCAG audit.

## GitHub and Render setup

1. Select the owner-controlled GitHub repository and production branch, then push the reviewed code. No remote was supplied in this session.
2. Review `render.yaml`, or create a Render Static Site with build command `npm ci && npm run build:production`, publish directory `dist`, and Node 24. The blueprint chooses deployment after CI passes. Set the actual origin in the content config before the production build. If a separate preview deployment is wanted, use `npm run build` there; its HTML and robots file block indexing.
3. Configure the domain/DNS and verify HTTPS, production canonical URL, sharing image, robots and sitemap at the live origin. Confirm the real account/venue links and content after deployment.
4. Save the service's deploy hook as the GitHub Actions repository secret `RENDER_DEPLOY_HOOK`, never in config, client code, or a committed file. Set repository variable `RENDER_REBUILD_ENABLED` to `true` only after setup. Until enabled, the daily workflow skips its job.
5. Put the workflow on the default branch. Dispatch `Rebuild upcoming shows` manually, inspect the resulting Render deploy through completion, then verify the next scheduled run. A successful hook request only means a deploy was requested, not completed.

The prepared schedule runs daily at 11:17 UTC. GitHub schedules can be delayed or dropped, and public-repository schedules can be disabled after inactivity. Monitor Actions and Render failures; daily rebuilds can leave a finished show visible until the next successful build. Exact-time removal is outside this implementation.

Current official documentation, checked 2026-10-29: [Render static sites](https://render.com/docs/static-sites) describes free static hosting with workspace bandwidth/pipeline quotas; confirm the account's current eligibility and usage before setup. [Render deploy hooks](https://render.com/docs/deploy-hooks), [Blueprint reference](https://render.com/docs/blueprint-spec), and [GitHub scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule) cover the prepared configuration. No account, API key, or paid service was created or used.

## Verification still requiring the owner or devices

Final biography, portrait, show facts, production origin, sharing image, and likeness approvals remain pending. Actual iOS Safari and Android Chrome link/media checks were not available in this desktop session. External social pages did not return usable content to the read-only fetcher; the supplied URLs are preserved exactly, but live destination ownership was not independently established. Push deployment, scheduled invocation and live-origin validation remain unverified until infrastructure is selected.
