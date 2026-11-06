# SEO update — November 6, 2026

## Implemented

- Set the owner-confirmed HTTPS production origin to `https://leifnevenermusic.com` and reuse it in Astro and generated metadata.
- Added a factual title and description focused on Leif's name, Oklahoma City guitar/music, and upcoming live shows.
- Added Open Graph site name/locale and connected artist, website, webpage, and sharing-image JSON-LD. Social identity links exclude payment accounts.
- Preserved whitespace in the two-line H1 so the semantic text is `Leif Nevener`.
- The owner explicitly approved the existing clean bridge sharing image in chat.
- Made the standard build produce production output; moved the old non-indexed build to `build:preview` and kept dev non-indexed.
- Added SEO unit tests, production-output verification, and CI checks for both preview and production.

## Verified

Ten tests, TypeScript, preview build, production build, and production SEO checks pass. Preview contains `noindex, nofollow`; production contains `index, follow`, the correct canonical and sharing URLs, valid connected JSON-LD, crawlable robots, a populated sitemap, and the sharing asset.

Live HTTPS returned 200. Both HTTP and `www` returned 301 to the canonical origin. The currently deployed HTML still includes `noindex, nofollow`, has no canonical, blocks crawling in robots.txt, and has an empty sitemap. The production fixes are local and need deployment before those live findings change. No push or deployment performed in this pass.

Event rich results were not added: Google's guidelines require a dedicated leaf page for each event. Existing factual show content and layout are retained.

## Follow-up

After deployment, recheck the live origin's metadata, image, robots and sitemap; submit the sitemap through the owner's Search Console property. Verify daily rebuilds so past performances age out of the static page.
