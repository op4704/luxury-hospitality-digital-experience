"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useBooking } from "@/lib/store";
import { EASE, cn } from "@/lib/utils";

const LINKS = [
  { href: "/rooms", label: "Stay" },
  { href: "/experiences", label: "Experiences" },
  { href: "/explore", label: "Explore" },
  { href: "/concierge", label: "Concierge" },
];

export function Navbar() {
  const path = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const extras = useBooking((s) => s.experiences.length + (s.roomSlug ? 1 : 0));

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 60);
    setHidden(v > 400 && v > prev && !open);
  });

  if (path.startsWith("/admin") || path.startsWith("/concierge/dashboard")) return null;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 md:px-5 pt-3 md:pt-4"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={cn(
            "mx-auto flex h-14 md:h-16 max-w-[1680px] items-center justify-between rounded-full px-5 md:px-7 transition-[background-color,border-color,box-shadow] duration-700",
            scrolled || open ? "glass-ink" : "border border-transparent"
          )}
        >
          <Link href="/" className="font-display text-[1.45rem] md:text-[1.6rem] leading-none tracking-tight" aria-label="Aranya Estate — home">
            Aranya<span className="text-gold">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {LINKS.map((l) => {
                const active = path.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link href={l.href} className="group relative eyebrow text-ivory/85 hover:text-ivory transition-colors" aria-current={active ? "page" : undefined}>
                      {l.label}
                      <span className={cn("absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-500 ease-expo", active ? "w-full" : "w-0 group-hover:w-full")} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-bg transition-colors duration-500 hover:bg-gold"
            >
              Reserve
              {extras > 0 && (
                <span className="num grid h-5 min-w-5 place-items-center rounded-full bg-bg px-1 text-[0.6rem] text-ivory" aria-label={`${extras} items in your stay`}>
                  {extras}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-10 w-10 place-items-center"
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute left-0 top-0 h-px w-6 bg-ivory transition-transform duration-500 ease-expo", open && "translate-y-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-6 bg-ivory transition-transform duration-500 ease-expo", open && "-translate-y-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-end gap-2 px-[var(--gutter)] pb-16">
              {[{ href: "/", label: "Home" }, ...LINKS, { href: "/booking", label: "Reserve" }].map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.05 }}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-[clamp(2.6rem,12vw,4rem)] leading-[1.05]">
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
