# Domain docs

## Before exploring

Read the root GLOSSARY.md and relevant decisions in docs/adr/.

If GLOSSARY-MAP.md exists later, follow its links to the
glossaries relevant to the task.

Proceed silently when these files are absent. Create domain
docs lazily through domain-modeling as terms and decisions
are resolved.

## Layout

This project uses a single context:

- GLOSSARY.md: shared domain vocabulary.
- docs/adr/: numbered architecture decision records.

## Vocabulary and decisions

Use glossary terms consistently in issues, proposals, and code.

When a needed concept is missing, reconsider the terminology
or note the gap for domain-modeling.

Surface conflicts with existing ADRs explicitly, identifying
the decision and why it may need revisiting.
