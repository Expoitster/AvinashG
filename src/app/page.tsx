import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { CardLink, Eyebrow, GhostButton, MetricStat, PrimaryButton, SectionHeading, Tag } from "@/components/ui";
import {
  capabilityMap,
  careerEvolution,
  caseStudies,
  impactSnapshot,
  profile,
} from "@/lib/content";

const featuredSlugs = ["chat360", "cordelia-cruises", "nosh-house"];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-line opacity-40" aria-hidden />
        <Parallax speed={0.08} className="pointer-events-none absolute -right-24 top-10 hidden md:block">
          <div className="mono text-[12rem] font-bold leading-none text-surface-2 select-none" aria-hidden>
            AI
          </div>
        </Parallax>

        <div className="container-page relative py-24 md:py-36">
          <Eyebrow>{profile.role}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-balance md:text-6xl">
            Building 0-to-1 AI products where{" "}
            <span className="text-accent">{profile.positioning}</span> meet.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.summary}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="/work">
              Explore My Work <ArrowRight size={16} weight="bold" />
            </PrimaryButton>
            <GhostButton href="/resume">View Resume</GhostButton>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="border-b border-border">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="Positioning" title="How I operate across AI, product and business" />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { title: "What I Build", body: "0-to-1 AI and SaaS products — Voice AI pipelines, GenAI billing, bot builders — shipped with cross-functional teams, not just designed on paper." },
              { title: "How I Think", body: "Discover → Define → Prioritize → Design → Build → Launch → Measure. Every initiative is traced back to a problem worth solving and a metric that proves it." },
              { title: "What I Bring", body: "A rare span from hands-on UX research to enterprise technical architecture to owning a full P&L as a founder." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="rounded-sm border border-border bg-surface p-6">
                  <h3 className="mono text-sm uppercase tracking-wide text-accent">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT SNAPSHOT */}
      <section className="border-b border-border bg-surface/40">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="Impact Snapshot" title="Outcomes across Voice AI, growth and operations" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
            {impactSnapshot.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05}>
                <MetricStat label={m.label} value={m.value} />
                <p className="mt-2 text-xs text-muted-2">{m.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER EVOLUTION */}
      <section className="border-b border-border">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="Career Evolution" title="From leadership to AI product ownership" />
          </Reveal>
          <div className="mt-12 overflow-x-auto">
            <ol className="flex min-w-[720px] md:min-w-0 gap-0">
              {careerEvolution.map((stage, i) => (
                <li key={stage.stage} className="relative flex-1 pr-6">
                  <Reveal delay={i * 0.06}>
                    <div className="flex items-center gap-2">
                      <span className="mono text-xs text-accent">0{i + 1}</span>
                      {i < careerEvolution.length - 1 && (
                        <span className="h-px flex-1 bg-border" aria-hidden />
                      )}
                    </div>
                    <p className="mt-3 text-sm font-medium text-foreground">{stage.stage}</p>
                    <p className="mt-1 text-xs text-muted">{stage.role}</p>
                    <p className="mono mt-1 text-[11px] text-muted-2">{stage.period}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10">
            <GhostButton href="/journey">See the full journey</GhostButton>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="border-b border-border bg-surface/40">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="Featured Work" title="Case studies, not a list of job titles" description="Each project connects back to how I think and the capabilities behind it — keep exploring instead of bouncing between disconnected pages." />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredSlugs.map((slug, i) => {
              const cs = caseStudies.find((c) => c.slug === slug)!;
              return (
                <Reveal key={slug} delay={i * 0.08}>
                  <CardLink
                    href={`/work/${cs.slug}`}
                    meta={`${cs.company} · ${cs.period}`}
                    title={cs.tagline}
                    description={cs.overview.slice(0, 120) + "…"}
                  />
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10">
            <GhostButton href="/ai-lab">See AI Lab experiments</GhostButton>
          </div>
        </div>
      </section>

      {/* CAPABILITY MAP */}
      <section className="border-b border-border">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <SectionHeading eyebrow="Capability Map" title="The through-line across every project" />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityMap.map((cap, i) => (
              <Reveal key={cap.id} delay={i * 0.05}>
                <div className="h-full rounded-sm border border-border p-5">
                  <Tag>{cap.label}</Tag>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{cap.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container-page py-20 md:py-28 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Let&rsquo;s build something worth measuring.</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              Resume, LinkedIn, or a direct message — whichever gets us talking faster.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PrimaryButton href="/resume">View Resume</PrimaryButton>
              <GhostButton href={profile.linkedin}>LinkedIn</GhostButton>
              <GhostButton href="/contact">Contact</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
