import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import { CardLink, Eyebrow, MetricStat, Tag } from "@/components/ui";
import { caseStudies, capabilityMap, getCaseStudy } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return { title: cs ? `${cs.company} — Avinash` : "Case study" };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const relatedStudies = cs.related
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedProductThinking = cs.related.includes("product-thinking");

  const caps = cs.capabilities
    .map((id) => capabilityMap.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div>
      {/* HEADER */}
      <section className="border-b border-border bg-surface/40">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <Eyebrow>{cs.company} · {cs.context}</Eyebrow>
            <h1 className="mt-4 max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              {cs.tagline}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 mono text-xs uppercase tracking-wide text-muted">
              <span>{cs.roleTitle}</span>
              <span>{cs.period}</span>
              <span>{cs.location}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-page py-16 md:py-24 space-y-20">
        {/* OVERVIEW */}
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="mono text-xs uppercase tracking-wide text-accent">Overview</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{cs.overview}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="mono text-xs uppercase tracking-wide text-muted-2">My Role</h3>
                <p className="mt-2 text-sm text-foreground">{cs.myRole}</p>
              </div>
              <div>
                <h3 className="mono text-xs uppercase tracking-wide text-muted-2">Team</h3>
                <p className="mt-2 text-sm text-foreground">{cs.team}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* PROBLEM / WHY / USERS */}
        <Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="mono text-xs uppercase tracking-wide text-accent">Problem</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{cs.problem}</p>
            </div>
            <div>
              <h2 className="mono text-xs uppercase tracking-wide text-accent">Why It Mattered</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{cs.whyItMattered}</p>
            </div>
            <div>
              <h2 className="mono text-xs uppercase tracking-wide text-accent">Users / Customers</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{cs.users}</p>
            </div>
          </div>
        </Reveal>

        {/* SOLUTION / INITIATIVES */}
        <div>
          <Reveal>
            <h2 className="mono text-xs uppercase tracking-wide text-accent">Solution &amp; Technical Execution</h2>
          </Reveal>
          <div className="mt-8 space-y-6">
            {cs.initiatives.map((init, i) => (
              <Reveal key={init.title} delay={i * 0.04}>
                <article className="rounded-sm border border-border p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <h3 className="text-xl font-medium text-foreground">{init.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {init.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted">{init.summary}</p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {init.detail.map((d, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mono mt-1 text-accent" aria-hidden>→</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* METRICS / BUSINESS IMPACT */}
        <Reveal>
          <h2 className="mono text-xs uppercase tracking-wide text-accent">Metrics &amp; Business Impact</h2>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3">
            {cs.metrics.map((m) => (
              <MetricStat key={m.label} label={m.label} value={m.value} />
            ))}
          </div>
        </Reveal>

        {/* CHALLENGES & LEARNINGS */}
        <Reveal>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="mono text-xs uppercase tracking-wide text-accent">Challenges &amp; Decisions</h2>
              <ul className="mt-4 space-y-3">
                {cs.challenges.map((c, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted border-l-2 border-border pl-4">{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mono text-xs uppercase tracking-wide text-accent">Learnings</h2>
              <ul className="mt-4 space-y-3">
                {cs.learnings.map((l, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted border-l-2 border-border pl-4">{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* CAPABILITY CHAIN */}
        <Reveal>
          <h2 className="mono text-xs uppercase tracking-wide text-accent">This project draws on</h2>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {caps.map((c, i) => (
              <span key={c.id} className="flex items-center gap-2">
                <Tag>{c.label}</Tag>
                {i < caps.length - 1 && <span className="text-muted-2" aria-hidden>→</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* RELATED WORK */}
      <section className="border-t border-border bg-surface/40">
        <div className="container-page py-16 md:py-20">
          <Reveal>
            <h2 className="mono text-xs uppercase tracking-wide text-accent">Related Work</h2>
            <p className="mt-2 text-sm text-muted">Keep exploring — no need to go back to the homepage.</p>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {relatedStudies.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06}>
                <CardLink
                  href={`/work/${r.slug}`}
                  meta={`${r.company} · ${r.period}`}
                  title={r.tagline}
                  description={r.overview.slice(0, 110) + "…"}
                />
              </Reveal>
            ))}
            {relatedProductThinking && (
              <Reveal delay={relatedStudies.length * 0.06}>
                <CardLink
                  href="/product-thinking"
                  meta="Framework"
                  title="How I approach every project"
                  description="Discover → Define → Prioritize → Design → Build → Launch → Measure."
                />
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
