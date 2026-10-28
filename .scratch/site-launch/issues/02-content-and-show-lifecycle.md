# Define config content and the show lifecycle

Type: grilling
Label: wayfinder:grilling
Status: resolved
Blocked by: none

## Question

What exact artist/show fields, link fallbacks, timezone rules, past-show behavior, empty state, sample-content launch gate, and update workflow should the specification require? The user wants one config owner, sample show rows, a placeholder portrait and short biography, and no external widgets initially.

## Comments

- Social URLs: Instagram, Spotify, Facebook. Tip URLs: Venmo, Cash App.
- Show rows need date, place name, place URL, and performance time.
- Do not treat sample events as real event structured data or invented biography as verified artist history.

## Answer

The user accepted config-driven chronological shows, America/Chicago times, expiration after performance end through daily rebuilds, "More shows soon" with an Instagram link for the empty state, hiding blank account links, and replacing preview samples and placeholder biography before launch. One owner edits config and commits to GitHub. The implementation contract and verification requirements are consolidated in [the specification](../spec.md).
