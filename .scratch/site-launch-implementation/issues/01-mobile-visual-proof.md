# 01: Mobile visual proof and approval

**Status:** needs-info

**What to build:** A reviewable mobile composition for Leif Nevener's artist page that settles the visual treatment before complete implementation. Follow the source specification and established design direction.

**Blocked by:** None (first milestone; can start when implementation is requested).

**Source:** [Site launch specification](../../site-launch/spec.md).

- [ ] Present a runnable proof and captured evidence at 390px covering the oval layered portrait, face and guitar visibility, Allura name, DM Sans curved tagline and body text, warm palette, and chosen type scale.
- [ ] Show the complete name with readable contrast, tip row followed by social row, usable touch targets, and no functional-link delay. Use real configured destinations when available; hide missing links. Any illustrative account controls are clearly identified and never point to invented destinations.
- [x] Include representative shows, portrait/biography placeholders, section spacing, and fish/quote footer so the whole mobile composition can be reviewed. Samples and placeholders are clearly identified.
- [ ] Check 320px and 430px for overflow, clipping, overlap, label readability, and table wrapping; preserve the centered 800px maximum composition at wider widths.
- [ ] Review the layered photograph's face, hands, guitar, and cutout edges; record concerns for release review. Show still/completed-name behavior without requiring production motion implementation in this ticket.
- [ ] Record the proof location, reviewed revision, screenshots, and width-check results under Comments.
- [ ] Obtain and record the user's explicit approval of that actual visual proof under Comments. Revisions requested by the user are addressed before this checkbox is checked.

## Approval gate

Do not mark this ticket complete or start 02 or 03 until explicit user approval of the proof is recorded. Producing screenshots, passing checks, or receiving approval of this ticket breakdown does not satisfy this gate. If the proof is ready but approval is pending, set Status to needs-info and leave it incomplete.

## Comments

- 2026-10-28: Breakdown approved for publication. Visual proof has not been built or approved. Implementation must be requested separately.
- 2026-10-28: Still mobile visual proof implemented at `proof/mobile.html`, with styles, self-hosted Allura/DM Sans fonts and licenses, and run instructions in `proof/README.md`. Run `npm.cmd run proof` (or `node proof/server.mjs`), then open `http://127.0.0.1:4321/`. No package installation is required. Optional static hosting must serve the repository root because asset references are root-relative.
- 2026-10-28: All five account controls are clearly illustrative non-interactive spans, because real destinations are unavailable. Three sample show rows, separate portrait placeholder, biography placeholder, and still fish/quote footer are present. Production motion/configuration and downstream tickets remain untouched.
- 2026-10-28: Source asset inspection identifies colored fringe around the reconstructed musician's outline, especially jeans/shoes, and bright shoe-edge residue. Owner must approve face/likeness, hands, guitar/fret/fitting detail, and subject/ledge grounding before release. Further composition evidence and width checks will be recorded by the coordinating agent. `node --check proof/server.mjs` and `git diff --check` passed. User visual approval is pending; this ticket remains incomplete.
