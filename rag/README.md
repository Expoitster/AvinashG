# Portfolio RAG backend

Answers visitor questions using only: the live site's own rendered text, plus
any PDFs/docs dropped in `rag/sources/`. Nothing is invented — if a question
isn't covered by that content, the assistant says so and points to the
contact section instead of guessing.

Two parts:

- **`scripts/build-rag-index.mjs`** — offline builder. Renders every route of
  `docs/index.html` with Playwright (so the index matches what a visitor
  actually sees, not a hand-copied version of it), chunks the text, embeds
  each chunk with Gemini, and writes `worker/src/index-data.json`.
- **`worker/`** — a Cloudflare Worker that embeds the visitor's question,
  finds the closest chunks (cosine similarity, in-memory — the corpus is a
  few dozen chunks, no vector DB needed), and asks Gemini to answer using
  only those chunks as context.

Your Gemini key only ever lives in two places: your shell environment when
you run the build script, and a Cloudflare secret the Worker reads at
runtime. It's never in a committed file or in any browser-side code.

## One-time setup

1. **Get a Gemini API key** — [aistudio.google.com](https://aistudio.google.com) → *Get API key*. Free tier is enough for this.
2. **Log in to Cloudflare** (once, from this machine or yours):
   ```
   cd rag/worker
   npm install
   npx wrangler login
   ```
3. **Store the key as a Worker secret** (never committed, not visible in the dashboard after entry):
   ```
   npx wrangler secret put GEMINI_API_KEY
   ```
   Paste the key when prompted.

## Build the index

Whenever the site content or `rag/sources/` changes:

```
node scripts/build-site.mjs                      # from repo root: refresh docs/index.html
GEMINI_API_KEY=... node rag/scripts/build-rag-index.mjs
```

Add `--dry-run` to render + chunk without calling the embedding API (useful
to sanity-check chunk counts before spending API calls).

To include a PDF: extract its text (e.g. with the pdf skill, or `pdftotext`)
into a `.txt` file under `rag/sources/`, then rebuild the index. Every `.txt`
file there is chunked and embedded alongside the site content automatically.

## Deploy / update the Worker

```
cd rag/worker
npx wrangler deploy
```

This bundles `index-data.json` straight into the Worker, so redeploy after
every index rebuild. `wrangler deploy` prints the Worker's URL
(`https://avinashg-rag.<your-subdomain>.workers.dev`) — that's the endpoint
the chat widget will call.

## Testing before it's wired into the UI

```
cd rag/worker
npx wrangler dev
```

Then, from anywhere:

```
curl -X POST http://localhost:8787/api/chat \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:8080" \
  -d '{"message":"What did Avinash do at Nosh House?"}'
```

`wrangler.toml`'s `ALLOWED_ORIGINS` already includes `http://localhost:8080`
for this kind of local testing, plus the live GitHub Pages origin. Nothing
here touches `main` or the deployed site — the Worker is a separate piece of
infrastructure until the chat widget is built and wired to it, and that only
ships when you say so.

## Status

- [x] Retrieval + generation Worker
- [x] Offline index builder (site content; PDFs plug in via `rag/sources/`)
- [ ] Gemini key generated and stored as a Worker secret — **your step**
- [ ] Worker deployed to Cloudflare — **your step, or hand me a Wrangler API token and I'll run it**
- [ ] PDFs added to `rag/sources/`
- [ ] Chat widget UI (waiting on your direction per your last message)
