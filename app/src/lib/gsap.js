/**
 * Single registration point for GSAP.
 *
 * Plugins attach themselves to the gsap object at runtime, so a bundler that
 * only sees `import { ScrollTrigger } from "gsap/ScrollTrigger"` in a leaf
 * component has no reason to believe the import is load-bearing and can drop
 * it. Registering here, once, and importing `gsap` from this module rather
 * than from the package keeps the side effect reachable in a production build.
 *
 * Import this module — never "gsap" directly — anywhere animation is used.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Defaults that match the motion language of the current site: Material's
   emphasised-decelerate curve, and UI transitions kept short. The desk intro
   is the one deliberate exception and sets its own longer duration. */
gsap.defaults({ ease: "power3.out", duration: 0.3 });

export { gsap, ScrollTrigger, useGSAP };
