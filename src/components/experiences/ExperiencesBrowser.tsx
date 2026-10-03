"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { EXPERIENCES, CATEGORIES } from "@/data/experiences";
import type { ExperienceCategory } from "@/lib/types";
import { useBooking } from "@/lib/store";
import { EASE, cn, fmtDuration, money } from "@/lib/utils";

const BLURB: Record<ExperienceCategory, string> = {
  Wellness: "Ayurveda, forest walks and long, unhurried mornings.",
  Dining: "Fire-cooked, garden-led, and served wherever you like.",
  Adventure: "Ridges, rivers and tea country — at your own pace.",
  Culture: "The living arts of Kerala, up close and in private.",
};

export function ExperiencesBrowser() {
  const [cat, setCat] = useState<ExperienceCategory>("Wellness");
  const list = EXPERIENCES.filter((e) => e.category === cat);

  return (
    <section className="container-x section-y" aria-labelledby="exp-browse-title">
      <h2 id="exp-browse-title" className="sr-only">Browse experiences by category</h2>
      <LayoutGroup id="exp-tabs">
        <div role="tablist" aria-label="Experience categories" className="flex flex-wrap gap-x-8 gap-y-4 border-b border-[var(--line-dark)]">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              role="tab"
              id={`tab-${c}`}
              aria-selected={cat === c}
              aria-controls="exp-panel"
              onClick={() => setCat(c)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setCat(CATEGORIES[(i + 1) % CATEGORIES.length]);
                if (e.key === "ArrowLeft") setCat(CATEGORIES[(i - 1 + CATEGORIES.length) % CATEGORIES.length]);
              }}
              className={cn("relative pb-5 font-display text-[clamp(1.6rem,3vw,2.8rem)] transition-colors duration-500", cat === c ? "text-ivory" : "text-ivory/55 hover:text-ivory/80")}
            >
              <span className="num eyebrow mr-3 align-top text-[0.6rem] text-gold">0{i + 1}</span>
              {c}
              {cat === c && <motion.span layoutId="tab-line" className="absolute -bottom-px left-0 right-0 h-px bg-gold" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
            </button>
          ))}
        </div>
      </LayoutGroup>

      <div id="exp-panel" role="tabpanel" aria-labelledby={`tab-${cat}`}>
        <AnimatePresence mode="wait">
          <motion.p key={cat} className="mt-8 max-w-md text-muted" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            {BLURB[cat]}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.ul key={cat} className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-[2vw] gap-y-20" initial="hidden" animate="show" exit="exit">
            {list.map((e, i) => (
              <motion.li
                key={e.slug}
                variants={{
                  hidden: { opacity: 0, y: 50, clipPath: "inset(12% 0% 0% 0%)" },
                  show: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease: EASE, delay: i * 0.08 } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
                }}
                className={cn(i % 3 === 0 ? "md:col-span-7" : i % 3 === 1 ? "md:col-span-5 md:mt-[18vh]" : "md:col-span-6 md:col-start-4")}
              >
                <ExperienceCard exp={e} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: (typeof EXPERIENCES)[number] }) {
  const toggle = useBooking((s) => s.toggleExperience);
  const added = useBooking((s) => s.experiences.includes(exp.slug));
  return (
    <article className="group">
      <Link href={`/experiences/${exp.slug}`} data-cursor="Explore" className="block">
        <ViewTransition name={`exp-${exp.slug}`} share="morph" default="none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
            <Image src={exp.image.src} alt={exp.image.alt} fill sizes="(max-width:768px) 100vw, 58vw" className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.05]" />
          </div>
        </ViewTransition>
      </Link>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
        <div>
          <p className="eyebrow text-[0.6rem] text-gold">{fmtDuration(exp.durationMins)} · {money(exp.price)} pp</p>
          <h3 className="mt-2 font-display text-h3">
            <Link href={`/experiences/${exp.slug}`} className="hover:text-gold transition-colors">{exp.name}</Link>
          </h3>
          <p className="mt-2 max-w-md text-muted leading-relaxed">{exp.summary}</p>
        </div>
        <button
          onClick={() => toggle(exp.slug)}
          aria-pressed={added}
          className={cn("shrink-0 rounded-full border px-5 py-2.5 text-[0.66rem] uppercase tracking-[0.16em] transition-colors duration-500", added ? "border-gold bg-gold text-bg" : "border-white/20 hover:border-gold hover:text-gold")}
        >
          {added ? "✓ In your stay" : "+ Add to stay"}
        </button>
      </div>
    </article>
  );
}
