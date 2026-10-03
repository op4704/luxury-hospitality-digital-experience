"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useCinematic } from "@/lib/hooks";
import { ClipReveal, RevealText, FadeUp } from "@/components/motion/RevealText";
import { PHOTOS } from "@/data/photos";

const WORDS = [
  { word: "Arrive.", line: "The road climbs for an hour through tea and cardamom before the gate." },
  { word: "Exhale.", line: "Your phone finds no signal at the long pool. Nobody here will mind." },
  { word: "Belong.", line: "By the second morning, the staff know how you take your coffee." },
];

/** Pinned: a framed image opens to full-bleed while three words take turns. */
export function Arrival() {
  const cinematic = useCinematic();
  return cinematic ? <ArrivalPinned /> : <ArrivalStacked />;
}

function ArrivalPinned() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  const inset = useTransform(p, [0, 0.45], [30, 0]);
  const insetX = useTransform(p, [0, 0.45], [34, 0]);
  const radius = useTransform(p, [0, 0.45], [24, 0]);
  const clip = useTransform(() => `inset(${inset.get()}% ${insetX.get()}% ${inset.get()}% ${insetX.get()}% round ${radius.get()}px)`);
  const imgScale = useTransform(p, [0, 1], [1.35, 1]);
  const dim = useTransform(p, [0.3, 0.6], [0, 0.45]);

  return (
    <section id="arrival" ref={ref} className="relative h-[420vh] bg-bg">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Image src={PHOTOS.poolForest.src} alt={PHOTOS.poolForest.alt} fill sizes="100vw" quality={75} className="object-cover" />
          </motion.div>
          <motion.div className="absolute inset-0 bg-bg" style={{ opacity: dim }} />
        </motion.div>

        <p className="eyebrow absolute left-[var(--gutter)] top-28 text-gold flex items-center gap-3">
          <span className="num">01</span>
          <span className="inline-block h-px w-8 bg-current opacity-60" />
          Arrival
        </p>

        <div className="absolute inset-0 grid place-items-center">
          {WORDS.map((w, i) => (
            <Word key={w.word} index={i} total={WORDS.length} progress={p} {...w} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({ word, line, index, total, progress }: { word: string; line: string; index: number; total: number; progress: MotionValue<number> }) {
  // windows overlap slightly so one word is always on screen (no blank beat)
  const span = 0.6 / total;
  const start = 0.32 + index * span;
  const end = start + span;
  const first = index === 0;
  const last = index === total - 1;
  const inA = first ? start - 0.06 : start - span * 0.12;
  const inB = start + span * 0.18;
  const outA = end - span * 0.12;
  const outB = end + span * 0.12;
  const y = useTransform(progress, [inA, inB, outA, outB], ["50%", "0%", "0%", last ? "0%" : "-50%"]);
  const opacity = useTransform(progress, [inA, inB, outA, outB], [0, 1, 1, last ? 1 : 0]);
  const blur = useTransform(progress, [inA, inB, outA, outB], [10, 0, 0, last ? 0 : 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.div className="absolute text-center px-6" style={{ y, opacity, filter }}>
      <p className="font-display text-display italic font-light text-ivory">{word}</p>
      <p className="mx-auto mt-6 max-w-sm text-ivory/80 leading-relaxed">{line}</p>
    </motion.div>
  );
}

function ArrivalStacked() {
  return (
    <section id="arrival" className="bg-bg section-y">
      <div className="container-x">
        <p className="eyebrow text-gold mb-8">01 — Arrival</p>
        <ClipReveal className="aspect-[4/5] rounded-[20px]">
          <Image src={PHOTOS.poolForest.src} alt={PHOTOS.poolForest.alt} fill sizes="100vw" quality={75} className="object-cover" />
        </ClipReveal>
        <div className="mt-12 space-y-12">
          {WORDS.map((w) => (
            <div key={w.word}>
              <RevealText as="p" text={w.word} className="font-display text-display italic font-light" />
              <FadeUp className="mt-3 text-muted leading-relaxed max-w-sm"><p>{w.line}</p></FadeUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
