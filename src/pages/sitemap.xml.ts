import type { APIRoute } from 'astro';
import { site } from '../data/site';

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export const GET: APIRoute = () => {
  const origin = site.siteUrl.replace(/\/$/, '');
  const location = import.meta.env.SITE_RELEASE === 'production' && origin
    ? `<url><loc>${escapeXml(origin)}/</loc></url>` : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${location}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
