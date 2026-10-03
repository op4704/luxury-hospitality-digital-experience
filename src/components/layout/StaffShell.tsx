"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/** Calm, usability-first chrome for staff views (concierge + admin). */
export function StaffShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const links = [
    { href: "/concierge/dashboard", label: "Requests" },
    { href: "/admin", label: "Admin" },
  ];
  return (
    <div className="min-h-[100svh] bg-[#121110]">
      <header className="sticky top-0 z-40 border-b border-[var(--line-dark)] bg-[#121110]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center gap-8 px-5 md:px-8">
          <Link href="/" className="font-display text-xl">Aranya<span className="text-gold">.</span> <span className="eyebrow ml-2 text-[0.58rem] text-muted">Staff</span></Link>
          <nav aria-label="Staff" className="flex gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined} className={cn("rounded-full px-4 py-1.5 text-sm transition-colors", path === l.href ? "bg-white/10 text-ivory" : "text-ivory/60 hover:text-ivory")}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="ml-auto text-sm text-ivory/60 hover:text-gold">View site ↗</Link>
        </div>
      </header>
      <main className="mx-auto max-w-[1480px] px-5 md:px-8 py-10 pb-24">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{title}</h1>
            {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          </div>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}
