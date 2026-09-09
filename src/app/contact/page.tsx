import type { Metadata } from "next";
import { EnvelopeSimple, LinkedinLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui";
import { profile } from "@/lib/content";

export const metadata: Metadata = { title: "Contact — Avinash" };

const channels = [
  { icon: EnvelopeSimple, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: LinkedinLogo, label: "LinkedIn", value: "linkedin.com/in/avinashdev09", href: profile.linkedin },
];

export default function ContactPage() {
  return (
    <div className="container-page py-20 md:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect"
          description="Open to Associate/Senior PM and AI Product roles, and to conversations about Voice AI, agentic products, or founder-led growth."
        />
      </Reveal>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {channels.map(({ icon: Icon, label, value, href }, i) => (
          <Reveal key={label} delay={i * 0.06}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex h-full flex-col justify-between rounded-sm border border-border bg-surface p-6 transition-colors hover:border-accent/50 hover:bg-surface-2"
            >
              <Icon size={22} className="text-accent" aria-hidden />
              <div className="mt-8">
                <p className="mono text-xs uppercase tracking-wide text-muted-2">{label}</p>
                <p className="mt-1 text-sm text-foreground">{value}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-16 rounded-sm border border-accent/30 bg-accent-dim p-6 md:p-8">
          <h2 className="text-lg font-medium text-foreground">Hire / Collaborate</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            If you&rsquo;re hiring for an AI or product role, or exploring a collaboration around Voice AI,
            agentic workflows, or 0-to-1 product builds — email is the fastest way to reach me, and I&rsquo;ll
            usually reply within a day or two.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
