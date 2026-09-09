import type { Metadata } from "next";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/motion/Reveal";
import { GhostButton, PrimaryButton, SectionHeading } from "@/components/ui";
import { profile, skills } from "@/lib/content";

export const metadata: Metadata = { title: "Resume — Avinash" };

const RESUME_PATH = "/avinash-garudapalli-resume.pdf";

export default function ResumePage() {
  return (
    <div className="container-page py-20 md:py-28">
      <Reveal>
        <SectionHeading eyebrow="Resume" title="The one-page version of everything on this site" />
        <div className="mt-8 flex flex-wrap gap-4">
          <PrimaryButton href={RESUME_PATH}>
            Download PDF <DownloadSimple size={16} weight="bold" />
          </PrimaryButton>
          <GhostButton href={profile.linkedin}>LinkedIn</GhostButton>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-14 overflow-hidden rounded-sm border border-border bg-surface">
          <object
            data={RESUME_PATH}
            type="application/pdf"
            className="h-[80vh] w-full"
            aria-label="Avinash's resume preview"
          >
            <p className="p-6 text-sm text-muted">
              Preview isn&rsquo;t supported in this browser.{" "}
              <a href={RESUME_PATH} className="text-accent hover:underline">
                Download the PDF instead
              </a>
              .
            </p>
          </object>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mono text-xs uppercase tracking-wide text-accent">Business Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.business.map((s) => (
                <span key={s} className="mono rounded-sm border border-border px-2.5 py-1 text-[11px] text-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mono text-xs uppercase tracking-wide text-accent">Technical Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.technical.map((s) => (
                <span key={s} className="mono rounded-sm border border-border px-2.5 py-1 text-[11px] text-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
