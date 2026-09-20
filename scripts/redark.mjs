#!/usr/bin/env node
/**
 * One-shot palette inversion: light paper -> black ground with an acid-lime
 * accent, following the reference direction the user supplied.
 *
 * A script rather than a hand pass for the same reason relight.mjs was: the
 * site carries ~125 colour literals, most of them buried in the desk-scene
 * SVG, and editing that many by hand reliably misses a few — which surfaces
 * as one stray pale shape glowing on a black page.
 *
 * Lightness is inverted rather than hue-rotated, then compressed into the top
 * 42% of the range: a pure inversion drives every former near-white to pure
 * black and erases the boundaries between surfaces. Warm paper hues collapse
 * toward a near-neutral green-black so the ground shares a family with the
 * accent; blue-greys keep their hue so linework still reads cool against lime.
 *
 * The accents are chosen, not derived. Amber becomes the lime; teal becomes a
 * pale lime rather than a second hue, which keeps the signal/data distinction
 * without breaking the reference's one-accent discipline. The error red stays
 * warm on purpose — an error that reads as the brand accent is not an error.
 *
 * Usage: node scripts/redark.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "design/avinash-console.html");

const MAP = {
  "#0E6E7B": "#C8FF7A",
  "#1A2230": "#FFFFFF",
  "#2C7A50": "#7FD44A",
  "#55606E": "#44484D",
  "#5C6573": "#43454A",
  "#6E7785": "#3C3E41",
  "#6F8096": "#373A3F",
  "#7B5FD4": "#B08CFF",
  "#7F8FA5": "#303438",
  "#7FA9BC": "#49691F",
  "#8E9DB1": "#2B2E32",
  "#93B6C2": "#405E1C",
  "#94A3B6": "#282C30",
  "#97590A": "#8AD91F",
  "#97A6BB": "#262A2E",
  "#9CCFD8": "#456520",
  "#9FD0D6": "#3E5C1A",
  "#A4B0C2": "#23262A",
  "#A8C4CE": "#3A5618",
  "#ABB6C6": "#212327",
  "#AEB9C8": "#202226",
  "#AEBBCC": "#1F2226",
  "#B0690F": "#9AEE30",
  "#B4BECC": "#1E2024",
  "#B6D7DA": "#375217",
  "#B7C0CD": "#1D2023",
  "#BCC5D2": "#1B1D21",
  "#C7D0DD": "#16191C",
  "#C9D2DE": "#16181B",
  "#C9DFD1": "#22300F",
  "#CDC4B2": "#21231F",
  "#D2593C": "#FF6B4A",
  "#D2CBBA": "#1E201D",
  "#D3C4AC": "#21231F",
  "#D3CCBB": "#1E1F1C",
  "#D4CDBD": "#1D1F1C",
  "#D5CEBE": "#1D1E1B",
  "#D7D0C0": "#1C1D1B",
  "#D9D2C2": "#1B1D1A",
  "#DCEBE1": "#1B2709",
  "#DED7C8": "#191A17",
  "#E0B978": "#5F8F1C",
  "#E1DBCD": "#171816",
  "#E3DDD0": "#161715",
  "#E5DFD2": "#151714",
  "#E7B07C": "#54801A",
  "#E9E3D7": "#131512",
  "#ECE7DC": "#121311",
  "#EDE7DA": "#121311",
  "#EDE8DD": "#111210",
  "#EEE8DC": "#111310",
  "#EEE9DF": "#111210",
  "#EFEAE0": "#10110F",
  "#F0C98D": "#4C7317",
  "#F1EDE4": "#0F100E",
  "#F4EFE5": "#0E0F0D",
  "#F6F2E9": "#0D0E0C",
  "#F7F4EE": "#0C0D0B",
  "#FAF8F3": "#0A0B09",
  "#FBF8F2": "#0A0B09",
  "#FFFFFF": "#000000",
};

/* Translucent layers. On paper these were dark tints at low alpha; on a black
   ground the same role needs light tints, and the Material elevation shadows
   need to be pure black and stronger — a blue-tinted shadow is invisible
   against black and does nothing to separate a surface. */
/* Translucent layers, enumerated exhaustively.
   These are the ones the hex map cannot reach, and missing one is not subtle:
   the topbar carried rgba(250, 248, 243, .88) — the old paper ground — so
   white nav text sat on a near-white bar at 1.39:1 until this was added.
   Every rgba triple in the source is listed here; `grep -oE 'rgba\([0-9]+'`
   over the source should return nothing that is not accounted for below. */
const RGBA = [
  // elevation shadows: blue-tinted shadow is invisible on black
  [/rgba\(46,\s*58,\s*80,/g, "rgba(0, 0, 0,"],
  [/rgba\(90,\s*104,\s*128,/g, "rgba(0, 0, 0,"],
  // former light grounds -> black surfaces
  [/rgba\(250,\s*248,\s*243,/g, "rgba(10, 12, 9,"],
  // former dark inks -> white
  [/rgba\(26,\s*34,\s*48,/g, "rgba(255, 255, 255,"],
  [/rgba\(28,\s*36,\s*50,/g, "rgba(255, 255, 255,"],
  [/rgba\(12,\s*18,\s*27,/g, "rgba(255, 255, 255,"],
  [/rgba\(6,\s*10,\s*16,/g, "rgba(255, 255, 255,"],
  [/rgba\(16,\s*23,\s*34,/g, "rgba(255, 255, 255,"],
  // accents
  [/rgba\(151,\s*89,\s*10,/g, "rgba(154, 238, 48,"],
  [/rgba\(176,\s*105,\s*15,/g, "rgba(154, 238, 48,"],
  [/rgba\(255,\s*176,\s*58,/g, "rgba(154, 238, 48,"],
  [/rgba\(14,\s*110,\s*123,/g, "rgba(200, 255, 122,"],
  [/rgba\(111,\s*227,\s*242,/g, "rgba(200, 255, 122,"],
];

let src = readFileSync(SRC, "utf8");
let n = 0;
/* One pass, not a loop of replacements.
   Replacing key by key lets a value written by an early mapping be matched
   again by a later one: #1A2230 -> #FFFFFF, then #FFFFFF -> #000000, and the
   body text ends up black on a black ground. A single regex over every key at
   once, resolving each match through the table, cannot chain. */
const ALL = new RegExp(Object.keys(MAP).join("|"), "gi");
src = src.replace(ALL, (hit) => {
  n++;
  return MAP[hit.toUpperCase()];
});
let m = 0;
for (const [re, to] of RGBA) src = src.replace(re, () => { m++; return to; });

writeFileSync(SRC, src);
console.log(`remapped ${n} colour literals and ${m} translucent layers`);
