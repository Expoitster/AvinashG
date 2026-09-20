import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

/**
 * Scroll reveal, the GSAP equivalent of the .rv IntersectionObserver in the
 * current site.
 *
 * useGSAP scopes every animation and ScrollTrigger created inside it to the
 * container ref and reverts them when the component unmounts or a dependency
 * changes. That revert is the whole point: a ScrollTrigger created in a plain
 * useEffect outlives its component, holds a reference to a detached node, and
 * keeps firing on scroll. With client-side routing, every route change would
 * leak another set.
 *
 * matchMedia handles prefers-reduced-motion, and it belongs here rather than
 * in a global timeScale hack: under reduce, no tween and no ScrollTrigger is
 * created at all, so the content is simply present. The current site makes the
 * same promise — it renders fully without its reveals — and the rewrite has to
 * keep it.
 */
export default function Reveal({ children, y = 30, delay = 0 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y,
          duration: 0.62,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            // matches the current site's rootMargin: "0px 0px -6% 0px"
            start: "top 94%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [y, delay] }
  );

  return <div ref={ref}>{children}</div>;
}
