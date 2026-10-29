# Leif Nevener music

An Astro static artist page based on the approved tight painted bridge composition. Node 22.23.4 or newer is required; Node 26.3.0 was used during implementation.

## Local work

Run `npm.cmd ci`, then `npm.cmd run dev`. Astro serves the artist page at the printed local address. `npm.cmd run build` creates the non-indexed preview in `dist`; `npm.cmd run preview` serves that output. The separate original visual studies remain available with `npm.cmd run proof`.

Edit artist copy, real profiles, tip destinations, shows, media paths, and release approvals in `src/data/site.ts`. Instagram, Facebook, and Spotify use owner-provided profiles. Cash App and Venmo currently have no supplied destinations. At the owner's request, previews show these icons linking to `/`; production omits blank optional accounts. Never replace missing values with invented accounts.

Use explicit offset-bearing timestamps for shows, such as `2026-11-06T19:00:00-06:00`. Validation checks America/Chicago offsets for the actual instant, including daylight-saving transitions. Shows sort by start time and disappear only after their end at build time. Updating a page already open does not remove a show live. Preview sample rows have explicit `sample` flags and an accessible sample caption; they are unconfirmed demonstrations.

## Verification and release gate

`npm.cmd test` exercises config validation and the public upcoming-show listing, including Chicago DST, overnight shows, canceled/ended rows, empty listings, URL validation, and release gates. Tests run with Node's built-in test runner and TypeScript stripping.

`npm.cmd run validate:production` must succeed before release. It currently fails deliberately because real show facts, final biography/portrait, production HTTPS origin, and sharing-image approval remain outstanding. `npm.cmd run build:production` runs this validation before Astro. `build:production` sets `SITE_RELEASE=production` itself so the rendered page excludes preview-only root account fallbacks. Preview builds remain non-indexed. Production metadata, MusicGroup JSON-LD, robots and sitemap are included; absent origin-dependent URLs are omitted until configured. See `docs/deployment.md` for release setup and outstanding inputs.

The page is complete without JavaScript. `src/scripts/media-motion.ts` progressively enhances the hero and footer, respects reduced motion, suspends hidden/offscreen animation, and defers fish video downloads. Hero imagery includes reconstructed photographic details; final likeness approval is still needed. Real iOS Safari and Android Chrome media/link checks require devices and are not implied by a desktop build.

Self-hosted DM Sans Latin WOFF2 (weights 400-600), the original font, and its OFL license live under `public/fonts/`. Approved optimized media is in `public/media/`; original source assets and visual studies are preserved.

The fish is decorative, transparent, muted and deferred; reduced motion and playback failures retain the still. The visible motion button is intentionally omitted per the approved review changes. Local automated checks do not replace real-device or manual accessibility validation.
