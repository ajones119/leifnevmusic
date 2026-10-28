# Mobile visual proof

Ticket: `.scratch/site-launch-implementation/issues/01-mobile-visual-proof.md`.

Run with an installed Node.js runtime (no dependencies or package installation):

```sh
npm run proof
```

If PowerShell blocks `npm.ps1`, use `npm.cmd run proof` or `node proof/server.mjs`.
Open http://127.0.0.1:4321/ and inspect at 390px, 320px, and 430px. Set `PORT` to use another port.
The local server binds only to 127.0.0.1 and only serves proof assets, source photo assets, and the fish still.

This is a still composition for visual approval, with the complete Allura name. The first row illustrates Cash App and Venmo; the second illustrates Instagram, Facebook, and Spotify. All five are non-interactive spans because the account destinations are not provided. The note beneath identifies this preview treatment. The production missing-URL behavior belongs to a later ticket. There is no JavaScript, motion, autoplay, provider integration, show filtering, infrastructure, or production build in this proof.

The three show rows are invented **sample content**, not artist bookings. The separate portrait is an explicit placeholder; the biography includes only the supplied location fact and clearly identified placeholder copy. The fish is a still, decorative asset. Final portrait, biography, destinations, and shows remain owner supplied.

## Design choices

The established cream, charcoal, turquoise, amber, and sage palette follows `DESIGN.md`. The signature is the photograph's oval silhouette and the amber Allura name crossing its lower foreground. The curved DM Sans tagline caps the oval. The rest is quiet: a compact show table, open section spacing, an unadorned portrait placeholder, and a generous stacked fish/quote footer. Allura is exclusive to the name; the remaining text uses DM Sans. Fonts are self-hosted from Google Fonts' `ofl/allura` and `ofl/dmsans` directories, with both SIL Open Font License files retained in `proof/fonts/`.

## Photo release concerns

The three layers reuse the documented source alignment: foliage/porch at 106%, musician at 69%, left 15%, top 19%. These AI-reconstructed assets require owner likeness approval. The source musician has fine colored edge fringe around hair/arms/guitar/jeans and a bright fringe near the left shoe. Hands, face, frets, guitar fittings, and the compositing of the seated figure against the ledge need final release review at full resolution. The still proof does not establish photographic identity fidelity.

## Approval gate

Visual evidence and viewport results are recorded in ticket 01 after browser review. User approval of that actual proof is required before ticket 02 or 03 begins. This proof does not imply approval of downstream work.
