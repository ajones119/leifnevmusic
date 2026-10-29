# Wheat footer verification

Implemented October29,2026 from ../spec.md. The selected RGBA2172x724 PNG was copied unchanged to public/images/wheat-footer-tile.png (source/destination SHA256 match). The strip is a decorative aria-hidden body child after main, in normal flow, with no JS. CSS repeats at432x144px below900px and576x192px from900px; the800px content column is unchanged. Footer bottom padding is zero, with24px gap before the illustration. No opacity/blending/border/shadow/ground panel was added.

Browser checks at requested320,390,800,1440,2560px found client width equal to scroll width and body bottom equal to strip bottom within fractional-pixel rounding. Multiple repeats are visible on desktop; no vertical repeat gaps, stretched plants or green background were visible. The strip has animation:none and pointer-events:none. Existing content is above it. Screenshots preserve all five layouts; browser-checks.json records geometry (the2560px viewport reports2561px after browser rounding).

A faint top scanline at800px was removed with clip-path:inset(1px0 0), cropping only the transparent top row. The source's first100 rows are fully transparent; plants and baseline are retained. The affected width was rechecked after the fix.

Normal-DPR viewport checks were at approximately1x. A native-window check also rendered correctly at1.12x. A true2x/retina or physical mobile high-density check was unavailable through this browser's viewport controls and remains a device verification item; do not claim that acceptance check completed. Reduced motion cannot alter the wheat because no motion is attached; the existing bird reduced-motion path is unchanged. Bird playback was observed above the wheat; its3s replay delay remains unchanged.

Validation: npm run check and npm run build passed. No production deployment performed.
