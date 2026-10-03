"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealText } from "@/components/motion/RevealText";
import { GlassCard } from "@/components/ui/GlassCard";
import { useBooking } from "@/lib/store";
import { PHOTOS } from "@/data/photos";
import { ESTATE } from "@/data/estate";
import { EASE } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const veil = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <section id="hero" ref={ref} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-bg">
      {/* scroll-out on the outer layer, Ken Burns on the inner */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale: imgScale, y: imgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.16 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 14, ease: "easeOut" }}
        >
          <Image src={PHOTOS.villaHills.src} alt={PHOTOS.villaHills.alt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="scrim-b absolute inset-0" />
      <motion.div className="absolute inset-0 bg-bg" style={{ opacity: veil }} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 flex h-full flex-col justify-end container-x pb-36 md:pb-40">
        <p className="fade-in eyebrow text-ivory/80 mb-6 flex items-center gap-3" style={{ animationDelay: "0.3s" }}>
          <span className="inline-block w-8 h-px bg-gold" />
          {ESTATE.place}
        </p>
        <RevealText
          as="h1"
          trigger="mount"
          delay={0.45}
          stagger={0.08}
          text={"Where time\nslows down."}
          className="font-display text-hero max-w-[12ch]"
        />
      </motion.div>

      <HeroBookingBar fade={fade} />

      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 right-[var(--gutter)] z-10 hidden md:flex flex-col items-center gap-3 text-ivory/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ opacity: fade }}
      >
        <span className="eyebrow text-[0.6rem] [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function HeroBookingBar({ fade }: { fade: ReturnType<typeof useTransform<number, number>> }) {
  const adults = useBooking((s) => s.adults);
  const children = useBooking((s) => s.children);
  const setGuests = useBooking((s) => s.setGuests);

  return (
    <motion.div
      className="absolute inset-x-0 bottom-6 z-20 container-x"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
    >
      <motion.div style={{ opacity: fade }}>
        <GlassCard as="form" className="flex flex-row items-center gap-0 p-1.5 md:p-2 md:pl-2 max-w-[880px]">
          <Link href="/booking" className="group flex-1 rounded-2xl px-4 md:px-5 py-2.5 md:py-3 hover:bg-white/5 transition-colors">
            <span className="eyebrow block text-[0.6rem] text-ivory/60">Arrive — Depart</span>
            <span className="mt-1 block text-[0.95rem] text-ivory">Choose your dates</span>
          </Link>
          <span className="hidden md:block w-px h-10 bg-white/10" />
          <div className="hidden md:flex flex-1 items-center justify-between rounded-2xl px-5 py-3">
            <div>
              <span className="eyebrow block text-[0.6rem] text-ivory/60" id="hero-guests">Guests</span>
              <span className="mt-1 block text-[0.95rem] text-ivory num" aria-live="polite">
                {adults} adult{adults > 1 ? "s" : ""}{children ? ` · ${children} child${children > 1 ? "ren" : ""}` : ""}
              </span>
            </div>
            <div className="flex gap-1.5" role="group" aria-labelledby="hero-guests">
              <button type="button" aria-label="Fewer adults" onClick={() => setGuests(Math.max(1, adults - 1), children)} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-ivory/80 hover:border-gold hover:text-gold transition-colors">−</button>
              <button type="button" aria-label="More adults" onClick={() => setGuests(Math.min(6, adults + 1), children)} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-ivory/80 hover:border-gold hover:text-gold transition-colors">+</button>
            </div>
          </div>
          <Link
            href="/booking"
            className="shrink-0 rounded-full bg-ivory px-5 md:px-7 py-3.5 md:py-4 text-center text-[0.66rem] md:text-[0.7rem] font-medium uppercase tracking-[0.16em] md:tracking-[0.18em] text-bg transition-colors duration-500 hover:bg-gold"
          >
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">Check availability</span>
          </Link>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
