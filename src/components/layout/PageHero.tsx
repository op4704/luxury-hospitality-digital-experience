"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealText } from "@/components/motion/RevealText";
import type { Photo } from "@/lib/types";
import { EASE } from "@/lib/utils";

/** Shared inner-page hero: image drifts on scroll, title splits in. */
export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  height = "h-[78svh]",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  photo: Photo;
  height?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className={`relative ${height} min-h-[520px] overflow-hidden`}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE }}>
          <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="scrim-b absolute inset-0" />
      <motion.div style={{ opacity: fade }} className="relative z-10 container-x flex h-full flex-col justify-end pb-16 md:pb-20">
        <p className="fade-in eyebrow text-gold mb-6 flex items-center gap-3" style={{ animationDelay: "0.3s" }}>
          <span className="inline-block h-px w-8 bg-current" />
          {eyebrow}
        </p>
        <RevealText as="h1" trigger="mount" delay={0.35} text={title} className="font-display text-display max-w-[14ch]" />
        {intro && (
          <p className="fade-in mt-8 max-w-md text-ivory/80 leading-relaxed" style={{ animationDelay: "0.9s" }}>
            {intro}
          </p>
        )}
      </motion.div>
    </section>
  );
}
