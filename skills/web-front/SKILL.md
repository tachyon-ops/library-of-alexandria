---
name: web-front
description: Conventions for the Alexander's Library Next.js front — server components and server actions, the visual system built around the evidence bar, accessibility and copy voice. Use when changing anything in apps/web.
---

# Web front

## Data flow

- Pages are server components with `export const dynamic = "force-dynamic"`. They read through `@lib/db` repo functions via `sql()` from `src/lib/data.ts`.
- Writes go through server actions in `src/app/actions.ts`, which call repo functions (`createTopic`, `requestResearch`) and `revalidatePath`.
- Client components are the exception: today only `AutoRefresh`, which calls `router.refresh()` while a topic is queued or researching. Do not add client-side data fetching or API routes for data the server can render.
- The front never imports `@lib/agents` or `@lib/crawlers`. It requests work; the worker does it.

## Visual system (src/app/globals.css)

- One bold device: the **evidence bar**. Each finding carries an inset bar whose width and depth of blue encode its tier (`[data-tier]` sets `--tier` and `--bar`). Keep everything else quiet; do not add a second accent device.
- Palette tokens on `:root`, with a dark set under `prefers-color-scheme: dark`. Add colours as tokens, never as literals in components.
- Type: Literata for headings and reading text (summary, findings, debates); Public Sans for interface text. Reading measure about 70 characters.
- Controversy labels are small tinted flags (`.flag[data-kind]`); colour is backed by the label's words, never colour alone.
- Avoid template chrome: no all-caps eyebrows, no numbered markers unless the content is a sequence, no card grids with shadows.

## Accessibility

Visible focus (`:focus-visible`), semantic headings in order, tables with `scope` on headers, status text in a `role="status"` element, layout that works at 390 px width, reduced motion respected.

## Copy

Plain verbs, sentence case, named for what the reader understands. Buttons say what happens ("Research this topic", "Add branch"). Empty states tell the reader what to do next. Errors state what stopped and where.

## Verify

```bash
(cd apps/web && npx tsc --noEmit) && npm run build:web
```

Then look at the page at 1280 px and 390 px, light and dark, against a database with data (the pipeline test leaves one behind when pointed at a scratch database).
