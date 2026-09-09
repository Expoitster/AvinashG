import Link from "next/link";
import { primaryNav, profile } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page py-12 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="mono text-sm text-foreground">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{profile.role} — {profile.positioning}</p>
        </div>

        <div>
          <p className="mono text-xs uppercase tracking-wide text-muted-2">Navigate</p>
          <ul className="mt-3 space-y-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono text-xs uppercase tracking-wide text-muted-2">Connect</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="text-muted hover:text-foreground transition-colors">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-muted hover:text-foreground transition-colors">
                Hire / Collaborate
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6">
        <p className="container-page mono text-xs text-muted-2">
          © {new Date().getFullYear()} {profile.shortName}. Built as a portfolio knowledge graph, not a resume.
        </p>
      </div>
    </footer>
  );
}
