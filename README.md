# umka.dev

Personal portfolio — Next.js 16.2 (App Router, TS strict) + Tailwind CSS v4. Static site, no
CMS/backend (nothing to secure that isn't already secure by not existing).

## Content honesty

- `bonus-shop` is a real, working project (see `src/lib/projects.ts`) — summarized accurately
  from its own spec, no secrets copied out of it.
- `whiskr`, `nomad-legal`, `pulseboard` are explicitly labeled concept case studies (`status:
  "concept"` in `src/lib/projects.ts`), each rendered with a "концепт-кейс" badge — invented to
  demonstrate range and (for `nomad-legal`/`pulseboard`) specific security patterns, not
  presented as shipped products.
- Project visuals are abstract CSS patterns, not fabricated screenshots.
- The contact page is a `mailto:` link, not a form that silently fails without a wired-up
  email backend.

## Getting started

```bash
pnpm install
pnpm dev
```

## Status

No hosting/domain configured yet — code only, per the brief this was built against.
