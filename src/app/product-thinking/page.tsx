import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui";
import { productFramework } from "@/lib/content";

export const metadata: Metadata = { title: "Product Thinking — Avinash" };

export default function ProductThinkingPage() {
  return (
    <div className="container-page py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Product Thinking"
          title="The framework behind every case study"
          description="Discover → Define → Prioritize → Design → Build → Launch → Measure. Not a slogan — the literal structure each project on this site follows."
        />
      </Reveal>

      <ol className="mt-16 grid gap-0 md:grid-cols-7">
        {productFramework.map((step, i) => (
          <li key={step.step} className="relative border-t border-border py-6 md:border-t-0 md:border-l md:py-0 md:pl-4 md:pr-2">
            <Reveal delay={i * 0.05}>
              <p className="mono text-xs text-accent">{step.step}</p>
              <h2 className="mt-2 text-base font-medium text-foreground">{step.name}</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted">{step.detail}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <div className="mt-20 rounded-sm border border-border bg-surface p-6 md:p-8">
          <p className="text-sm leading-relaxed text-muted">
            This framework maps most visibly onto{" "}
            <Link href="/work/chat360" className="text-accent hover:underline">Chat360&rsquo;s Voice AI</Link> and{" "}
            <Link href="/work/cordelia-cruises" className="text-accent hover:underline">Cordelia Cruises&rsquo; mobile app</Link>{" "}
            — both were 0-to-1 builds that moved through discovery, prioritization and launch under real
            time and team constraints.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
