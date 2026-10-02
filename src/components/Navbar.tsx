"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/experiences", label: "Experiences" },
  { href: "/property-explorer", label: "Property Explorer" },
  { href: "/concierge", label: "Concierge" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "bg-cream/90 backdrop-blur-md border-b hairline"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-20 md:h-24 flex items-center justify-between">
        <Link
          href="/"
          data-cursor-hover
          className="font-display text-xl md:text-2xl tracking-tight text-ink"
        >
          Alondra&nbsp;Cay
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-hover
              className="text-[13px] uppercase tracking-[0.12em] text-ink/80 hover:text-ink transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brass transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/booking"
            data-cursor-hover
            className="hidden md:inline-flex items-center border border-ink px-6 py-2.5 text-[12px] uppercase tracking-[0.14em] hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            Book your stay
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-1.5 w-7"
          >
            <span
              className={`h-px bg-ink transition-transform duration-300 ${
                open ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`h-px bg-ink transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t hairline bg-cream"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-fit items-center border border-ink px-6 py-2.5 text-[12px] uppercase tracking-[0.14em]"
              >
                Book your stay
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
