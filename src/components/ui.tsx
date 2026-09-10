import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mono text-xs uppercase tracking-[0.15em] text-accent">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="mono inline-flex items-center rounded-sm border border-border bg-surface px-2.5 py-1 text-[11px] uppercase tracking-wide text-muted">
      {children}
    </span>
  );
}

export function MetricStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-accent/60 pl-4">
      <p className="mono text-2xl md:text-3xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export function CardLink({
  href,
  title,
  description,
  meta,
}: {
  href: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-sm border border-border bg-surface p-6 transition-colors hover:border-accent/50 hover:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {meta && <p className="mono text-xs uppercase tracking-wide text-muted-2">{meta}</p>}
          <h3 className="mt-1 text-lg font-medium text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        </div>
        <ArrowUpRight
          size={20}
          className="mt-1 shrink-0 text-muted-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>
    </Link>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mono inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-xs uppercase tracking-wide text-white transition-opacity hover:opacity-90"
    >
      {children}
    </Link>
  );
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mono inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-xs uppercase tracking-wide text-foreground transition-colors hover:border-accent/50"
    >
      {children}
    </Link>
  );
}
