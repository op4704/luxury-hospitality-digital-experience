"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ClipReveal, FadeUp } from "@/components/motion/RevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { EXPERIENCES } from "@/data/experiences";
import { useCinematic } from "@/lib/hooks";
import { cn, fmtDuration } from "@/lib/utils";

const PICKS = ["ayurvedic-ritual", "dawn-on-the-lake", "kathakali-story", "private-dinner", "sunrise-ridge-walk", "forest-bathing"];
const RATIOS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[5/6]"];

/** Staggered three-column masonry; columns drift apart as you scroll. */
export function ExperiencesMasonry() {
  const ref = useRef<HTMLElement>(null);
  const cinematic = useCinematic();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const c1 = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);
  const c2 = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);
  const c3 = useTransform(scrollYProgress, [0, 1], ["8%", "-4%"]);
  const cols = [c1, c2, c3];

  const items = PICKS.map((s) => EXPERIENCES.find((e) => e.slug === s)!);
  const columns = [0, 1, 2].map((c) => items.filter((_, i) => i % 3 === c));

  return (
    <section id="experiences" ref={ref} className="relative bg-ivory text-bg section-y overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <SectionHeading tone="light" index="04" eyebrow="Live" title="Days with" italic="nothing scheduled." />
          <FadeUp className="max-w-xs md:pb-3">
            <p className="text-muted-ink leading-relaxed mb-6">
              Everything here is optional. Some of it is unforgettable. Add any of it to your stay as you go.
            </p>
            <Button href="/experiences" variant="ghost" className="text-bg">All experiences</Button>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[2vw]">
          {columns.map((col, ci) => (
            <motion.div key={ci} className={cn("flex flex-col gap-10 md:gap-[4vw]", ci === 1 && "md:mt-[16vh]", ci === 2 && "md:mt-[6vh]")} style={cinematic ? { y: cols[ci] } : undefined}>
              {col.map((exp) => {
                const idx = items.indexOf(exp);
                return (
                  <Link key={exp.slug} href={`/experiences/${exp.slug}`} data-cursor="Explore" className="group block">
                    <ClipReveal className={cn("rounded-[18px]", RATIOS[idx])} delay={(idx % 3) * 0.08}>
                      <Image
                        src={exp.image.src}
                        alt={exp.image.alt}
                        fill
                        sizes="(max-width:768px) 100vw, 31vw"
                        quality={75}
                        className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.05]"
                      />
                    </ClipReveal>
                    <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-[var(--line-light)] pb-4">
                      <div>
                        <p className="eyebrow text-[0.62rem] text-gold-deep">{exp.category}</p>
                        <h3 className="mt-2 font-display text-[1.7rem] leading-tight">{exp.name}</h3>
                      </div>
                      <span className="text-sm text-muted-ink whitespace-nowrap">{fmtDuration(exp.durationMins)}</span>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
