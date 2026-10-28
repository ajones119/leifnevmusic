# Site launch implementation tickets

Source: [approved launch specification](../site-launch/spec.md). The original planning tickets remain unchanged.

The user approved this four-ticket breakdown on 2026-10-28. This approves ticket publication; it does not approve a visual proof, implementation, provisioning, or deployment.

## Dependencies

```text
01 Mobile visual proof + explicit user approval
 |-- 02 Usable config-driven artist page --|
 |-- 03 Handwriting and media motion -----|-- 04 Production readiness and launch verification
```

- [01: Mobile visual proof and approval](issues/01-mobile-visual-proof.md) — no blockers; first implementation milestone when implementation is requested.
- [02: Usable, config-driven artist page](issues/02-config-driven-artist-page.md) — blocked by 01, including recorded user approval.
- [03: Handwriting and accessible media motion](issues/03-handwriting-and-media-motion.md) — blocked by 01, including recorded user approval. Can proceed independently of 02 using the approved proof; integration happens in 04.
- [04: Production readiness and launch verification](issues/04-production-readiness.md) — blocked by 02 and 03.

Status labels describe triage readiness, not permission to bypass blocking edges. A blocking implementation ticket is complete only when its acceptance criteria are satisfied and completion evidence is recorded under Comments. Ticket 01 additionally requires explicit user approval of the actual proof recorded with a link to the reviewed revision. Approval of the breakdown or silence does not satisfy that gate.

Work only on the unblocked frontier after implementation is requested. Stop at the visual review gate; downstream implementation must wait for the user's approval. Public launch also requires the owner approvals and verified content in the specification.
