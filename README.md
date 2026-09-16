# Avinash — AI Product Manager Portfolio

A portfolio built as a connected narrative rather than a list of unrelated
pages: an opening desk scene the site grows out of, then Story → Experience →
case studies → Thinking → Lab → Beyond, with each case study linking forward
into related work and back into a shared capability map. An assistant on the
overview answers questions using only what the site already publishes.

Live at **https://expoitster.github.io/AvinashG/**

## How it is built

One authored file, no framework and no bundler:

- **`design/avinash-console.html`** — the site. Markup, CSS, data, views and
  the scroll-motion engine, in a single file of plain JavaScript.
- **`docs/index.html`** — generated output, served by GitHub Pages. Never edit
  it directly.

The source is authored as a fragment because the Claude Artifact host supplies
the surrounding document; GitHub Pages does not. The build step adds that
shell — the viewport meta especially, without which phones render the page at
a 980px fallback width:

```bash
node scripts/build-site.mjs      # design/avinash-console.html -> docs/index.html
```

Commit the regenerated `docs/index.html` alongside any source change.
`.github/workflows/deploy-pages.yml` publishes `docs/` on every push to
`main`, and `docs/.nojekyll` keeps Pages from running it through Jekyll.

## The assistant

`rag/` holds a Cloudflare Worker that answers visitor questions from the
site's own content — retrieval over an index built by rendering every route,
so it cannot drift from what is actually published. It never invents an
answer: anything outside the indexed content gets a plain "not covered here"
and a pointer to the contact section.

Setup, deployment (including a no-terminal path through Cloudflare's
dashboard) and the index pipeline are documented in
[`rag/README.md`](rag/README.md).

## Checking a change

```bash
node scripts/build-site.mjs && node scripts/qa-responsive.cjs
```

The audit drives 10 viewports across 14 routes and fails on horizontal
overflow, tap targets under 40px, type under 11.5px, content stuck
mid-transition, rendered `undefined`, and leaked CSS escape sequences —
the class of defect that survives a careful reading of the diff.

## Layout

| Path | What it is |
| --- | --- |
| `design/avinash-console.html` | the site — edit this |
| `docs/` | generated output, served by Pages |
| `scripts/build-site.mjs` | wraps the fragment into a standalone page |
| `scripts/qa-responsive.cjs` | device-matrix audit |
| `rag/` | the assistant's Worker, index builder and docs |
| `assets/` | source documents not published by the site |

Requires Node and `npm install` (Playwright only, for the audit and the
index builder).
