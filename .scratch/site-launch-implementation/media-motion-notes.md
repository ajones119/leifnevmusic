# Approved bridge and decorative fish enhancement

Implemented in `src/scripts/media-motion.ts`, using only the approved data attribute seam in `approved-handoff.md`. The page must import this module once. The bridge and painted name remain registered together inside the photograph. After the owner selected the framed desktop treatment and requested a floatier header, an oversized inner scene now drifts gently behind a fixed clipping window, with a tiny independent musician movement inside the approved `.depth-crop` composition. Whole-frame rotation was removed after the owner reported exposed edges.

- The inner scene has 12px overscan on all sides and floats up to 2.5px horizontally and 5.5px vertically without rotation, scaled down below 460px frame width. The border/clipping window remains stationary.
- Foreground drift is capped at 1.5px horizontally and 0.95px vertically at 460px and larger frame widths, decreasing proportionally below that width. Fine-pointer response is included in these limits. No device orientation or touch pointer response.
- Hero animation freezes offscreen or while the document is hidden, and resumes without accumulating elapsed hidden time. Reduced motion resets both photograph and foreground transforms to its markup baseline and stops animation. Changing the system preference updates both hero and fish immediately.
- The fish uses the still by default, including no JavaScript and missing IntersectionObserver. Video `data-src` becomes `src` only within 240px of the viewport, with reduced motion off and the document visible. Actual playback waits for intersection with the viewport. Media is muted, inline and looped.
- The container receives `data-playing="true"` only on an eligible `playing` event, so the still remains until actual playback. Pause, waiting, ending, rejection or decode error restores the still. Offscreen/hidden states pause playback; returning resumes it. Reduced motion removes the source to cancel ongoing loading and keeps the still. Initial reduced motion never attaches the video source.
- Stale asynchronous play attempts cannot re-enable playback after state changes. A playback rejection or media error leaves a permanent still fallback for the page load, avoiding repeated failed attempts.
- There is **no visible pause/resume control**, per the user's explicit override. Hidden/offscreen suspension and reduced motion are supported; do not report a manual control as an accessibility feature.

## Verification handoff

Read AGENTS.md, domain and issue tracker instructions, approved spec/handoff, DESIGN.md, ticket03, and the TDD skill with testing/mocking references. No glossary or ADR directory exists in this checkout. No implementation-coupled motion tests were added: the pre-agreed motion verification seam is real browser behavior on the integrated page. Parent will validate normal motion, bounded foreground movement, stationary bridge/name, reduced preference changes, hidden document, offscreen hero/footer, failed video, no-JavaScript baseline, and actual mobile-device limitations. This module adds no runtime dependency.

Static TypeScript compilation and integrated browser evidence are pending the Astro scaffold integration. Ticket03 stays in progress until those checks are recorded.

## Selected layered mode

The owner subsequently selected the slower layer study. Main config uses `media.heroMotion: layered` with 32s camera, 28s subject and 34s bridge CSS animations matching that proof. The JS layered controller only gates playback for intersection, visibility and reduced motion; it does not run a frame loop or pointer response. No-JS leaves the original still. `media.heroMotion: baseline` restores the earlier fixed-window drift implementation. Earlier amplitude notes in this document describe that retained baseline. Main CSS defines the selected layered paths.

## Scissortail replacement

Owner requested the scissortail handoff asset in place of fish. Copied the single-cycle VP9-alpha WebM (640x640,24fps,4.084s,no audio) and PNG poster into public/media. Renamed active media config and data hooks to generic footer names. Playback/fallback gates are unchanged; multiply blending is removed. Live Chromium showed transparent playback, a loaded poster, and repeated playback. TypeScript, seven tests and build passed. Actual iOS/Android verification remains a release check, not claimed here. Historical fish evidence refers to the earlier revision.

## Scissortail replay hold

Owner requested a three-second delay between plays without extending the downloaded clip. Native looping is disabled in markup and controller. On ended, keep the decoded final frame visible and schedule replay after3000ms; seek to zero and play the loaded source. Offscreen/hidden states cancel the pending timer and show the still; returning resumes playback eligibility and honors any remaining elapsed-time delay. Reduced motion clears the replay state and unloads video as before. The media files are unchanged. TypeScript/build passed; live Chromium readbacks confirmed ended+paused with final frame visible, then automatic replay after approximately3s across observed cycles (250ms polling resolution).
