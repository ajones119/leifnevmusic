# Issue tracker: Local Markdown

Issues and specs live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Spec: `.scratch/<feature-slug>/spec.md`.
- One file per implementation ticket:
  `.scratch/<feature-slug>/issues/<NN>-<slug>.md`,
  numbered from 01.
- Triage state: a `Status:` line near the top, using
  the vocabulary in `triage-labels.md`.
- Append conversation history under `## Comments`.

## Publishing and fetching

When a skill says to publish to the issue tracker, create
the appropriate file under `.scratch/<feature-slug>/`.

When fetching a ticket, read its referenced file. Resolve
issue numbers within the relevant feature directory.

## Wayfinding

- Map: `.scratch/<effort>/map.md`, containing Notes,
  Decisions-so-far, and Fog.
- Tickets: `.scratch/<effort>/issues/NN-<slug>.md`.
- Type: research, prototype, grilling, or task.
- Workflow status: open, claimed, or resolved.
- Dependencies: `Blocked by: NN, NN`.
- Select the lowest-numbered open, unblocked ticket.
  A dependency is satisfied when its ticket is resolved.
- Set `Status: claimed` before working.
- On completion, append `## Answer`, set `Status: resolved`,
  and add a summary and link to the map's Decisions-so-far.

Wayfinding statuses apply to decision tickets; triage labels
apply when evaluating incoming issues.
