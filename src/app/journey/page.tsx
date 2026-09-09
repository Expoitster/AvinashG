import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui";
import { journeyStages } from "@/lib/content";

export const metadata: Metadata = { title: "Journey — Avinash" };

const stageLinks: Record<string, string> = {
  "ux-foundation": "/work/yapita-health",
  "product-foundation": "/work/cordelia-cruises",
  "ai-pm": "/work/chat360",
  "business-ownership": "/work/nosh-house",
};

export default function JourneyPage() {
  return (
    <div className="container-page py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Journey"
          title="Career overview: leadership → business → UX → product → AI → ownership"
          description="Six stages, each building the capability the next one needed."
        />
      </Reveal>

      <ol className="mt-16 space-y-16">
        {journeyStages.map((stage, i) => (
          <li key={stage.id} className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-10 border-t border-border pt-10">
            <Reveal>
              <p className="mono text-xs text-accent">0{i + 1}</p>
              <h2 className="mt-2 text-xl font-medium text-foreground">{stage.title}</h2>
              <p className="mono mt-1 text-xs text-muted-2">{stage.period}</p>
            </Reveal>

            <div className="space-y-8">
              {stage.entries.map((entry, j) => (
                <Reveal key={entry.org} delay={j * 0.06}>
                  <div className="rounded-sm border border-border p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-medium text-foreground">{entry.org}</h3>
                      <span className="mono text-xs text-muted-2">{entry.period} · {entry.location}</span>
                    </div>
                    <p className="mt-1 text-sm text-accent">{entry.role}</p>
                    <ul className="mt-4 space-y-2">
                      {entry.points.map((p, k) => (
                        <li key={k} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mono mt-1 text-muted-2" aria-hidden>—</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    {stageLinks[stage.id] && (
                      <Link
                        href={stageLinks[stage.id]}
                        className="mono mt-5 inline-block text-xs uppercase tracking-wide text-accent hover:underline"
                      >
                        Read the full case study →
                      </Link>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
