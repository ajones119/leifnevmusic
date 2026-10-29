# Version 2 — bridge comparison

Open `palette-preview.html` beside the original `../IMGP0627-parallax/palette-preview.html`.

This is a separate exploratory version; the approved palette in the root DESIGN.md is unchanged. It keeps the first preview's page layout, oval border fade, lower fade without blur, ambient floating motion, additive pointer movement, pause control, reduced-motion support, editable color strip and CSS export.

The covered bridge is kept as a coherent background plane, with the musician and guitar on a separate transparent plane. This avoids independently moving the bridge ribs and railings and breaking their shared perspective. AI editing reconstructs obscured background and may change subject details; compare with `source.jpeg` before production use.

## Comparison palette

- Warm chalk: `#F4F0E8` — background.
- Limestone: `#E3DED4` — surfaces.
- Bridge charcoal: `#20252B` — text.
- Steel slate: `#3A4652` — secondary dark tone.
- Bridge blue: `#86ABC0` — button fill and accents.
- Guitar copper: `#A6643C` — display accents.
- Soft grey: `#626D68` — supporting accents.

All palette values use CSS custom properties. This intentionally changes both photo and palette for comparison; they can be discussed and adjusted independently.

Generation used the built-in image_gen tool. Complete generation prompts are saved in `generation-prompts.json`.

The generated cutout is registered approximately to the source framing at left 6%, top 8%, width and height 88%.
