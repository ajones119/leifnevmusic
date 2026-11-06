# Editorial hero QA — 2026-11-06

final result: passed

## Target and evidence

- Selected target: the second displayed Image Gen result, `exec-5236bcb6-df47-4d7e-b258-a06df8af15ae.png` (Editorial caption).
- Live implementation: http://127.0.0.1:4321/.
- Mobile evidence: `proof/editorial-hero-390.png`, captured at 390 × 844.
- Compared the selected image and rendered hero visually, including a side-by-side comparison during refinement.

## Findings

No remaining P0/P1/P2 mismatches in the scoped hero change. The clean bridge photo precedes a bold, left-aligned, two-line visible H1 on cream. The name is separate from the motion layers. Existing social/support links, footer, biography, and show table remain in place.

## Checks

- Browser layout checks at 320, 390, and 430px: name fits and no horizontal overflow.
- Desktop at 1440px: framed photo and aligned title beneath it.
- Both responsive hero layers loaded successfully; social destinations retained.
- No browser console errors observed.
- Build, TypeScript check, and diff whitespace check passed.

## Follow-up polish

- The original layered photo and retained link styling differ slightly from the generated concept; generated imagery was a composition reference. The original assets retain the established motion and artist identity.
- Real-device Safari and external social/payment completion were not tested in this visual change.
