# Avinash — AI Product Manager Portfolio

A multi-page portfolio built as a connected knowledge graph rather than a
list of unrelated pages: Home → Work / Journey → Case Studies → Product
Thinking → About / Resume / Contact, with every case study linking forward
into related work and back into a shared capability map.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Two implementations live here

- `design/avinash-console.html` — **the current design direction.** A
  self-contained single-file build: a desk-scene opening that zooms through
  the monitor into an operator console, an interactive voice-pipeline
  latency lab, and a bipartite project/capability map. Open it directly in a
  browser; no build step.
- `src/` — the earlier multi-page Next.js draft. Same information
  architecture and content, earlier visual direction. Not yet updated to
  match the console design.

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
