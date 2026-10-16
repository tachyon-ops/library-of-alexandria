# Philosophy

Alexander's Library exists to answer one question well, and then any question: what does the record actually say, and how strongly?

It began with a private question, how a couple in their forties can maximise their chance of a child, and the discovery that the answer is scattered across meta-analyses, trial registries, clinic websites, regulators and fringe papers, each speaking with a different degree of authority. The library gathers that material into one tree and labels every finding with the strength of what supports it.

## What the library believes

**1. Calibration over persuasion.** A finding is worth only as much as the evidence behind it. The library's first duty is to show that weight, so a meta-analysis and a press release never look alike. Grades come from study design, computed in code, never from a model's tone or a source's confidence.

**2. Provenance is not optional.** Every claim links to the sources that support it; every clinic or treatment links to the pages that describe it. What cannot be traced is not stored.

**3. The frontier belongs in the library.** Much of what is now settled was once fringe, and some misunderstood work never receives the reading it deserves. Frontier, minority and controversial ideas are collected, kept visible and labelled. Labelling is the opposite of hiding: it lets a reader take an idea seriously without mistaking it for established fact.

**4. Disagreement is information.** Where sources contradict each other, the library records the disagreement, who holds each side, and what would settle it. A clean summary that erases a live dispute is a worse summary.

**5. Marketing is not evidence.** Treatments sold ahead of their trials are named as such. Commercial claims are collected because people meet them, and labelled because people act on them.

**6. Questions start personal and become general.** Each branch begins with a real question from a real reader (the brief). The tree grows wherever curiosity leads: fertility first, then any field.

**7. The human decides.** The library informs decisions; it does not make them. It is not medical, legal or financial advice, and it says so. Research runs when a person asks for it, and grows only as deep as a person allows.

**8. Cost and privacy are design constraints.** Every model call is counted and capped. Personal context in briefs is kept to the research question, and the system is not exposed publicly until it has sign-in.

## How it is built

The software follows the same discipline it asks of its sources:

- **Package isolation.** Grading, storage, sources, model roles, orchestration and interface live in separate packages with one-way dependencies.
- **Sound, stable APIs.** Each package exposes a small surface through its index; changing it is a deliberate, announced act.
- **A functional core.** The rules that decide what a finding is worth are pure functions, identical everywhere and fully tested.
- **Minimal side effects.** SQL in one file, HTTP in the adapters, model calls behind one interface, orchestration in one handler.
- **Bounded, reviewable change.** Every change is small enough to be read line by line, verified, and reported honestly, including what was not verified.
- **DRY, without premature abstraction.** One place for each rule; no abstraction for two things that merely look alike.

## What the library is not

- Not a chatbot. It builds a durable, inspectable record rather than answering in the moment.
- Not a news aggregator. Recency matters, but evidence weight comes first.
- Not an amplifier. It does not rank by popularity, and it does not soften or sharpen findings to make them more interesting.
- Not a substitute for a professional. It prepares better questions for one.

## The name

The Library of Alexandria aimed to hold every book in the known world and to copy what passed through its port. This library has a narrower and harder aim: to hold what is known together with how well it is known.
