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
- The hero places "Songs to slow down to" along the oval's upper border and the handwritten name across its lower foreground. Place Cash App and Venmo in the first action row, then Instagram, Facebook, and Spotify in the second.
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
