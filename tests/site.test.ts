import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { site, validateSite, upcomingShows } from '../src/data/site.ts';

test('preview accepts explicit placeholders and real service profiles, rejects malformed content', () => {
  assert.deepEqual(validateSite(site), []);
  const invalid = structuredClone(site);
  invalid.socials.instagram = 'https://instagram.com.evil.test/person';
  invalid.artist.name = '';
  const errors = validateSite(invalid);
  assert.ok(errors.some(error => error.includes('instagram')));
  assert.ok(errors.some(error => error.includes('artist.name')));
});

test('upcoming listing keeps an overnight show until its end and formats DST in Chicago', () => {
  const overnight = { ...structuredClone(site.shows[0]), id: 'overnight', startsAt: '2026-11-01T00:00:00-05:00', endsAt: '2026-11-01T02:00:00-06:00' };
  const canceled = { ...structuredClone(site.shows[1]), canceled: true };
  const config = { ...structuredClone(site), shows: [site.shows[2], canceled, overnight] };
  assert.deepEqual(upcomingShows(config, new Date('2026-11-01T07:30:00Z')).map(show => [show.id, show.month, show.day, show.time]), [
    ['overnight', 'Nov', '01', '12 am–2 am'],
    ['preview-dec-05', 'Dec', '05', '5–7 pm'],
  ]);
  assert.deepEqual(upcomingShows({ ...config, shows: [overnight] }, new Date('2026-11-01T08:00:00Z')), []);
});

test('show validation rejects duplicate IDs, impossible dates, reversed ends and wrong Chicago offsets', () => {
  for (const [field, value, fragment] of [
    ['startsAt', '2026-02-30T19:00:00-06:00', 'timestamp'],
    ['endsAt', '2026-11-06T18:00:00-06:00', 'end'],
    ['startsAt', '2026-07-06T19:00:00-06:00', 'America/Chicago'],
  ] as const) {
    const invalid = structuredClone(site);
    invalid.shows[0][field] = value;
    assert.ok(validateSite(invalid).some(error => error.includes(fragment)), fragment);
  }
  const duplicate = structuredClone(site);
  duplicate.shows.push(structuredClone(duplicate.shows[0]));
  assert.ok(validateSite(duplicate).some(error => error.includes('Duplicate')));
});

test('production rejects each unresolved release input while preview allows explicit samples', () => {
  const errors = validateSite(site, { production: true });
  for (const field of ['sample', 'bio', 'portrait', 'siteUrl', 'socialImage']) {
    assert.ok(errors.some(error => error.includes(field)), `missing ${field} release gate`);
  }
});

test('production validation command fails closed on current preview config', () => {
  const result = spawnSync(process.execPath, ['scripts/validate-site.ts', '--production'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /sample shows/);
  assert.match(result.stderr, /siteUrl/);
});

test('launch-ready content passes production validation; missing optional accounts remain valid', () => {
  const ready = structuredClone(site);
  ready.shows = [];
  ready.artist.bio.placeholder = false;
  ready.artist.bio.paragraphs = ['Leif Nevener is a musician based in Oklahoma City.', 'Find upcoming performances here.'];
  ready.artist.portrait.placeholder = false;
  ready.artist.portrait.src = '/approved-portrait.webp';
  ready.siteUrl = 'https://artist.example';
  ready.socialImage.approved = true;
  ready.socials.instagram = '';
  assert.deepEqual(validateSite(ready, { production: true }), []);
  assert.deepEqual(upcomingShows(ready), []);
});

test('venue URLs and offset-free timestamps cannot silently enter the show table', () => {
  const invalid = structuredClone(site);
  invalid.shows[0].venue.url = 'javascript:alert(1)';
  invalid.shows[0].startsAt = '2026-11-06T19:00:00';
  assert.ok(validateSite(invalid).some(error => error.includes('venue URL')));
  assert.ok(validateSite(invalid).some(error => error.includes('timestamp')));
});
