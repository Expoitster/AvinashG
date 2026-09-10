#!/usr/bin/env node
/**
 * Wraps the portfolio source into a standalone page for GitHub Pages.
 *
 * design/avinash-console.html is authored as a fragment because the Claude
 * Artifact host supplies the document shell. GitHub Pages does not, so the
 * viewport meta in particular has to be added here or the site renders at a
 * 980px fallback width on phones.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "design/avinash-console.html");
const OUT = resolve(root, "docs/index.html");

const body = readFileSync(SRC, "utf8");

const DESCRIPTION =
  "Avinash Garudapalli — AI product manager. Voice AI, generative and " +
  "agentic products, and the business case underneath them.";

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${DESCRIPTION}">
<meta name="theme-color" content="#101722">
<meta property="og:title" content="Avinash Garudapalli">
<meta property="og:description" content="${DESCRIPTION}">
<meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23101722'/><circle cx='16' cy='16' r='7' fill='%23FFB03A'/></svg>">
<style>
  :root { color-scheme: dark; }
  html, body { margin: 0; }
  img { max-width: 100%; }
  [hidden] { display: none !important; }
</style>
</head>
<body>
${body}
</body>
</html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, page);
console.log(`built ${OUT} (${(page.length / 1024).toFixed(1)} KB)`);
