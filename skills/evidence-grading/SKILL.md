---
name: evidence-grading
description: The rules that grade every claim in Alexander's Library (tiers T1–T6 from study design and size) and the controversy labels, and how to change them safely. Use when touching evidence.ts, tier display, controversy handling, or when a grade looks wrong.
---

# Evidence grading

The library's value is calibration: a reader must be able to tell a meta-analysis from a press release at a glance. So grades are computed in code from study designs, never chosen by a model.

## Rules (packages/core/src/evidence.ts)

| Design | Tier |
| --- | --- |
| guideline, systematic review, meta-analysis | T1 |
| randomised controlled trial | T2 |
| registry, cohort, case-control | T3 |
| cross-sectional, case series, case report | T4 |
| animal, in vitro, computational | T5 |
| expert opinion, news or web, unknown | T6 |

- **Small study downgrade:** an RCT or cohort/registry/case-control with a stated sample size under 100 drops one tier.
- **Claim tier:** the best tier among its supporting sources.
- **Replication rule:** a claim supported by a single source cannot sit at T2; one trial is capped at T3 until a second supports it.
- **Design source:** a design declared by the origin (Europe PMC publication type, ClinicalTrials.gov study type) wins over the reader's classification; the reader fills in when the origin is silent.
- After the skeptic merges claims, the kept claim's tier is recomputed from all its sources.

## Controversy labels

Separate from the tier, set by reader and skeptic: `settled`, `debated`, `contested`, `fringe`, `commercial_hype`. "Fringe" marks an idea outside the mainstream for examination; it is never a reason to hide a claim. Frontier work stays visible with its label.

## Changing the rules

Grading changes alter what people believe about the evidence, so they need explicit approval (`change-discipline`).

1. Write the new expectation as a test in `tests/evidence.test.ts`.
2. Change `evidence.ts`.
3. Existing claims keep their stored tier. To regrade, write a one-off script that recomputes `claims.tier` with `tierForClaim(claimSourceDesigns(...))` for every non-superseded claim, and run it deliberately.
4. Update the legend on the home page (`apps/web/src/app/page.tsx`) and the README table.

## When a grade looks wrong

Check, in order: the source's `declared_design` and `design` columns, `sample_size`, the number of sources linked in `claim_sources`. A wrong grade is almost always a wrong design classification upstream, not a grading bug.
