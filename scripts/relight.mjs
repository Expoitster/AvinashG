#!/usr/bin/env node
/**
 * One-shot palette inversion: dark console -> light paper.
 *
 * Kept as a script rather than done by hand because the site carries ~125
 * colour literals, most of them inside the desk-scene SVG, and a hand pass
 * over that many values silently misses some — which shows up as one stray
 * dark shape on a light page. Every mapping is explicit and reviewable here.
 *
 * The ramp is inverted, not hue-shifted: the darkest backgrounds become the
 * lightest papers, mid slates become visible linework, and the two accents
 * (amber, teal) darken enough to hold contrast against paper instead of
 * glowing against black.
 *
 * Usage: node scripts/relight.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "design/avinash-console.html");

// dark -> light. Ordered longest-first is unnecessary (all are 7 chars), but
// every key must be unique or the later one silently wins.
const MAP = {
  // ---- grounds: darkest becomes lightest -------------------------------
  "#070B11": "#FFFFFF",
  "#070C13": "#FFFFFF",
  "#080D15": "#FFFFFF", // monitor screen inner — the page sits on this
  "#0A1018": "#FDFCF9",
  "#0B111A": "#F7F4EE",
  "#0C121B": "#F1EDE4", // --ground-2
  "#101722": "#FAF8F3", // --ground
  "#0E1826": "#EFEAE0",
  "#111A26": "#ECE7DC", // monitor body
  "#131C29": "#EEE9DF",
  "#131D2B": "#E9E3D7", // window chrome bar
  "#141D2A": "#EDE8DD",

  // ---- panels ----------------------------------------------------------
  "#16202E": "#FFFFFF", // --panel
  "#18232F": "#FBF8F2",
  "#1A2432": "#F6F2E9",
  "#1B2736": "#F6F2E9", // --panel-2
  "#1B2838": "#F4EFE5",
  "#1C2739": "#EEE8DC",
  "#1E2A3A": "#EDE7DA",

  // ---- rules and soft edges -------------------------------------------
  "#22304A": "#E3DDD0",
  "#22344A": "#E1DBCD",
  "#26364E": "#E5DFD2", // --rule
  "#2A3547": "#DED7C8",
  "#2A3B52": "#D9D2C2",
  "#2B3A52": "#D9D2C2",
  "#2B4257": "#D4CDBD",
  "#2C3D57": "#D7D0C0",
  "#2E3D57": "#D5CEBE",
  "#2E3F58": "#D3CCBB",
  "#2E3F5C": "#D2CBBA",

  // ---- structural linework: must stay visible on paper -----------------
  "#33465F": "#BCC5D2",
  "#35496A": "#CDC4B2", // --rule-2
  "#35506A": "#B4BECC",
  "#3A4761": "#B7C0CD",
  "#3B4F6C": "#AEB9C8",
  "#3D5271": "#ABB6C6",
  "#3E5470": "#A9B4C4",
  "#40587C": "#A4B0C2",
  "#43597A": "#A1AEC0",
  "#4A6389": "#97A6BB",

  // ---- text ramp: inverts outright ------------------------------------
  "#4C596F": "#6E7785",
  "#5A6478": "#6E7785",
  "#64748E": "#86909D", // --dim-2
  "#93A2BC": "#55606E", // --dim  (must darken, it is body-adjacent text)
  "#EDE8DC": "#1A2230", // --paper (the ink itself)

  // ---- accents ---------------------------------------------------------
  // Amber stays the brand signal but drops in value so it reads as ink.
  "#FFB03A": "#B0690F",
  "#7A5316": "#E0B978", // --signal-deep: now a soft border, not a dark one
  "#E08A4C": "#B4671F",
  // Teal likewise.
  "#6FE3F2": "#0E6E7B",
  "#1E5A66": "#9FD0D6", // --data-deep
  "#4E7E86": "#86B0B5",
  "#2E5163": "#A8C4CE",
  "#3E6B7E": "#93B6C2",
  "#3E7E9C": "#7FA9BC",
  // Semantic
  "#79E0A8": "#2C7A50",
  "#1E3A34": "#DCEBE1",
  "#27473F": "#C9DFD1",
  "#FF7A5C": "#D2593C",
  "#A78BFA": "#7B5FD4",
  "#7C6A55": "#9C8A70"
};

// rgba() literals, which the hex map cannot reach.
const RGBA = [
  // amber washes: pale cream tints on paper
  ["rgba(255,176,58,.06)", "rgba(176,105,15,.07)"],
  ["rgba(255,176,58,.08)", "rgba(176,105,15,.09)"],
  ["rgba(255,176,58,.16)", "rgba(176,105,15,.14)"],
  ["rgba(255,176,58,.18)", "rgba(176,105,15,.16)"],
  ["rgba(255,176,58,.35)", "rgba(176,105,15,.30)"],
  ["rgba(255,176,58,.5)", "rgba(176,105,15,.42)"],
  ["rgba(255,176,58,.55)", "rgba(176,105,15,.46)"],
  ["rgba(255,176,58,.6)", "rgba(176,105,15,.5)"],
  // slate washes
  ["rgba(53,73,106,.16)", "rgba(90,104,128,.14)"],
  ["rgba(53,73,106,.10)", "rgba(90,104,128,.09)"],
  // the measurement grid was white-on-dark; it has to become ink-on-paper
  ["rgba(255,255,255,.012)", "rgba(26,34,48,.035)"],
  // modal scrim: a dim veil still reads best, just far lighter than before
  ["rgba(6,10,16,.88)", "rgba(28,36,50,.42)"],
  // sticky topbar
  ["rgba(12,18,27,.92)", "rgba(250,248,243,.88)"]
];

let src = readFileSync(SRC, "utf8");
let hits = 0;
const missing = [];

for (const [from, to] of Object.entries(MAP)) {
  const re = new RegExp(from.replace("#", "#"), "gi");
  const before = src;
  src = src.replace(re, to);
  const n = (before.match(re) || []).length;
  if (n === 0) missing.push(from);
  hits += n;
}

for (const [from, to] of RGBA) {
  const re = new RegExp(from.replace(/[().]/g, (c) => "\\" + c), "g");
  const n = (src.match(re) || []).length;
  if (n === 0) missing.push(from);
  src = src.replace(re, to);
  hits += n;
}

// The document itself must stop declaring a dark scheme, or form controls,
// scrollbars and the browser's own chrome stay dark around a light page.
src = src.replace(/color-scheme:\s*dark/g, "color-scheme: light");

writeFileSync(SRC, src);
console.log(`relight: ${hits} colour literals remapped`);
if (missing.length) console.log(`not found (already changed?): ${missing.join(" ")}`);

const leftover = [...new Set(src.match(/#[0-9A-Fa-f]{6}/g) || [])]
  .filter((h) => {
    const v = h.slice(1);
    const lum =
      0.2126 * parseInt(v.slice(0, 2), 16) +
      0.7152 * parseInt(v.slice(2, 4), 16) +
      0.0722 * parseInt(v.slice(4, 6), 16);
    return lum < 70; // anything still near-black is suspect on a light page
  });
console.log(leftover.length ? `dark literals remaining: ${leftover.join(" ")}` : "no dark literals remain");
