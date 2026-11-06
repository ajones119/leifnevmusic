import test from 'node:test';
import assert from 'node:assert/strict';
import { site } from '../src/data/site.ts';
import { siteMetadata, structuredDataJson } from '../src/data/seo.ts';

test('canonical, social image and entity IDs share the configured HTTPS origin', () => {
  const meta = siteMetadata(site);
  assert.equal(meta.canonical, 'https://leifnevenermusic.com/');
  assert.equal(meta.sharingImage, 'https://leifnevenermusic.com/media/social-preview.jpg');
  const graph = meta.structuredData['@graph'];
  const artist = graph.find(node => node['@type'] === 'MusicGroup')!;
  const page = graph.find(node => node['@type'] === 'WebPage')!;
  assert.equal(page.mainEntity?.['@id'], artist['@id']);
  assert.ok('sameAs' in artist);
  assert.deepEqual(artist.sameAs, Object.values(site.socials).filter(Boolean));
  assert.ok(!JSON.stringify(graph).includes('cash.app'));
  assert.equal(siteMetadata({ ...site, siteUrl: site.siteUrl + '/' }).canonical, meta.canonical);
});

test('unconfigured preview does not invent a canonical origin or entity URLs', () => {
  const meta = siteMetadata({ ...site, siteUrl: '' });
  assert.equal(meta.canonical, undefined);
  assert.equal(meta.sharingImage, undefined);
  assert.equal(meta.structuredData['@graph'].length, 1);
});

test('JSON-LD cannot close its script element through editable content', () => {
  const input = { name: '</script><script>alert(1)</script>' };
  const encoded = structuredDataJson(input);
  assert.ok(!encoded.includes('<'));
  assert.deepEqual(JSON.parse(encoded), input);
});
