"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { EASE } from "@/lib/utils";

export interface Chapter {
  id: string;
  label: string;
}

/**
 * Fixed rail that turns the home page into one continuous story:
 * a gold progress line for the whole page + the current chapter number.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(chapters.findIndex((c) => c.id === e.target.id));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  const c = chapters[active] ?? chapters[0];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference md:flex flex-col items-center gap-5 text-ivory">
      <span className="eyebrow num text-[0.62rem]">
        {String(active).padStart(2, "0")}
      </span>
      <div className="relative h-36 w-px bg-ivory/25">
        <motion.div className="absolute inset-0 origin-top bg-ivory" style={{ scaleY }} />
      </div>
      <span className="eyebrow num text-[0.62rem] opacity-60">{String(chapters.length - 1).padStart(2, "0")}</span>
      <div className="h-24 w-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={c.id}
            className="eyebrow block origin-center whitespace-nowrap text-[0.6rem] [writing-mode:vertical-rl]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {c.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
