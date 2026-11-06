import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { site } from '../src/data/site.ts';
import { siteMetadata } from '../src/data/seo.ts';

const read = (path: string) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const html = read('index.html');
const { canonical, sharingImage } = siteMetadata(site);
assert.ok(canonical, 'Production origin must be configured');
assert.ok(html.includes(`rel="canonical" href="${canonical}"`), 'Missing canonical URL');
assert.ok(html.includes('name="robots" content="index, follow"'), 'Production must be indexable');
assert.ok(!html.includes('noindex'), 'Production contains noindex');
assert.ok(html.includes(`property="og:url" content="${canonical}"`));
assert.ok(html.includes(`property="og:image" content="${sharingImage}"`));
assert.ok(html.includes(`name="twitter:image" content="${sharingImage}"`));
assert.ok(html.includes('property="og:locale" content="en_US"'));
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one primary heading');
const heading = /<h1\b[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1].replace(/<[^>]*>/g, '').trim();
assert.equal(heading, site.artist.name, 'Name must remain separated in the semantic heading');
assert.ok(!html.includes('data-sample="true"'), 'Sample performances in production');
const json = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)?.[1];
assert.ok(json, 'Structured data must be present');
assert.deepEqual(JSON.parse(json), siteMetadata(site).structuredData);
const robots = read('robots.txt');
assert.ok(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
assert.ok(robots.includes(`Sitemap: ${site.siteUrl}/sitemap.xml`));
assert.ok(read('sitemap.xml').includes(`<loc>${canonical}</loc>`));
if (site.socialImage.src.startsWith('/')) {
  assert.ok(existsSync(fileURLToPath(new URL(`../dist${site.socialImage.src}`, import.meta.url))), 'Sharing image must be published');
}
console.log('Production SEO checks passed: canonical, indexing, social previews, JSON-LD, robots, sitemap, sharing asset.');
const qrPage = read('qr/index.html');
assert.ok(qrPage.includes(`rel="canonical" href="${site.siteUrl}/qr/"`));
assert.ok(qrPage.includes('name="robots" content="noindex, follow"'));
assert.ok(!read('sitemap.xml').includes('/qr/'), 'QR utility page should not compete with the artist homepage in search');
for (const extension of ['png', 'svg']) {
  const asset = `media/leif-nevener-qr.${extension}`;
  assert.ok(qrPage.includes(`href="/${asset}"`));
  assert.ok(existsSync(fileURLToPath(new URL(`../dist/${asset}`, import.meta.url))));
}
console.log('QR page checks passed: canonical, indexing policy, downloadable PNG and SVG assets.');
