# Content and deployment handoff

## Production configuration

The canonical origin is `https://leifnevenermusic.com`. Content and account links live in `src/data/site.ts`; Astro, canonical metadata, social images, structured data, robots, and sitemap derive the origin from that config. The owner approved the existing 1200 × 630 clean bridge sharing image on November 6, 2026. The November performances and payment links are owner supplied.

`npm run build` now validates and generates **indexable production output**. `npm run build:production` is an equivalent explicit command. Both fail on unresolved production content gates. `npm run build:preview` generates a non-indexed preview, and `npm run dev` also remains non-indexed. Never deploy preview output to the production domain.

Before pushing, run:

```text
npm run check
npm test
npm run build
npm run check:seo
```

CI also checks the non-indexed preview build before producing and checking production output. SEO checks cover canonical and sharing URLs, indexability, connected JSON-LD, the primary heading, robots, sitemap, and the sharing image asset.

## Render and the live domain

The GitHub remote is `https://github.com/ajones119/leifnevmusic.git`, branch `main`. The repository's Render blueprint uses `npm ci && npm run build:production`, publishes `dist`, and waits for passing CI. An existing service using `npm run build` will now also generate production output. Direct `astro build` does not set the release environment; use the npm commands.

Live checks on November 6, 2026 returned HTTP 200 for the HTTPS origin. HTTP and `www` returned 301 redirects to the canonical HTTPS origin. The deployed page was still a preview: `noindex, nofollow`, robots `Disallow: /`, no canonical metadata, and an empty sitemap. Local changes fix these outputs; this is not evidence of a completed deployment.

After deploying, verify the homepage no longer includes `noindex`, the canonical points to `https://leifnevenermusic.com/`, `/robots.txt` allows crawling and points to `/sitemap.xml`, the sitemap lists the homepage, and `/media/social-preview.jpg` is accessible. Submit the sitemap in the owner's verified Search Console property and inspect the homepage there. No account login, Search Console verification, or deployment was performed as part of the SEO pass.

## Show freshness

Keep explicit `America/Chicago` offsets on show timestamps. A performance stays in the table until its end, then disappears at the next successful build. The daily workflow requests a Render rebuild only when repository variable `RENDER_REBUILD_ENABLED` is `true` and secret `RENDER_DEPLOY_HOOK` is configured. A successful hook request is not proof of a completed deployment. Scheduled rebuild configuration and execution still need verification in the hosting account.

## Structured data and remaining checks

The homepage connects `MusicGroup`, `WebSite`, `WebPage`, and `ImageObject` entities. It uses only the configured social profiles as identity links. Event rich-result markup is intentionally absent: Google's event experience requires a separate page focused on each event, while this site has one homepage with a schedule. Do not promise event rich results for the current table.

Physical iOS Safari and Android Chrome checks, live post-deployment indexing checks, and Search Console submission remain outstanding. No ranking or indexing guarantee is implied by passing local checks.

References: [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Google event guidelines](https://developers.google.com/search/docs/appearance/structured-data/event), [Render deploy hooks](https://render.com/docs/deploy-hooks).
