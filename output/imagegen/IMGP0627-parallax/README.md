# IMGP0627 parallax draft

Open `preview.html` in a browser to see the three layers move. These are AI-edited photographic assets produced with the built-in image_gen tool. They are not exact pixel-preserving masks of the original photograph. The musician has been reconstructed and reframed, and the obscured background has been generated. Review identity, hands, guitar and cutout edges before production use.

## Layer order, back to front

1. `01-foliage.png`: opaque distant greenery, extended across the canvas.
2. `02-porch.png`: porch screen, posts, ledge and floor; distant scenery removed to transparent alpha.
3. `03-musician.png`: transparent musician and guitar cutout, kept together.

`clean-plate.png` is an extra opaque background with the musician removed and hidden architecture reconstructed.

The generated subject did not retain original canvas placement. The preview compensates with width/height 69%, left 15%, top 19%; this is approximate art direction, not registration with the original pixels. Keep movement small (about 5 CSS pixels at a 460-pixel display width). Porch stays fixed to keep the seated subject grounded. Preview respects reduced-motion settings and includes a pause control.

## Prompt set

- Musician: Extract only the complete seated musician and entire guitar onto genuine transparency. Preserve identity, pose, clothing, guitar and photographic appearance; include hair, arms, fingers, jeans and both shoes. Remove all scenery. Request original portrait canvas placement, no crop or recenter, no added shadows or text.
- Clean plate: Remove the entire musician and guitar from the source photograph. Reconstruct hidden turquoise chevron screen, concrete ledge, wall and floor. Preserve original porch composition, framing, perspective, colors and daylight. No new objects or people.
- Foliage: Extend the soft sunlit green foliage visible through the screen into a continuous opaque portrait background. Remove all architecture, person and guitar. Match original daylight and photographic softness.
- Porch: From the generated clean plate, preserve all porch architecture, turquoise panels, posts, bars, ledge, wall and floor. Replace distant scenery through every screen opening and structural gap with genuine transparency. Preserve full canvas alignment, perspective and textures; no crop, person or guitar.

The complete generation prompts are also visible in this chat's image generation tool calls.
