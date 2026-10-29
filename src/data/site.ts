export interface Show {
  id: string;
  startsAt: string;
  endsAt: string;
  venue: { name: string; url: string; city?: string; region?: string };
  sample: boolean;
  canceled?: boolean;
}

export interface SiteConfig {
  artist: {
    name: string; tagline: string; description: string;
    location: { city: string; region: string; country: string };
    bio: { paragraphs: string[]; placeholder: boolean };
    portrait: { src: string; alt: string; width: number; height: number; placeholder: boolean };
  };
  socials: { instagram: string; facebook: string; spotify: string };
  tips: { cashApp: string; venmo: string };
  timezone: 'America/Chicago';
  shows: Show[];
  siteUrl: string;
  seoTitle: string;
  seoDescription: string;
  socialImage: { src: string; alt: string; approved: boolean };
  footer: { quote: string; attribution: string };
  media: { heroBackground: string; heroMusician: string; heroBackgroundSrcSet?: string; heroMusicianSrcSet?: string; heroAlt: string; fishStill: string; fishVideo: string };
}

// All editable artist content lives here. Empty account URLs deliberately hide links.
export const site: SiteConfig = {
  artist: {
    name: 'Leif Nevener', tagline: 'Songs to slow down to',
    description: 'Leif Nevener is a musician based in Oklahoma City.',
    location: { city: 'Oklahoma City', region: 'OK', country: 'US' },
    bio: { paragraphs: ['Leif Nevener is a musician based in Oklahoma City.', 'A few words about Leif, his music, and what brings him to the stage will live here.'], placeholder: true },
    portrait: { src: '', alt: 'Portrait of Leif Nevener', width: 1000, height: 800, placeholder: true },
  },
  socials: {
    instagram: 'https://www.instagram.com/leif2e/',
    facebook: 'https://www.facebook.com/lnevener/',
    spotify: 'https://open.spotify.com/artist/0Z2G425y7DVu3fIWuyD0D1',
  },
  tips: { cashApp: '', venmo: '' },
  timezone: 'America/Chicago',
  shows: [
    { id: 'preview-nov-06', startsAt: '2026-11-06T19:00:00-06:00', endsAt: '2026-11-06T21:00:00-06:00', venue: { name: 'The listening room', url: '', city: 'Oklahoma City', region: 'OK' }, sample: true },
    { id: 'preview-nov-14', startsAt: '2026-11-14T18:00:00-06:00', endsAt: '2026-11-14T20:00:00-06:00', venue: { name: 'A neighborhood coffeehouse', url: '', city: 'Oklahoma City', region: 'OK' }, sample: true },
    { id: 'preview-dec-05', startsAt: '2026-12-05T17:00:00-06:00', endsAt: '2026-12-05T19:00:00-06:00', venue: { name: 'An evening on the porch', url: '', city: 'Oklahoma City', region: 'OK' }, sample: true },
  ],
  siteUrl: '',
  seoTitle: 'Leif Nevener · Oklahoma City musician',
  seoDescription: 'Find upcoming shows and follow Oklahoma City musician Leif Nevener.',
  socialImage: { src: '/media/social-preview.jpg', alt: 'Leif Nevener carrying an acoustic guitar on a covered bridge', approved: false },
  footer: { quote: 'Leave a little room\nfor a slower song.', attribution: '' },
  media: { heroBackground: '/media/hero-background.webp', heroBackgroundSrcSet: '/media/hero-background-640.webp 640w, /media/hero-background-800.webp 800w, /media/hero-background.webp 1024w', heroMusicianSrcSet: '/media/hero-musician-640.webp 640w, /media/hero-musician-800.webp 800w, /media/hero-musician.webp 1024w', heroMusician: '/media/hero-musician.webp', heroAlt: 'Leif carrying his acoustic guitar on a covered bridge.', fishStill: '/media/fish-still.webp', fishVideo: '/media/fish-loop.webm' },
};

function validHttps(value: string, hosts?: string[]): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && (!hosts || hosts.includes(url.hostname));
  } catch { return false; }
}

export function upcomingShows(config: SiteConfig, now = new Date()) {
  const format = (date: Date, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: config.timezone, ...options }).format(date);
  return config.shows.filter(show => !show.canceled && Date.parse(show.endsAt) > now.getTime())
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
    .map(show => {
      const start = new Date(show.startsAt);
      const end = new Date(show.endsAt);
      const clock = (date: Date) => format(date, { hour: 'numeric', minute: date.getUTCMinutes() ? '2-digit' : undefined, hour12: true }).toLowerCase();
      let startTime = clock(start);
      const endTime = clock(end);
      if (startTime.endsWith('am') === endTime.endsWith('am') && show.startsAt.slice(-6) === show.endsAt.slice(-6)) startTime = startTime.replace(/\s[ap]m$/, '');
      return { ...show, month: format(start, { month: 'short' }), day: format(start, { day: '2-digit' }), time: `${startTime}–${endTime}` };
    });
}

export function validateSite(config: SiteConfig, options: { production?: boolean } = {}): string[] {
  const errors: string[] = [];
  for (const [field, value] of Object.entries({ 'artist.name': config.artist.name, 'artist.tagline': config.artist.tagline, 'artist.description': config.artist.description, 'artist.location.city': config.artist.location.city, 'artist.location.region': config.artist.location.region, 'artist.location.country': config.artist.location.country, seoTitle: config.seoTitle, seoDescription: config.seoDescription, 'footer.quote': config.footer.quote })) {
    if (!value.trim()) errors.push(`${field} is required`);
  }
  const services: [string, string, string[]][] = [
    ['instagram', config.socials.instagram, ['instagram.com', 'www.instagram.com']],
    ['facebook', config.socials.facebook, ['facebook.com', 'www.facebook.com']],
    ['spotify', config.socials.spotify, ['open.spotify.com']],
    ['cashApp', config.tips.cashApp, ['cash.app']],
    ['venmo', config.tips.venmo, ['venmo.com', 'www.venmo.com', 'account.venmo.com']],
  ];
  for (const [name, url, hosts] of services) if (url && !validHttps(url, hosts)) errors.push(`${name} must be an HTTPS URL on its intended service`);
  if (config.siteUrl) {
    if (!validHttps(config.siteUrl)) errors.push('siteUrl must be an HTTPS origin');
    else if (new URL(config.siteUrl).origin !== config.siteUrl.replace(/\/$/, '')) errors.push('siteUrl must contain only an origin');
  }
  if (config.timezone !== 'America/Chicago') errors.push('timezone must be America/Chicago');
  const ids = new Set<string>();
  for (const show of config.shows) {
    if (!show.id.trim() || ids.has(show.id)) errors.push(`Duplicate or missing show ID: ${show.id}`);
    ids.add(show.id);
    if (!show.venue.name.trim()) errors.push(`${show.id}: venue name is required`);
    if (show.venue.url ? !validHttps(show.venue.url) : !show.sample) errors.push(`${show.id}: venue URL must use HTTPS`);
    for (const timestamp of [show.startsAt, show.endsAt]) {
      const match = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})([+-])(\d{2}):(\d{2})$/.exec(timestamp);
      const local = match && new Date(`${match[1]}Z`);
      const instant = new Date(timestamp);
      if (!match || !local || !Number.isFinite(local.getTime()) || !Number.isFinite(instant.getTime()) || local.toISOString().slice(0, 19) !== match[1]) {
        errors.push(`${show.id}: invalid offset-bearing timestamp ${timestamp}`);
        continue;
      }
      const actualOffset = (local.getTime() - instant.getTime()) / 60000;
      const zone = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', timeZoneName: 'shortOffset' }).formatToParts(instant).find(part => part.type === 'timeZoneName')!.value;
      const zoneMatch = /GMT([+-])(\d+)(?::(\d+))?/.exec(zone)!;
      const zoneOffset = (Number(zoneMatch[2]) * 60 + Number(zoneMatch[3] || 0)) * (zoneMatch[1] === '-' ? -1 : 1);
      if (actualOffset !== zoneOffset) errors.push(`${show.id}: timestamp offset disagrees with America/Chicago`);
    }
    if (!(Date.parse(show.endsAt) > Date.parse(show.startsAt))) errors.push(`${show.id}: end must follow start`);
  }
  if (!config.artist.bio.paragraphs.length || config.artist.bio.paragraphs.some(text => !text.trim())) errors.push('artist.bio needs nonempty paragraphs');
  if (!config.artist.portrait.placeholder && (!config.artist.portrait.src || !config.artist.portrait.alt.trim() || config.artist.portrait.width <= 0 || config.artist.portrait.height <= 0)) errors.push('artist.portrait needs an image, alt text and dimensions');
  const localSocialImage = /^\/(?!\/)[^\s\\?#]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(config.socialImage.src);
  if (!localSocialImage && !validHttps(config.socialImage.src)) errors.push('socialImage.src must be a root-relative image path or an HTTPS URL');
  if (!config.socialImage.alt.trim()) errors.push('socialImage.alt needs an image description');
  if (options.production) {
    if (config.shows.some(show => show.sample)) errors.push('Remove or verify all sample shows before production');
    if (config.artist.bio.placeholder) errors.push('Approve the final bio before production');
    if (config.artist.portrait.placeholder) errors.push('Approve the final portrait before production');
    if (!config.siteUrl) errors.push('siteUrl is required for production');
    if (!config.socialImage.approved) errors.push('Approve socialImage before production');
  }
  return errors;
}
