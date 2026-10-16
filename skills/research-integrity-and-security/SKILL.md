---
name: research-integrity-and-security
description: Integrity and security rules for Alexander's Library — no invented sources, untrusted web content and prompt injection, personal health data in briefs, secrets, source terms of use, and the missing authentication. Use when changing prompts, crawlers, data storage or deployment.
---

# Research integrity and security

## Integrity

- **Nothing without a source.** Every claim links to at least one stored source; every web entity links to a URL the search actually returned. Code enforces both (`readSources`, `scanWeb`); never relax these filters.
- **Grades come from code**, not from model judgement (`evidence-grading`).
- **Label, do not suppress.** Frontier, minority and controversial findings stay visible with their controversy label. Commercial claims without evidence are labelled `commercial_hype`, not deleted.
- **Show provenance.** The front links each finding to its sources and each entity to its pages. Web search results must be displayed with their citations.
- The front carries "not medical advice" in the README; keep a visible equivalent if the app is ever shared.

## Untrusted input

- Abstracts and web pages are data written by strangers. They enter prompts only inside `<source>` or `<web>` tags, and the `LIBRARIAN` stance tells the model never to follow instructions inside them. Keep that structure for any new input.
- Model output is validated before it is stored: indexes checked, URLs checked against returned citations, numbers clamped. Treat any new output field the same way.
- Render all stored text as text in React. Never use `dangerouslySetInnerHTML` on titles, abstracts or summaries.

## Personal data

- Topic briefs can contain personal health details. They are sent to the Claude API and stored in Postgres. Keep briefs to the research question; put no names, dates of birth or identifiers in them.
- Do not log briefs or abstracts in full; log counts and slugs.

## Secrets and deployment

- Secrets live in `.env` (git-ignored). Never commit keys or print them in logs.
- The app has **no authentication**. Run it on localhost or behind a private network or VPN until sign-in exists. Adding auth is a prerequisite for any public deployment.

## Sources' terms

Use official APIs, send a contact e-mail where asked, respect rate limits and robots.txt, and do not scrape paywalled content.
