---
name: decisions-log
description: How to record and consult architecture decisions for Alexander's Library in docs/decisions.md. Use before reversing an existing design choice, and after making any decision a future developer would otherwise have to rediscover.
---

# Decisions log

`docs/decisions.md` holds one entry per decision, newest at the bottom, numbered `D-NNN`. Read it before changing anything it covers; a change that reverses an entry needs a new entry that supersedes it.

## Entry format

```markdown
## D-NNN: <decision, as a short statement>

Date: YYYY-MM-DD · Status: accepted | superseded by D-NNN

**Context.** What forced a choice, in two or three sentences.
**Decision.** What was chosen.
**Consequences.** What it costs, what it makes easy, what would make us revisit it.
```

## When to write one

- A new dependency, storage choice, external service or model.
- A rule that constrains future code (a boundary, a grading rule, a cost default).
- Any choice where the obvious alternative was rejected for a reason that is not visible in the code.

Do not log routine fixes. Keep entries short; link to code paths rather than repeating them. Principles belong in `docs/philosophy.md`, the current system contract in `docs/specs.md`, and milestone plans in `docs/roadmap.md`.
