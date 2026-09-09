import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { CardLink, SectionHeading } from "@/components/ui";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = { title: "Work — Avinash" };

export default function WorkPage() {
  return (
    <div className="container-page py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Work"
          title="Case studies across enterprise AI, product revamps and founder-led growth"
          description="Every case study follows the same structure — problem, discovery, solution, technical architecture, business impact — so you can compare them apples to apples."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 0.06}>
            <CardLink
              href={`/work/${cs.slug}`}
              meta={`${cs.company} · ${cs.roleTitle} · ${cs.period}`}
              title={cs.tagline}
              description={cs.overview}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
