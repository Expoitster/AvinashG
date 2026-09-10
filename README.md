# Avinash — AI Product Manager Portfolio

A multi-page portfolio built as a connected knowledge graph rather than a
list of unrelated pages: Home → Work / Journey → Case Studies → Product
Thinking → About / Resume / Contact, with every case study linking forward
into related work and back into a shared capability map.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Two implementations live here

- `design/avinash-console.html` — **the current site.** A self-contained
  single-file build: a desk-scene opening that zooms through the monitor
  into an operator console, an interactive voice-pipeline latency lab, and
  a responsive project/capability map.
- `src/` — the earlier multi-page Next.js draft. Same information
  architecture and content, earlier visual direction. Superseded by the
  console build above.

## Publishing

`design/avinash-console.html` is authored as a fragment, because the Claude
Artifact host supplies the surrounding document. GitHub Pages does not, so
the build step wraps it (the viewport meta especially — without it phones
render the page at a 980px fallback width):

```bash
node scripts/build-site.mjs   # design/avinash-console.html -> docs/index.html
```

Commit the regenerated `docs/index.html` alongside any source change.

Deployment is automatic: `.github/workflows/deploy-pages.yml` publishes
`docs/` to GitHub Pages on every push to `main`. It passes
`enablement: true` to `actions/configure-pages`, so the first run turns
Pages on by itself — no manual toggle in repository settings.

`docs/.nojekyll` keeps Pages from running the file through Jekyll.

## Structure

- `src/lib/content.ts` — single source of truth for all copy (resume facts +
  the case-study architecture supplied in the sitemap spec). Edit content here.
- `src/components/motion/` — `Reveal` (scroll-in fade) and `Parallax`
  (subtle scroll parallax), both disabled under `prefers-reduced-motion`.
- `src/components/ui.tsx` — shared UI atoms (buttons, tags, metric stats, cards).
- `src/app/work/[slug]/page.tsx` — reusable case-study template driven by
  `caseStudies` in `content.ts`, so a new project only needs a new data entry.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run lint
```
