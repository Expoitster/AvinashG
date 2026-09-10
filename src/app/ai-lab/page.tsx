import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading, Tag } from "@/components/ui";
import { aiLab } from "@/lib/content";

export const metadata: Metadata = { title: "AI Lab — Avinash" };

export default function AiLabPage() {
  return (
    <div className="container-page py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="AI Lab"
          title="Self-directed AI and agentic experiments"
          description="Prototypes and concepts built to explore agentic workflows, automation and AI product patterns outside of a formal job — vibe-coded, iterated fast."
        />
      </Reveal>

      <div className="mt-16 space-y-10">
        {aiLab.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <article className="rounded-sm border border-border p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h2 className="text-xl font-medium text-foreground">{project.title}</h2>
                <Tag>{project.status}</Tag>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="mono text-xs uppercase tracking-wide text-accent">Problem — </span>
                {project.problem}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="mono text-xs uppercase tracking-wide text-accent">Approach — </span>
                {project.approach}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
                {project.components.map((c) => (
                  <Tag key={c}>{c}</Tag>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 rounded-sm border border-border bg-surface p-6 md:p-8">
          <h2 className="text-lg font-medium text-foreground">Agentic Experiments</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Ongoing exploration of agentic workflows, automation and AI product experiments alongside{" "}
            <Link href="/work/chat360" className="text-accent hover:underline">
              Voice AI work at Chat360
            </Link>{" "}
            and{" "}
            <Link href="/product-thinking" className="text-accent hover:underline">
              the product framework
            </Link>{" "}
            I apply to every build.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
