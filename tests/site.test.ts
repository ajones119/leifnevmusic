import test from 'node:test';
import assert from 'node:assert/strict';
import { type SiteConfig, validateSite, upcomingShows } from '../src/data/site.ts';

function previewFixture(): SiteConfig {
  return {
    artist: {
      name: 'Fixture musician', tagline: 'Live music', description: 'A fixture artist.',
      location: { city: 'Oklahoma City', region: 'OK', country: 'US' },
      bio: { paragraphs: ['Biography awaiting approval.'], placeholder: true },
      portrait: { src: '', alt: 'Artist portrait', width: 800, height: 1000, placeholder: true },
    },
    socials: { instagram: 'https://www.instagram.com/fixture/', facebook: '', spotify: '' },
    tips: { cashApp: '', venmo: '' }, timezone: 'America/Chicago',
    shows: [
      { id: 'november', startsAt: '2026-11-06T19:00:00-06:00', endsAt: '2026-11-06T21:00:00-06:00', venue: { name: 'Sample room', url: '' }, sample: true },
      { id: 'canceled', startsAt: '2026-11-14T18:00:00-06:00', endsAt: '2026-11-14T20:00:00-06:00', venue: { name: 'Sample hall', url: '' }, sample: true },
      { id: 'december', startsAt: '2026-12-05T17:00:00-06:00', endsAt: '2026-12-05T19:00:00-06:00', venue: { name: 'Sample porch', url: '' }, sample: true },
    ],
    siteUrl: '', seoTitle: 'Fixture musician', seoDescription: 'Shows and music.',
    socialImage: { src: '/media/sharing.jpg', alt: 'Musician on a bridge', approved: false },
    footer: { quote: 'A slower song.', attribution: '' },
    media: { heroBackground: '/background.webp', heroMusician: '/musician.webp', heroAlt: 'Musician on a bridge', footerStill: '/fish.webp', footerVideo: '/fish.webm' },
  };
}

function releaseFixture(): SiteConfig {
  const ready = previewFixture();
  ready.shows = [];
  ready.artist.bio = { paragraphs: ['Approved artist biography.'], placeholder: false };
  ready.artist.portrait = { src: '/portrait.webp', alt: 'Artist portrait', width: 800, height: 1000, placeholder: false };
  ready.siteUrl = 'https://artist.example';
  ready.socialImage.approved = true;
  return ready;
}

test('preview accepts explicit placeholders and real service profiles, rejects malformed content', () => {
  assert.deepEqual(validateSite(previewFixture()), []);
  const invalid = previewFixture();
  invalid.socials.instagram = 'https://instagram.com.evil.test/person';
  invalid.artist.name = '';
  const errors = validateSite(invalid);
  assert.ok(errors.some(error => error.includes('instagram')));
  assert.ok(errors.some(error => error.includes('artist.name')));
});

test('upcoming listing keeps an overnight show until its end and formats DST in Chicago', () => {
  const overnight = { ...previewFixture().shows[0], id: 'overnight', startsAt: '2026-11-01T00:00:00-05:00', endsAt: '2026-11-01T02:00:00-06:00' };
  const canceled = { ...previewFixture().shows[1], canceled: true };
  const config = { ...previewFixture(), shows: [previewFixture().shows[2], canceled, overnight] };
  assert.deepEqual(upcomingShows(config, new Date('2026-11-01T07:30:00Z')).map(show => [show.id, show.month, show.day, show.time]), [
    ['overnight', 'Nov', '01', '12 am–2 am'],
    ['december', 'Dec', '05', '5–7 pm'],
  ]);
  assert.deepEqual(upcomingShows({ ...config, shows: [overnight] }, new Date('2026-11-01T08:00:00Z')), []);
});

test('show validation rejects duplicate IDs, impossible dates, reversed ends and wrong Chicago offsets', () => {
  for (const [field, value, fragment] of [
    ['startsAt', '2026-02-30T19:00:00-06:00', 'timestamp'],
    ['endsAt', '2026-11-06T18:00:00-06:00', 'end'],
    ['startsAt', '2026-07-06T19:00:00-06:00', 'America/Chicago'],
  ] as const) {
    const invalid = previewFixture();
    invalid.shows[0][field] = value;
    assert.ok(validateSite(invalid).some(error => error.includes(fragment)), fragment);
  }
  const duplicate = previewFixture();
  duplicate.shows.push(structuredClone(duplicate.shows[0]));
  assert.ok(validateSite(duplicate).some(error => error.includes('Duplicate')));
});

test('production rejects each unresolved release input while preview allows explicit samples', () => {
  const errors = validateSite(previewFixture(), { production: true });
  for (const field of ['sample', 'bio', 'portrait', 'siteUrl', 'socialImage']) {
    assert.ok(errors.some(error => error.includes(field)), `missing ${field} release gate`);
  }
});

test('launch-ready content passes production validation; missing optional accounts remain valid', () => {
  const ready = releaseFixture();
  ready.socials.instagram = '';
  assert.deepEqual(validateSite(ready, { production: true }), []);
  assert.deepEqual(upcomingShows(ready), []);
});

test('venue URLs and offset-free timestamps cannot silently enter the show table', () => {
  const invalid = previewFixture();
  invalid.shows[0].venue.url = 'javascript:alert(1)';
  invalid.shows[0].startsAt = '2026-11-06T19:00:00';
  assert.ok(validateSite(invalid).some(error => error.includes('venue URL')));
  assert.ok(validateSite(invalid).some(error => error.includes('timestamp')));
});


test('production requires a usable approved sharing image and description', () => {
  for (const image of [
    { src: '', alt: 'Bridge portrait' },
    { src: '/media/sharing.jpg', alt: '  ' },
    { src: 'not a URL', alt: 'Bridge portrait' },
    { src: 'https://', alt: 'Bridge portrait' },
    { src: '//other.example/sharing.jpg', alt: 'Bridge portrait' },
    { src: 'javascript:alert(1)', alt: 'Bridge portrait' },
  ]) {
    const invalid = releaseFixture();
    invalid.socialImage = { ...image, approved: true };
    assert.ok(validateSite(invalid, { production: true }).some(error => error.includes('socialImage')), JSON.stringify(image));
  }
  const remote = releaseFixture();
  remote.socialImage.src = 'https://images.example/sharing.jpg';
  assert.deepEqual(validateSite(remote, { production: true }), []);
});
