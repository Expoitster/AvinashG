/**
 * Responsive + interaction QA for the built portfolio (docs/index.html).
 *
 * Runs the real deployed file through a device matrix and asserts the things
 * that actually break on phones: horizontal overflow, tap target size, unread-
 * able type, content stuck behind reveal animations, and whether the core
 * interactions work by tap rather than hover.
 *
 * Usage: node scripts/qa-responsive.cjs
 */
const { chromium } = require("playwright");
const path = require("path");

const FILE = "file://" + path.resolve(__dirname, "../docs/index.html");

const ROUTES = [
  "#/", "#/work", "#/work/chat360", "#/work/cordelia-cruises",
  "#/work/nosh-house", "#/work/yapita-health", "#/work/events-fusion",
  "#/journey", "#/lab", "#/thinking", "#/about", "#/resume", "#/contact",
  "#/does-not-exist",
];

const DEVICES = [
  { name: "Android · Galaxy S8 (360×740)",     w: 360,  h: 740,  dpr: 4,   touch: true,  class: "phone" },
  { name: "Android · small (320×568)",         w: 320,  h: 568,  dpr: 2,   touch: true,  class: "phone" },
  { name: "Android · Pixel 5 (393×851)",       w: 393,  h: 851,  dpr: 2.75,touch: true,  class: "phone" },
  { name: "Android · Pixel 7 (412×915)",       w: 412,  h: 915,  dpr: 2.6, touch: true,  class: "phone" },
  { name: "Android · Pixel 7 landscape",       w: 915,  h: 412,  dpr: 2.6, touch: true,  class: "phone" },
  { name: "Tablet · Galaxy Tab (800×1280)",    w: 800,  h: 1280, dpr: 2,   touch: true,  class: "tablet" },
  { name: "Tablet · 768×1024 portrait",        w: 768,  h: 1024, dpr: 2,   touch: true,  class: "tablet" },
  { name: "Tablet · 1024×768 landscape",       w: 1024, h: 768,  dpr: 2,   touch: true,  class: "tablet" },
  { name: "Desktop · 1366×768",                w: 1366, h: 768,  dpr: 1,   touch: false, class: "desktop" },
  { name: "Desktop · 1920×1080",               w: 1920, h: 1080, dpr: 1,   touch: false, class: "desktop" },
];

const fails = [];
const warns = [];
function fail(dev, route, msg) { fails.push(`${dev} | ${route} | ${msg}`); }
function warn(dev, route, msg) { warns.push(`${dev} | ${route} | ${msg}`); }

// Audit run inside the page: overflow, tap targets, tiny text, hidden content.
// isTouch gates the 44px rule — it is a finger guideline, not a mouse one.
function audit(isTouch) {
  const vw = document.documentElement.clientWidth;
  const overflow = document.documentElement.scrollWidth - vw;

  const inFixed = (n) => {
    let c = n;
    while (c && c !== document.body) {
      const cs = getComputedStyle(c);
      if (cs.position === "fixed") return true;
      c = c.parentElement;
    }
    return false;
  };

  const offenders = [];
  document.querySelectorAll("body *").forEach((n) => {
    if (inFixed(n)) return;
    const r = n.getBoundingClientRect();
    if (r.width > 0 && r.right > vw + 1) {
      offenders.push((n.tagName + "." + (typeof n.className === "string" ? n.className.split(" ")[0] : "")).slice(0, 40));
    }
  });

  // interactive elements currently on screen and actually visible
  const small = [];
  if (isTouch) document.querySelectorAll("a, button, summary, input, [role=button]").forEach((n) => {
    const cs = getComputedStyle(n);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.05) return;
    const r = n.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.bottom < 0 || r.top > innerHeight) return;
    // inline text links inside prose are exempt from the 44px rule
    const inProse = n.closest("p, li, .init-body, .cv-points, .cv-list, .foot-nav, .statusbar");
    if (inProse) return;
    if (r.height < 40 || r.width < 40) {
      small.push(`${n.tagName.toLowerCase()}.${(typeof n.className === "string" ? n.className.split(" ")[0] : "")} ${Math.round(r.width)}×${Math.round(r.height)}`);
    }
  });

  // body copy that would be unreadable on a phone
  const tiny = [];
  document.querySelectorAll("p, li, dd, .lede, .work-line, .init-sum").forEach((n) => {
    const r = n.getBoundingClientRect();
    if (r.height === 0) return;
    const fs = parseFloat(getComputedStyle(n).fontSize);
    if (fs < 11.5) tiny.push(`${n.tagName.toLowerCase()} ${fs}px`);
  });

  // anything meant to be read that is stuck invisible well inside the viewport
  const stuck = [];
  document.querySelectorAll(".rv").forEach((n) => {
    const r = n.getBoundingClientRect();
    const visibleEnough = r.top < innerHeight * 0.75 && r.bottom > 0;
    if (visibleEnough && parseFloat(getComputedStyle(n).opacity) < 0.5) {
      stuck.push((n.className || "").slice(0, 40));
    }
  });

  const main = document.getElementById("view");
  return {
    overflow,
    offenders: [...new Set(offenders)].slice(0, 4),
    small: [...new Set(small)].slice(0, 5),
    tiny: [...new Set(tiny)].slice(0, 4),
    stuck: [...new Set(stuck)].slice(0, 4),
    textLen: main ? (main.innerText || "").trim().length : 0,
  };
}

(async () => {
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  });

  for (const d of DEVICES) {
    const ctx = await browser.newContext({
      viewport: { width: d.w, height: d.h },
      deviceScaleFactor: d.dpr,
      isMobile: d.class !== "desktop",
      hasTouch: d.touch,
      userAgent: d.class === "desktop" ? undefined :
        "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36",
    });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => fail(d.name, "-", "JS error: " + e.message));
    page.on("console", (m) => {
      if (m.type() === "error" && !/ERR_CONNECTION|ERR_NAME|favicon/.test(m.text())) {
        fail(d.name, "-", "console error: " + m.text().slice(0, 90));
      }
    });

    await page.goto(FILE, { waitUntil: "load" });
    await page.waitForTimeout(2200);

    for (const route of ROUTES) {
      await page.evaluate((h) => { location.hash = h; }, route);
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, Math.min(400, document.body.scrollHeight)));
      // reveals run 620ms plus up to 225ms of stagger; wait past that so the
      // audit measures settled state rather than a mid-transition frame
      await page.waitForTimeout(1200);

      const r = await page.evaluate(audit, d.touch);

      if (r.overflow > 1) fail(d.name, route, `horizontal overflow ${r.overflow}px [${r.offenders.join(", ")}]`);
      if (r.small.length) warn(d.name, route, `tap target <40px: ${r.small.join(", ")}`);
      if (r.tiny.length) fail(d.name, route, `text under 11.5px: ${r.tiny.join(", ")}`);
      if (r.stuck.length) fail(d.name, route, `content stuck hidden: ${r.stuck.join(", ")}`);
      if (route !== "#/does-not-exist" && r.textLen < 120) fail(d.name, route, `page nearly empty (${r.textLen} chars)`);
    }

    // ---- interaction checks ----
    await page.evaluate(() => { location.hash = "#/"; });
    await page.waitForTimeout(600);

    // menu drawer reaches every page
    const menu = await page.evaluate(async () => {
      const t = document.getElementById("navToggle");
      if (!t) return { err: "no menu button" };
      t.click();
      await new Promise((r) => setTimeout(r, 500));
      const d = document.getElementById("navDrawer");
      const open = d && d.classList.contains("open");
      const links = document.querySelectorAll("#navBody .drawer-link").length;
      const onScreen = d ? d.getBoundingClientRect().left < innerWidth - 10 : false;
      document.getElementById("navClose").click();
      await new Promise((r) => setTimeout(r, 450));
      const closed = d && !d.classList.contains("open");
      return { open, links, onScreen, closed };
    });
    if (menu.err) fail(d.name, "menu", menu.err);
    else {
      if (!menu.open) fail(d.name, "menu", "drawer did not open");
      if (!menu.onScreen) fail(d.name, "menu", "drawer opened off-screen");
      if (menu.links < 13) fail(d.name, "menu", `only ${menu.links} destinations`);
      if (!menu.closed) fail(d.name, "menu", "drawer did not close");
    }

    // latency lab responds to taps
    const lab = await page.evaluate(async () => {
      const before = document.getElementById("labTotal").textContent;
      document.getElementById("labAll").click();
      await new Promise((r) => setTimeout(r, 400));
      const after = document.getElementById("labTotal").textContent;
      const verdict = document.getElementById("labVerdict").textContent;
      document.getElementById("labReset").click();
      await new Promise((r) => setTimeout(r, 300));
      return { before, after, verdict, reset: document.getElementById("labTotal").textContent };
    });
    if (!/100/.test(lab.before)) fail(d.name, "lab", `baseline not 100 (${lab.before})`);
    if (!/50/.test(lab.after)) fail(d.name, "lab", `all-on total not 50 (${lab.after})`);
    if (!/50%/.test(lab.verdict)) fail(d.name, "lab", "verdict missing the −50% result");
    if (!/100/.test(lab.reset)) fail(d.name, "lab", "reset did not restore baseline");

    // capability map selects by tap, and wires only on wide screens
    const map = await page.evaluate(async () => {
      const n = document.querySelector('.sysnode[data-p="chat360"]');
      if (!n) return { err: "no map node" };
      n.click();
      await new Promise((r) => setTimeout(r, 400));
      const pressed = n.getAttribute("aria-pressed") === "true";
      const litCaps = document.querySelectorAll(".syscap.on").length;
      const state = (document.getElementById("sysState") || {}).textContent || "";
      const openBtn = document.getElementById("sysOpen");
      const wires = document.querySelectorAll(".sysmap-wires .wire").length;
      return { pressed, litCaps, state, openVisible: openBtn && !openBtn.hidden, wires, w: innerWidth };
    });
    if (map.err) fail(d.name, "map", map.err);
    else {
      if (!map.pressed) fail(d.name, "map", "tap did not select project");
      if (map.litCaps !== 5) fail(d.name, "map", `expected 5 lit capabilities, got ${map.litCaps}`);
      if (!/Chat360/.test(map.state)) fail(d.name, "map", "status line did not update");
      if (!map.openVisible) fail(d.name, "map", "open-case-study link not shown");
      if (map.w > 760 && map.wires !== 16) fail(d.name, "map", `expected 16 wires on wide screen, got ${map.wires}`);
      if (map.w <= 760 && map.wires !== 0) fail(d.name, "map", `wires should be dropped when stacked, got ${map.wires}`);
    }

    // résumé route renders real CV content
    const cv = await page.evaluate(async () => {
      location.hash = "#/resume";
      await new Promise((r) => setTimeout(r, 700));
      return {
        jobs: document.querySelectorAll(".cv-job").length,
        contacts: document.querySelectorAll(".cv-contact a").length,
        print: !!document.getElementById("printCv"),
      };
    });
    if (cv.jobs !== 5) fail(d.name, "resume", `expected 5 roles, got ${cv.jobs}`);
    if (cv.contacts !== 3) fail(d.name, "resume", `expected 3 contact links, got ${cv.contacts}`);
    if (!cv.print) fail(d.name, "resume", "print button missing");

    // contact links must be actionable (mailto / tel / linkedin)
    const links = await page.evaluate(async () => {
      location.hash = "#/contact";
      await new Promise((r) => setTimeout(r, 600));
      const hs = [...document.querySelectorAll(".contact-cell, .reach")].map((a) => a.getAttribute("href") || "");
      return {
        mailto: hs.some((h) => h.startsWith("mailto:")),
        tel: hs.some((h) => h.startsWith("tel:")),
        li: hs.some((h) => h.includes("linkedin.com")),
      };
    });
    if (!links.mailto) fail(d.name, "contact", "no mailto: link");
    if (!links.tel) fail(d.name, "contact", "no tel: link (phone dialler)");
    if (!links.li) fail(d.name, "contact", "no LinkedIn link");

    await ctx.close();
  }

  // ---- reduced motion: everything must still be readable ----
  const rmCtx = await browser.newContext({
    viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true,
    reducedMotion: "reduce",
  });
  const rm = await rmCtx.newPage();
  rm.on("pageerror", (e) => fail("reduced-motion", "-", "JS error: " + e.message));
  await rm.goto(FILE, { waitUntil: "load" });
  await rm.waitForTimeout(1600);
  const rmRes = await rm.evaluate(() => {
    const hidden = [...document.querySelectorAll(".rv")]
      .filter((n) => parseFloat(getComputedStyle(n).opacity) < 0.5).length;
    return { hidden, screen: (document.getElementById("scTag") || {}).textContent };
  });
  if (rmRes.hidden > 0) fail("reduced-motion", "#/", `${rmRes.hidden} elements hidden with reduced motion`);
  if (!/Metacognist/.test(rmRes.screen || "")) fail("reduced-motion", "#/", "hero screen text not shown");
  await rmCtx.close();

  await browser.close();

  console.log("\n================ RESULTS ================");
  console.log(`devices: ${DEVICES.length}   routes/device: ${ROUTES.length}`);
  console.log(`FAILURES: ${fails.length}`);
  fails.forEach((f) => console.log("  ✗ " + f));
  console.log(`WARNINGS: ${warns.length}`);
  warns.slice(0, 25).forEach((w) => console.log("  ! " + w));
  if (warns.length > 25) console.log(`  … ${warns.length - 25} more`);
  console.log("=========================================\n");
  process.exit(fails.length ? 1 : 0);
})();
