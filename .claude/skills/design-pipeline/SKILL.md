---
name: design-pipeline
description: Staged process for building or redesigning any UI section/page in umka-dev - skeleton first, then reference search, then best-practice styling, with a screenshot checkpoint at every stage. Use whenever adding a new section, redesigning an existing one, or when the user asks for "better design" without a specific reference already in hand.
---

# Design pipeline (skeleton -> refs -> best practices -> visual check)

Do not jump straight from a text prompt to finished Tailwind. Each section
goes through four stages, in order, and none is skipped even under time
pressure. This exists because prompt-to-code-directly is exactly why past
sections looked generic - the model reasoned about layout in words instead
of checking against something visual at each step.

## Stage 1 - Skeleton

Build the section with real content and real spacing/grid, but no visual
polish: no color beyond foreground/background/border, no shadows, no
motion, default weights. Just structure - what sits where, in what order,
at what size relative to its neighbors.

Screenshot it (see "Visual checkpoint" below) before moving on. The
question at this stage is purely "does the hierarchy make sense", not
"does it look good".

## Stage 2 - Reference search (per section, not once per page)

Before styling, pull 1-3 concrete references for *this specific section
type* (pricing table, comparison table, FAQ accordion, etc.), not just a
generic site-wide mood board:

- First choice: styles.refero.design (catalog + `/style/{UUID}` pages) -
  per standing project convention, pull a real style reference before
  design work.
- If refero doesn't have a close match for this section type, WebSearch
  for the pattern by name (e.g. "pricing table design inspiration",
  "SaaS comparison table ui") and WebFetch 1-2 concrete results.
- Check `C:\Users\megaumka\...design-references` (umka.dev's local
  inspiration folder, per project memory) if it's relevant to this
  section.

Note concretely what the reference does that the skeleton doesn't yet:
spacing rhythm, a specific hover pattern, how emphasis is created, etc.
Don't just eyeball it and move on - write down 2-3 specific things to
borrow before touching code.

## Stage 3 - Best-practice pass

Apply the reference's concrete lessons plus the project's existing design
language (existing color tokens, `Reveal`/`StaggerGrid`/`Magnetic` motion
primitives, the emil-design-eng animation rules already governing this
codebase). Use the `ui-ux-pro-max` skill's palette/font-pairing database
deliberately here if the section needs a palette decision, rather than
guessing. This is where color, shadow, type scale, and motion get added -
grounded in what stage 2 found, not invented fresh.

## Stage 4 - Visual checkpoint (every stage, not just the end)

After Stage 1 and again after Stage 3, actually look at the result before
continuing:

1. Run the dev server (`pnpm dev`, background) if not already running.
2. Screenshot the section with Playwright - either a throwaway `.mjs`
   script in the repo root (scroll to the section, screenshot, delete
   the script after) or `npx playwright screenshot`. Capture default and
   at least one interactive state (hover/open) when the section has one.
3. Read() the screenshot image - actually look at it, don't assume the
   code is correct because it compiles.
4. Compare against the Stage 2 references and against the skeleton's
   intended hierarchy. If something's off, fix it and re-screenshot
   before moving to the next section.

## Repeat per section, then integrate

Run all four stages per section rather than for the whole page at once -
a page-wide skeleton pass hides per-section problems the same way
prompt-to-code does. Once every section in scope has passed its own
checkpoint, do one final full-page screenshot pass (light/dark, at least
one narrow viewport) to catch cross-section rhythm issues, then run the
project's standard verification (`pnpm typecheck`, `pnpm test:e2e`,
`pnpm test:a11y`, `pnpm build`, and `pnpm test:visual` if the touched
section has baselines).
