# Visual proof evidence

Reviewed implementation: `0f98e7696567a9731c4d94960f9c2419cf24b871` on `codex/site-launch`.

Open the runnable proof with `npm.cmd run proof` at http://127.0.0.1:4321/.

PNG filenames encode CSS viewport width; screenshots use device scale 1 and an 844px viewport height. Full-page captures include all sections. `mobile-proof-390-hero.png` captures the first viewport. `mobile-proof-390-no-js.png` was captured with JavaScript disabled and reduced motion enabled; the proof is intentionally static. `width-checks.json` records dimensions, font/image loading, target sizes, and browser errors. Measurements and visual inspection are proof evidence, not production or real-device certification.

Captured with locally installed Puppeteer Core and headless Chromium (chromium-1234), awaiting local fonts and network idle. `capture-proof.mjs` is a workstation-specific evidence helper, not an application dependency; its import and executable path refer to this workstation's existing browser-tools installation. Run `node .scratch/site-launch-implementation/evidence/capture-proof.mjs http://127.0.0.1:4321/proof/mobile.html` while the proof server runs. Chromium requires permission to launch outside the filesystem sandbox in this session.

No functional account links are supplied; controls are explicitly illustrative. All sample events and portrait/biography placeholders remain visible as preview content. No user visual approval has been recorded.
