import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui";
import { beyondProduct, certifications, education, profile } from "@/lib/content";

export const metadata: Metadata = { title: "About — Avinash" };

export default function AboutPage() {
  return (
    <div className="container-page py-20 md:py-28 space-y-20">
      <Reveal>
        <SectionHeading eyebrow="About" title="Who I am" />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{profile.summary}</p>
      </Reveal>

      <Reveal>
        <h2 className="mono text-xs uppercase tracking-wide text-accent">My Philosophy</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Humanity-centered design and systems thinking, applied to products that also have to make
          business sense. I learned this formally through IXDF&rsquo;s courses with Don Norman, and then
          re-learned it by owning a P&L as a founder — good design and a viable business are the same
          problem viewed from two angles.
        </p>
      </Reveal>

      <div className="grid gap-16 md:grid-cols-2">
        <Reveal>
          <h2 className="mono text-xs uppercase tracking-wide text-accent">Education</h2>
          <ul className="mt-6 space-y-6">
            {education.map((e) => (
              <li key={e.school} className="border-l-2 border-border pl-4">
                <p className="text-sm font-medium text-foreground">{e.school}</p>
                <p className="mt-1 text-sm text-muted">{e.program}</p>
                <p className="mono mt-1 text-xs text-muted-2">{e.period} · {e.location}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mono text-xs uppercase tracking-wide text-accent">Certifications</h2>
          <ul className="mt-6 space-y-6">
            {certifications.map((c) => (
              <li key={c.name} className="border-l-2 border-border pl-4">
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="mt-1 text-sm text-muted">{c.org}</p>
                <p className="mono mt-1 text-xs text-muted-2">{c.period}</p>
                <p className="mt-2 text-xs text-muted">{c.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="mono text-xs uppercase tracking-wide text-accent">Leadership</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          As Sponsorship Head for a university&rsquo;s inaugural engineering fest, secured 7–8 sponsors and
          onboarded 20 stalls through stakeholder management and end-to-end execution — an early lesson in
          getting things done with no formal authority.
        </p>
      </Reveal>

      <Reveal>
        <h2 className="mono text-xs uppercase tracking-wide text-accent">Beyond Product</h2>
        <ul className="mt-4 space-y-3">
          {beyondProduct.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mono mt-1 text-muted-2" aria-hidden>—</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
