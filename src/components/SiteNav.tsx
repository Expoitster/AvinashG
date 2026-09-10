"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { primaryNav, persistentCta, profile } from "@/lib/content";

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between"
      >
        <Link
          href="/"
          className="mono text-sm font-medium tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {profile.shortName}
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`mono px-3 py-2 text-xs uppercase tracking-wide rounded-sm transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href={persistentCta.href}
            className="mono inline-flex items-center gap-2 rounded-sm border border-accent/40 bg-accent-dim px-4 py-2 text-xs uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:bg-accent/20"
          >
            {persistentCta.label}
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center text-foreground"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border bg-background"
        >
          <ul className="container-page flex flex-col py-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="mono block py-3 text-sm uppercase tracking-wide text-foreground/90"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-4">
              <Link
                href={persistentCta.href}
                onClick={() => setOpen(false)}
                className="mono inline-flex w-full items-center justify-center rounded-sm border border-accent/40 bg-accent-dim px-4 py-3 text-xs uppercase tracking-wide text-foreground"
              >
                {persistentCta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
