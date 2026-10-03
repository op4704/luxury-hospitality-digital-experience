"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin") || path.startsWith("/concierge/dashboard")) return null;

  return (
    <footer className="bg-bg text-ivory border-t border-[var(--line-dark)]">
      <div className="container-x pt-20 md:pt-28 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-6 pb-16 md:pb-24">
          <div className="col-span-2 md:col-span-5">
            <p className="font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none mb-6">
              Aranya<span className="text-gold">.</span>
            </p>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              A family-run forest estate high in the Western Ghats. Eighteen villas, one hundred and twenty acres, and the quiet you came for.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-7">
            <p className="eyebrow text-muted mb-5">Stay</p>
            <ul className="space-y-3 text-sm">
              {[["Rooms & villas", "/rooms"], ["Experiences", "/experiences"], ["Explore the estate", "/explore"], ["Reserve", "/booking"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-ivory/75 hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-muted mb-5">Service</p>
            <ul className="space-y-3 text-sm">
              {[["Concierge", "/concierge"], ["Concierge desk", "/concierge/dashboard"], ["Admin", "/admin"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="text-ivory/75 hover:text-gold transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="eyebrow text-muted mb-5">Find us</p>
            <address className="not-italic space-y-3 text-sm text-ivory/75">
              <p>Kanthalloor, Idukki<br />Kerala 685620, India</p>
              <p><a href="mailto:stay@aranya.estate" className="hover:text-gold transition-colors">stay@aranya.estate</a></p>
              <p>+91 4865 555 0142</p>
            </address>
          </div>
        </div>
        <div className="rule mb-8" />
        <div className="flex flex-col md:flex-row justify-between gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-muted">
          <p>© 2026 Aranya Estate · A fictional resort</p>
          <p>Designed &amp; built by Silvion Technologies</p>
        </div>
      </div>
    </footer>
  );
}
