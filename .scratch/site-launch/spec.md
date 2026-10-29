# Leif Nevener — single-page site specification

Status: implementation-ready; mobile visual proof required before full implementation approval.
Updated: 2026-10-28 (mobile proof refinement; full visual approval pending)

## Approved implementation direction - 2026-10-29

The user approved the tighter painted bridge hero at proof/bridge-painted-tight.html, revision 232f8b5 (evidence 90d7870), and authorized the remaining implementation. This section supersedes conflicting initial visual/motion details below.

- Painted bridge background: output/imagegen/bridge-v2/04-bridge-painted-inset-name.png; musician: 02-musician.png. Tight scene crop: translateY(-10px), scale 1.14, origin 0 30%; shorter frame ratio .9, mobile edge-to-edge from page top, desktop centered max 800px.
- DM Sans throughout, painted name fixed to the bridge; no Allura/SVG handwriting reveal. Keep a screen-reader H1. Below-image name and tagline are hidden per user request; social-first row, bare payment icons second. No visible sample-date label or account-placeholder note.
- The user removed the visible pause-motion button. Preserve that choice. Honor reduced motion; suspend ambient motion hidden/offscreen, and defer decorative fish media. Production accessibility reporting must not claim a visible pause control exists.
- Blank real account URLs hide links and recenter remaining controls; never turn the illustrative proof icons into dead production anchors. Preview examples remain marked in data/caption and blocked by production validation.
- This approves the composition and authorizes implementation, not publication of unknown show dates, biographies, final portrait, sharing-image or likeness approvals. Keep preview indexing disabled until content/release inputs are ready.

## Purpose and audience

Build an intimate, minimal artist site for Leif Nevener, an Oklahoma City musician. Social media followers visit for upcoming performances; attendees scan a QR code to tip or find his accounts. Both journeys use the same page. Tipping and social links must work immediately without waiting for decorative animation.

## Scope and delivery

- One public page, built with Astro static output and hosted as a Render Static Site.
- Mobile is the primary design and verification target. Desktop uses the same composition, centered in an 800px maximum content column; dedicated desktop polish is a later pass.
- Include hero, upcoming shows, portrait and short biography, and a generous fish-and-quote footer.
- Artist information and shows come from one typed local config. One owner edits and commits changes to GitHub; pushes trigger deployment.
- No third-party widgets, CMS, analytics, paid integrations, commerce, dedicated sharing workflow, or separate QR landing page in the first release.
- No fixed launch date was specified. Start with free hosting and no paid services; confirm current hosting eligibility at setup. Account provisioning and deployment are outside this planning phase.

## Visual foundation and layout

Follow root DESIGN.md for the established cream, stone, charcoal, turquoise, amber, and sage palette. The impression is an intimate sunrise, expressed through warm color, photography, space, and restrained movement.

- Allura is exclusive to the rendered name, "Leif Nevener". All other text uses DM Sans, including headings, curved tagline, biography, dates, button labels, and quote. Self-host only required font files and weights, retaining their licenses.
- Center the page content with a maximum width of 800px including its internal gutters. Use approximately 20px mobile gutters, increasing to 32px at wider widths. At 320px, reduce gutters if needed to preserve usable controls.
- No alternate desktop columns or navigation pattern is required. Backgrounds may span the viewport; content follows the shared centered column.
- Start body copy at 16px or larger with comfortable line height; biography text should be around 50–65 characters per line at wide widths. Establish final type scale in the mobile visual proof.
- Use approximately 96–104px between major mobile sections and generous footer padding, refining by visual review. Avoid decorative cards, repeated badges, heavy borders, and competing visual motifs.
- At 320–430px viewport widths, every label, logo, date, and name remains readable without horizontal scrolling or clipped lettering.

## Hero

Use the existing layered portrait from output/imagegen/IMGP0627-parallax/:

1. 01-foliage.png, back layer.
2. 02-porch.png, architectural layer.
3. 03-musician.png, foreground musician and guitar.

Use README.md and preview.html in that directory as alignment references. Preserve the grounded seated figure and subtle movement. The existing assets include generated/reconstructed photographic details; review face, hands, guitar, and cutout edges before release.

- Center a slightly zoomed portrait composition with an oval upper silhouette and a horizontal cream fade that finishes above the knees; keep the musician's face and guitar visible at narrow widths.
- Place "Songs to slow down to" on a static SVG text path with breathing room above the upper oval border. Use DM Sans and retain an accessible text equivalent.
- Place "Leif Nevener" in Allura across the lower foreground, overlapping the oval. Ensure contrast with a localized soft cream transition or restrained shadow if necessary. Do not cover the face or essential guitar detail.
- Leave a generous gap beneath the name before the links. First row: Instagram, Facebook, and Spotify, in that order, with recognizable vector logos and small visible text labels. Second row: Cash App and Venmo as bare recognizable vector icons, without button fills or visible text labels, retaining accessible link names. Keep at least 44 by 44 CSS-pixel touch targets with sufficient gaps.
- Blank URLs hide their links and re-center the remaining items. Never render dead links or placeholder destinations. Validate configured URLs as HTTPS links to their intended services; use normal web links rather than relying exclusively on app-only schemes.
- The hero must not force a full-screen height or hide upcoming shows behind excessive whitespace. Prioritize the portrait, legible name, and usable action rows over fitting everything into an arbitrary viewport height.

## Motion

- On initial page entry, use one coordinated, restrained entrance: a short portrait fade, then the name-writing effect. Do not delay functional links.
- Render the Allura name as SVG glyph shapes revealed by authored stroke masks following handwriting order. A simple outline tracing or horizontal wipe does not meet the handwriting requirement. The completed name must match the selected lettering.
- Write the name once per page load, over approximately two seconds. Never loop it or tie its completion to scroll position.
- Small transform-based ambient drift may continue afterward. Limit movement to roughly five CSS pixels at a 460px portrait width, scale down on smaller screens, and keep porch architecture grounded. Pointer response is optional enhancement for fine pointers only; mobile must not depend on hover or device orientation permission.
- Use CSS or the Web Animations API where sufficient; a small isolated GSAP timeline is acceptable if it materially simplifies the stroke sequence. No React runtime or scroll animation framework is required.
- Continuous portrait and fish motion have a clear pause/resume control, which controls all ambient motion on the page. Pause motion when the document is hidden and pause fish playback offscreen.
- Reduced-motion mode shows the completed name and still media without parallax. Controls and content remain present with JavaScript disabled; progressive enhancement must not leave the artist name hidden if initialization fails.
- Supporting interactions use restrained opacity/color changes and short press feedback, approximately 100–180ms. Do not animate every section or introduce bouncing, scroll locking, or long stagger delays.

## Upcoming shows

- Use a semantic table with Date, Place, and Time columns. Place names link to configurable venue URLs. Keep it a compact table on mobile with wrapping venue names rather than horizontal scrolling.
- Sort shows by start time and show only entries whose end time is later than the build time. Render dates and times in America/Chicago, respecting daylight saving time.
- Use explicit ISO start and end timestamps with UTC offsets; validate that end follows start and offsets agree with America/Chicago for that date. Overnight performances remain listed until their actual end.
- Canceled shows are omitted initially; rescheduled shows require the owner to update the config. Do not invent ticket prices or availability.
- When empty, show "More shows soon." with an Instagram link if configured.
- Implementation previews include three clearly marked sample rows. Public launch removes samples or replaces them with verified dates. Sample events must never enter event JSON-LD.
- Rebuild on content pushes and schedule a daily rebuild, initially via a GitHub Actions workflow invoking a Render deploy hook stored as a repository secret. Do not expose the hook in client code or config. A daily rebuild means a completed show may remain listed until the next successful build; failures require owner attention. Exact-time removal is outside the initial requirement.

## About

- Place a single portrait before a two-to-four-sentence biography.
- User will supply the final portrait. A clearly identified placeholder is sufficient in previews; no image generation is required during planning.
- Biography may be placeholder copy during implementation. Do not fabricate artist history, credentials, recordings, or genre claims. Replace it with approved factual copy before public launch.
- Use descriptive alt text for informative portraits. Provide explicit dimensions or aspect ratios to prevent layout shift and lazy-load the lower portrait.

## Footer

- Use generous space and a small fish loop beside or above the quote, composed within the same 800px content column. On mobile, favor a simple stacked arrangement.
- Starting quote: "Leave a little room for a slower song." Treat it as original site copy without a fabricated attribution. Keep quote text and optional attribution configurable.
- Existing candidate video: wip-assets/fishspin-loop-transparent.webm. Existing still fallback: wip-assets/fish-loop-image-transparent.png. Compare available MP4 variants only if needed for playback compatibility; do not introduce a visible green or black matte into the light design.
- Use muted inline playback, no audio, no autoplay download at initial page load, and start playback when the footer approaches the viewport. Use the still image for reduced motion, unsupported playback, or playback failure.
- Treat the fish as decorative. The footer must remain complete and readable without video playback. Repeat useful social links here if it improves access without visual clutter.

## Config contract

Create src/data/site.ts as the initial edit point. Separate config values from component markup; do not add speculative provider adapters or a CMS interface.

Artist fields:

- name: "Leif Nevener".
- tagline: "Songs to slow down to".
- location: city "Oklahoma City", region "OK", country "US".
- description: factual short search/social description.
- bio: two-to-four-sentence approved text; track placeholder state explicitly.
- portrait: local asset reference, alt text, and placeholder state.

Links:

- socials.instagram, socials.facebook, socials.spotify: optional HTTPS URLs.
- tips.cashApp, tips.venmo: optional HTTPS URLs.
- Default missing account values to empty strings; the owner supplies the real values.

Shows:

- id: stable unique identifier.
- startsAt, endsAt: offset-bearing ISO timestamps.
- venue: name and HTTPS URL; optional city and region for disambiguation.
- sample: boolean, explicitly true for demonstration entries.
- timezone: shared America/Chicago setting rather than repeated freeform display strings.

Site and footer:

- siteUrl: canonical production HTTPS origin, supplied before public launch.
- seoTitle, seoDescription, socialImage: configurable metadata with approved defaults derived from artist identity.
- footer.quote and optional footer.attribution.
- Media references may be grouped separately in the same config; keep hero layers, portrait, and fish assets explicit.

Validate malformed nonempty URLs, duplicate show IDs, impossible timestamps, and missing mandatory artist fields at build time. A documented production validation command must reject sample shows, placeholder biography/portrait, and an absent production origin. A preview build can still run with those placeholders.

## SEO and document semantics

- Use a real H1 text equivalent for Leif Nevener, section headings for upcoming shows and about, semantic landmarks, and descriptive page title and description identifying the Oklahoma City musician.
- Emit canonical URL, Open Graph and social-card metadata with an approved sharing image and image description. Include a sitemap and robots configuration for production; prevent indexing of the designated preview deployment.
- Emit MusicGroup JSON-LD for the solo artist, with stable @id, name, URL, factual description, image, location, and sameAs containing only configured Instagram, Facebook, and Spotify profile URLs. Schema.org explicitly permits MusicGroup for a solo musician. Reference: https://schema.org/MusicGroup.
- Do not put tipping destinations in sameAs. Omit missing values, speculative genres, awards, fabricated event details, private address, and unverified dates.
- Keep visible text and structured data consistent. No promise of a search ranking or special event result. MusicEvent markup is deferred; the initial single-page show table needs no additional event pages.

## Verification and acceptance

Mobile visual proof is the first implementation milestone: show the chosen typography, oval composition, complete name, curved tagline, link rows, spacing, and fish/footer treatment at 390px, plus narrow-screen checks. User visual approval precedes building out the complete implementation. This proof belongs to the later implementation phase.

Before public release:

- Verify 320px, 390px, and 430px widths: no horizontal overflow, clipped name/tagline, overlapping controls, or unreadable table cells. Check at 800px and 1440px for a centered column no wider than 800px and usable controls; broader desktop art direction is deferred.
- Verify actual iOS Safari and Android Chrome link behavior and media playback where devices are available. Report any device checks that could not be performed.
- Check keyboard navigation, visible focus, 200% text zoom, 44px touch targets, WCAG AA text contrast, accessible names, reduced motion, paused motion, failed video, and JavaScript-disabled content.
- Verify external account and venue links against the owner-provided values. No placeholder or dead account links reach production.
- Exercise show sorting, overnight end times, daylight-saving dates, missing URLs, no upcoming dates, and sample-content production rejection. Verify the scheduled build and push deployment after infrastructure setup.
- Target mobile Lighthouse performance of at least 90 on a production-like build, CLS at most 0.1, and LCP at most 2.5 seconds under a documented mobile test profile. These are validation targets, not claimed field measurements. Prioritize and optimize the hero assets; defer footer video. Avoid adding runtime dependencies for static sections.
- Inspect generated HTML, canonical URL, social preview, sitemap/robots, and parse JSON-LD. Confirm visible copy agrees with structured data and samples are absent from production output.
- Owner approves portrait likeness, final biography, account links, show facts, and sharing image. Domain, GitHub repository, Render service, deploy hook, and scheduling are implementation prerequisites, not unresolved product decisions.

## Handoff boundaries

Planning is complete enough to begin the mobile visual proof once requested. No app scaffolding, media generation, infrastructure provisioning, or deployment is authorized by completion of this planning phase alone.

Later options: desktop refinement, Bandsintown and Spotify embeds, analytics, richer show-sharing actions, and a CMS. Revisit them only when a concrete need justifies the cost and maintenance.
