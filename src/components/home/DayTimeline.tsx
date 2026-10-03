"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useCinematic } from "@/lib/hooks";
import { DAY } from "@/data/estate";
import { EASE, cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion/RevealText";

const IVORY = "#F3EEE6";
const INK = "#0E0D0B";

/** Pinned timeline: sunrise → night. Background, ink and imagery follow the hour. */
export function DayTimeline() {
  const cinematic = useCinematic();
  return cinematic ? <DayPinned /> : <DayStacked />;
}

function DayPinned() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const n = DAY.length;
  // each hour holds its palette, then crossfades in a short window at the boundary
  const stops: number[] = [];
  const tints: string[] = [];
  const inks: string[] = [];
  DAY.forEach((m, i) => {
    const a = i / n + (i === 0 ? 0 : 0.035);
    const b = (i + 1) / n - (i === n - 1 ? 0 : 0.035);
    const ink = m.ink === "light" ? IVORY : INK;
    stops.push(a, b);
    tints.push(m.tint, m.tint);
    inks.push(ink, ink);
  });
  const bg = useTransform(scrollYProgress, stops, tints);
  const ink = useTransform(scrollYProgress, stops, inks);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.floor(v * n))));

  // sun travels a half-ellipse from left horizon to right
  const angle = useTransform(p, [0, 1], [Math.PI, 0]);
  const sunX = useTransform(angle, (a) => 100 + 90 * Math.cos(a));
  const sunY = useTransform(angle, (a) => 100 - 82 * Math.sin(a));
  const arc = useTransform(p, [0, 1], [0, 1]);

  const d = DAY[active];

  return (
    <motion.section id="day" ref={ref} className="relative h-[520vh]" style={{ backgroundColor: bg, color: ink }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="container-x grid h-full grid-cols-12 items-center gap-6 pt-20">
          <div className="col-span-5 flex h-full flex-col justify-center">
            <p className="eyebrow mb-8 flex items-center gap-3 opacity-80">
              <span className="num">05</span>
              <span className="inline-block h-px w-8 bg-current opacity-60" />
              A day at Aranya
            </p>

            <div className="relative h-[clamp(9rem,15vw,15rem)]">
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={d.time}
                  className="font-display num text-[clamp(5rem,11vw,11rem)] leading-none tracking-[-0.04em]"
                  initial={{ y: "40%", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-40%", opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  {d.time}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative mt-4 min-h-[11rem] max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <h3 className="font-display text-h3 italic">{d.title}</h3>
                  <p className="mt-4 leading-relaxed opacity-80">{d.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="mt-10 flex gap-5" aria-label="Times of day">
              {DAY.map((m, i) => (
                <li key={m.time} className="flex items-center gap-2">
                  <span className={cn("block h-1.5 w-1.5 rounded-full border border-current transition-colors duration-500", i <= active && "bg-current")} />
                  <span className={cn("eyebrow num text-[0.6rem] transition-opacity duration-500", i === active ? "opacity-100" : "opacity-45")}>{m.time}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-7 col-start-6 relative">
            <svg viewBox="0 0 200 104" className="pointer-events-none absolute -top-[16%] left-[5%] z-10 w-[90%] overflow-visible" aria-hidden="true">
              <path d="M10 100 A90 82 0 0 1 190 100" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.4" />
              <motion.path d="M10 100 A90 82 0 0 1 190 100" fill="none" stroke="#C8A96A" strokeWidth="0.6" style={{ pathLength: arc }} />
              <motion.circle r="2.6" fill="#C8A96A" style={{ cx: sunX, cy: sunY }} />
            </svg>
            <div className="relative ml-auto aspect-[5/4] w-full overflow-hidden rounded-[22px]">
              {DAY.map((m, i) => (
                <motion.div
                  key={m.time}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }}
                  transition={{ duration: 1.1, ease: EASE }}
                >
                  <Image src={m.image.src} alt={i === active ? m.image.alt : ""} fill sizes="55vw" className="object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function DayStacked() {
  return (
    <section id="day" className="bg-bg">
      <div className="container-x pt-24 pb-8">
        <p className="eyebrow text-gold">05 — A day at Aranya</p>
      </div>
      {DAY.map((m) => (
        <div key={m.time} style={{ backgroundColor: m.tint, color: m.ink === "light" ? IVORY : INK }} className="py-16">
          <div className="container-x">
            <FadeUp>
              <p className="font-display num text-[4.5rem] leading-none">{m.time}</p>
              <h3 className="font-display text-h3 italic mt-3">{m.title}</h3>
              <p className="mt-3 leading-relaxed opacity-80 max-w-md">{m.body}</p>
            </FadeUp>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[18px]">
              <Image src={m.image.src} alt={m.image.alt} fill sizes="100vw" className="object-cover" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
