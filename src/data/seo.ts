import type { SiteConfig } from './site';

export function siteMetadata(config: SiteConfig) {
  const origin = config.siteUrl.replace(/\/$/, '');
  const canonical = origin ? `${origin}/` : undefined;
  const sharingImage = origin ? new URL(config.socialImage.src, origin).href : undefined;
  const artistId = origin ? `${origin}/#artist` : undefined;
  const websiteId = origin ? `${origin}/#website` : undefined;
  const webpageId = origin ? `${origin}/#webpage` : undefined;
  const imageId = origin ? `${origin}/#primaryimage` : undefined;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MusicGroup', '@id': artistId, url: canonical,
        name: config.artist.name, description: config.artist.description,
        ...(sharingImage ? { image: { '@id': imageId } } : {}),
        location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: config.artist.location.city, addressRegion: config.artist.location.region, addressCountry: config.artist.location.country } },
        sameAs: Object.values(config.socials).filter(Boolean),
      },
      ...(origin ? [
        { '@type': 'WebSite', '@id': websiteId, url: canonical, name: config.artist.name, inLanguage: 'en-US', publisher: { '@id': artistId } },
        { '@type': 'WebPage', '@id': webpageId, url: canonical, name: config.seoTitle, description: config.seoDescription, inLanguage: 'en-US', isPartOf: { '@id': websiteId }, mainEntity: { '@id': artistId }, primaryImageOfPage: { '@id': imageId } },
        { '@type': 'ImageObject', '@id': imageId, url: sharingImage, contentUrl: sharingImage, caption: config.socialImage.alt, width: 1200, height: 630 },
      ] : []),
    ],
  };
  return { canonical, sharingImage, structuredData };
}

// Keep JSON-LD data from becoming markup, including with future editable copy.
export const structuredDataJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
