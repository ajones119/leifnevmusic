# Static wheat footer — implementation handoff

## Approved intent

Add a quiet, static wheat-field silhouette along the true bottom edge of the
music site. Repeat it horizontally to fill large screens. The scissortail is
the footer's only animated accent; do not animate, scroll, parallax, or turn
the wheat into video. Preserve unrelated work and the approved site design.

## Ready assets

- Source tile: `wip-assets/wheat-footer-tile-transparent.png` (2172 x 724 RGBA).
- Original green-screen image: `wip-assets/wheat-footer-tile-green.png`.
- Existing bird handoff: `wip-assets/scissortail-loop-handoff.md`.

The transparent tile was created with the built-in image-generation editor
using this edit brief: remove all green to true alpha, preserve the wide
wheat silhouette and matching bottom baseline, retain muted guitar amber
`#965C36`, and leave both side edges clear above the baseline for repetition.
The supplied PNG is the selected deliverable; no further generation is needed.
Transparency was checked by decoding RGBA and compositing two adjacent tiles
over the site's weathered cream `#F0E9DC`. The repeat has no clipped leaves or
visible vertical gap in that check. There is minor raster antialias variation
at the bottom edge, so verify the rendered repeat at the intended CSS size.

## Implementation

Copy the transparent tile into `public/images/wheat-footer-tile.png` and use
it as a decorative CSS background, repeated on the x axis. Place the strip
after all footer content, outside the centered 800px content column, so it
fills the page width and ends flush with the bottom of the document. It must
be in normal document flow, never fixed to the viewport or behind text.

Use this starting treatment:

```html
<div class="footer-wheat" aria-hidden="true"></div>
```

```css
.footer-wheat {
  width: 100%;
  height: 144px;
  margin-top: 24px;
  pointer-events: none;
  background-image: url('/images/wheat-footer-tile.png');
  background-repeat: repeat-x;
  background-position: center bottom;
  background-size: auto 100%;
}

@media (min-width: 900px) {
  .footer-wheat { height: 192px; }
}
```

Preserve the PNG's 3:1 proportions and existing transparent space above the
wheat. Let the page's cream show through. No `cover`, horizontal stretching,
opacity reduction, blend mode, shadow, border, or extra ground panel. Remove
or relocate trailing footer padding only as needed to make the strip sit at
the final document edge; retain spacing between the existing footer content
and the illustration. Do not change the main content column's width.

Use the transparent scissortail video and poster from its handoff above the
wheat if replacing the fish is part of the implementor's current task. This
handoff does not authorize unrelated content or layout changes. The wheat
requires no JavaScript and stays identical under reduced motion; the bird
must use its still fallback when reduced motion is requested.

## Acceptance checks

- Check widths 320, 390, 800, 1440, and 2560 CSS pixels: no horizontal overflow,
  stretched plants, green remnants, visible vertical repeat seam, or bottom gap.
- Confirm multiple repeats are visible on desktop and the wheat remains
  subordinate to the artist content at mobile size.
- Keep footer links, attribution, and legal text fully above the strip and
  interactive; decorative markup must be hidden from assistive technology.
- Check the actual browser at normal and high pixel density, including the
  thin baseline where tiles meet. Test the bird's loop separately if integrated.
- Run the project's existing build/check commands after implementation.

This task prepared assets and instructions only; production site code has not
been changed by the asset-preparation agent.

## Implementation result — 2026-10-29

Implemented in src/pages/index.astro and src/styles/site.css using the unchanged selected PNG at public/images/wheat-footer-tile.png. Main preview and existing comparison documents were refreshed. Geometry and visual checks at all five requested widths passed; a fractional-raster top scanline was hidden by cropping one transparent top pixel in CSS. Build and TypeScript check pass. See evidence/README.md and screenshots. True2x/retina physical-device verification remains outstanding; available browser checks covered1x and native1.12x. No wheat animation or JavaScript was added.
