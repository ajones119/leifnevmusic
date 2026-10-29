# Leif Nev Music — color direction

## Direction

Use a warm light scheme inspired by IMGP0627: weathered porch paint, turquoise metalwork, guitar wood, and foliage. Cream and pale stone dominate the page; charcoal supplies readable text. Turquoise is the main action color, with amber and sage used sparingly.

## Palette

- Weathered cream — `#F0E9DC`: main page background.
- Warm stone — `#E4DED2`: cards and alternate surfaces.
- Porch charcoal — `#171D19`: headings, body text, and text on turquoise buttons.
- Deep moss — `#26332C`: secondary dark tone, reserved for occasional emphasis.
- Porch turquoise — `#72B8C9`: primary button backgrounds and active accents.
- Guitar amber — `#965C36`: highlighted display text and small accents.
- Leaf sage — `#596C49`: supporting labels and green accents; mix with cream for pale section backgrounds.

## CSS variables

```css
:root {
  --porch-charcoal: #171D19;
  --deep-moss: #26332C;
  --weathered-cream: #F0E9DC;
  --warm-stone: #E4DED2;
  --porch-turquoise: #72B8C9;
  --guitar-amber: #965C36;
  --leaf-sage: #596C49;

  --page-bg: var(--weathered-cream);
  --surface: var(--warm-stone);
  --text: var(--porch-charcoal);
  --muted: color-mix(in srgb, var(--porch-charcoal) 72%, var(--weathered-cream));
  --action: var(--porch-turquoise);
  --accent: var(--guitar-amber);
  --support: var(--leaf-sage);
  --line: color-mix(in srgb, var(--text) 18%, transparent);
}
```

## Usage

- Use Allura exclusively for "Leif Nevener" in the hero. Use DM Sans for every other text role.
- Design mobile first. Center the same composition on desktop in an 800px maximum content column, including its gutters. Background surfaces may span the viewport. Dedicated desktop refinement is a later pass.
- The hero places "Songs to slow down to" with air above the oval's upper border and the handwritten name across its lower foreground. Zoom the portrait slightly and use a horizontal cream fade that finishes above the knees, retaining the oval upper silhouette. Leave a generous gap below the name. Place Instagram, Facebook, and Spotify in the first action row, then bare Cash App and Venmo icons in the second; the payment links have accessible names without visible labels or button fills.
- The name writes once on entry; the portrait uses very small ambient movement. Keep links immediately usable, provide a continuous-motion pause control, and use a completed, still composition for reduced motion.
- Maintain a breathable, minimal, intimate sunrise atmosphere. The oval portrait and handwriting are the principal expressive moment; the larger footer adds a small fish loop and an inspirational quote.
- Full page behavior and acceptance criteria are in [.scratch/site-launch/spec.md](.scratch/site-launch/spec.md).

- Keep the site predominantly light. Use cream for the page and stone for distinct content surfaces.
- Use charcoal text on turquoise buttons. Turquoise is primarily a fill or decorative accent; use a darker tone for small text on light backgrounds.
- Use `--muted` for secondary text, rather than pale stone.
- A soft sage surface uses `color-mix(in srgb, var(--leaf-sage) 12%, var(--weathered-cream))` with charcoal text.
- Focus outlines use `color-mix(in srgb, var(--action) 50%, var(--porch-charcoal))`.
- Derive component colors from the variables so palette changes remain consistent across the site.
- The parallax photo fades into `--page-bg`, with a soft oval border fade and no blur. Retain subtle continuous floating motion, additional pointer movement, pause control, and reduced-motion support.

## Reference preview

The local palette study is [palette-preview.html](output/imagegen/IMGP0627-parallax/palette-preview.html). It includes the color strip, live swatch controls, CSS export, and an illustrative page layout. The palette above matches its saved light-mode defaults; page copy and layout remain exploratory.

## Mobile proof refinement - 2026-10-28

Use generous, deliberate spacing and quiet controls so the portrait, lettering, and later restrained motion remain the expressive moments. The user accepted the show table treatment; preserve it. Increase room around the tagline, between the name and icon group, and between major sections. This updates the initial row order and button treatment; full visual approval is still pending.

### Mobile proof revision 03

Shift the photo framing slightly downward and lengthen the portrait a little. Increase the curved DM Sans tagline from 16 to 19 design-space pixels. Allow the Allura name to overlap the lower photographic fade, retaining the established breathing room before the icons. Visual approval remains pending.

### Hero image selection - 2026-10-29

The user generally selected the bridge photograph for the hero. Modern typography is preferred, with two composition studies still under review: a large name crossing the lower photo edge, and lettering placed between the bridge and musician. Keep the existing warm palette. No final typography/composition or full visual-proof approval has been recorded.

### Painted hero framing study - 2026-10-29

The painted walkway is the user's leading direction. Compare the current inset frame with mobile edge-to-edge and taller edge-to-edge options; the user wants more visual weight. Both wider studies remove top/side image gutters and corner rounding, retaining the centered 800px boundary on desktop. Caption/name and tagline below the image are temporarily hidden, and the visible motion button is removed at the user's request. Final framing and full proof approval remain pending.
