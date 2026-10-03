"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  FadeUp,
  StaggerWords,
  ImageReveal,
  Counter,
} from "@/components/motion-primitives";

const IMG = {
  hero: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2400&auto=format&fit=crop",
  intro: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1800&auto=format&fit=crop",
  room1: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1600&auto=format&fit=crop",
  room2: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
  exp1: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1600&auto=format&fit=crop",
  exp2: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
  explorer: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2200&auto=format&fit=crop",
};

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={IMG.hero}
            alt="Alondra Cay resort at golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />
        </motion.div>
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20">
          <p className="text-cream/70 text-[11px] md:text-[12px] uppercase tracking-[0.2em] mb-5 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Positano · Amalfi Coast
            </motion.span>
          </p>
          <h1 className="font-display text-cream text-[15vw] md:text-[7.5vw] leading-[0.92] tracking-tight">
            <StaggerWords text="A quieter" delay={0.4} />
            <br />
            <StaggerWords text="edge of the" delay={0.52} />
            <br />
            <span className="italic font-light">
              <StaggerWords text="Amalfi Coast." delay={0.64} />
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 md:mt-16">
            <FadeUp delay={1.0} className="max-w-sm">
              <p className="text-cream/75 text-sm md:text-base leading-relaxed">
                Eleven suites. One private cove. Alondra Cay is a boutique
                island resort built around silence, salt air, and the kind
                of service you stop noticing because it&apos;s always right.
              </p>
            </FadeUp>
            <FadeUp delay={1.15}>
              <Link
                href="/property-explorer"
                data-cursor-hover
                className="inline-flex items-center gap-3 text-cream text-[12px] uppercase tracking-[0.16em] border-b border-cream/40 pb-2 hover:border-cream transition-colors"
              >
                Explore the property
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </FadeUp>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-6 right-6 md:right-10 text-cream/60 text-[10px] uppercase tracking-[0.2em] hidden md:flex items-center gap-2"
        >
          <span className="w-8 h-px bg-cream/40" />
          Scroll
        </motion.div>
      </section>

      {/* INTRO / PHILOSOPHY */}
      <section className="bg-cream px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center">
          <div className="md:col-span-5">
            <ImageReveal className="aspect-[4/5]">
              <Image
                src={IMG.intro}
                alt="Private terrace overlooking the sea"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
                The philosophy
              </p>
            </FadeUp>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.04] tracking-tight mb-8">
              <StaggerWords text="We built a place" />
              <br />
              <StaggerWords text="designed to be" delay={0.08} />
              <br />
              <span className="italic font-light text-stone">
                <StaggerWords text="left alone in." delay={0.16} />
              </span>
            </h2>
            <FadeUp delay={0.3} className="max-w-md">
              <p className="text-stone leading-relaxed mb-10">
                No entertainment schedule. No crowded pool deck. Alondra Cay
                was designed around restraint — eleven suites spread across
                four acres of terraced cliffside, so that privacy is the
                default, not an upgrade.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="flex gap-12 md:gap-16">
                <div>
                  <p className="font-display text-4xl md:text-5xl">
                    <Counter value={11} />
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-stone mt-2">
                    Suites
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl md:text-5xl">
                    <Counter value={4} />
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-stone mt-2">
                    Private acres
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl md:text-5xl">
                    <Counter value={1} />
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-stone mt-2">
                    Private cove
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ROOMS TEASER */}
      <section className="bg-ink text-cream px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
            <div>
              <FadeUp>
                <p className="text-[11px] uppercase tracking-[0.18em] text-brass-light mb-6">
                  01 — Stay
                </p>
              </FadeUp>
              <h2 className="font-display text-4xl md:text-6xl tracking-tight">
                <StaggerWords text="Rooms &" />
                <br />
                <span className="italic font-light">
                  <StaggerWords text="suites." delay={0.08} />
                </span>
              </h2>
            </div>
            <FadeUp delay={0.2}>
              <Link
                href="/rooms"
                data-cursor-hover
                className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] border-b border-cream/40 pb-2 hover:border-cream transition-colors"
              >
                View all rooms &rarr;
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {[
              {
                img: IMG.room1,
                name: "The Cliffside Suite",
                detail: "72 m² · Private plunge pool",
              },
              {
                img: IMG.room2,
                name: "The Grove Villa",
                detail: "110 m² · Two terraces",
              },
            ].map((room, i) => (
              <Link
                key={room.name}
                href="/rooms"
                data-cursor-hover
                className="group block"
              >
                <ImageReveal delay={i * 0.1} className="aspect-[4/5] mb-6">
                  <Image
                    src={room.img}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </ImageReveal>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-2xl">{room.name}</p>
                    <p className="text-cream/50 text-sm mt-1">{room.detail}</p>
                  </div>
                  <span className="text-cream/50 group-hover:text-cream group-hover:translate-x-1 transition-all">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCES TEASER */}
      <section className="bg-cream px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 md:mb-20">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
                02 — Live
              </p>
            </FadeUp>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-2xl">
              <StaggerWords text="Ways to spend" />
              <br />
              <span className="italic font-light text-stone">
                <StaggerWords text="your days here." delay={0.08} />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {[
              { img: IMG.exp1, name: "Sunset sailing", tag: "Experiences" },
              { img: IMG.exp2, name: "Cliffside dining", tag: "Experiences" },
              { img: IMG.hero, name: "Private spa ritual", tag: "Experiences" },
            ].map((exp, i) => (
              <Link
                href="/experiences"
                key={exp.name}
                data-cursor-hover
                className="group block"
              >
                <ImageReveal delay={i * 0.08} className="aspect-[3/4] mb-5">
                  <Image
                    src={exp.img}
                    alt={exp.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </ImageReveal>
                <p className="text-[10px] uppercase tracking-[0.14em] text-stone mb-1">
                  {exp.tag}
                </p>
                <p className="font-display text-xl">{exp.name}</p>
              </Link>
            ))}
          </div>

          <FadeUp delay={0.3} className="mt-14 text-center">
            <Link
              href="/experiences"
              data-cursor-hover
              className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] border-b border-ink/30 pb-2 hover:border-ink transition-colors"
            >
              All experiences &rarr;
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* PROPERTY EXPLORER TEASER */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <ImageReveal className="absolute inset-0">
          <Image
            src={IMG.explorer}
            alt="Aerial view of Alondra Cay"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/50" />
        </ImageReveal>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <FadeUp>
            <p className="text-[11px] uppercase tracking-[0.18em] text-cream/70 mb-6">
              03 — Explore
            </p>
          </FadeUp>
          <h2 className="font-display text-cream text-4xl md:text-7xl tracking-tight max-w-3xl leading-[1.02]">
            <StaggerWords text="Walk the property" />
            <br />
            <span className="italic font-light">
              <StaggerWords text="before you arrive." delay={0.08} />
            </span>
          </h2>
          <FadeUp delay={0.3} className="mt-10">
            <Link
              href="/property-explorer"
              data-cursor-hover
              className="inline-flex items-center gap-3 bg-cream text-ink px-8 py-3.5 text-[12px] uppercase tracking-[0.16em] hover:bg-brass hover:text-cream transition-colors duration-300"
            >
              Open the explorer &rarr;
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-6 md:px-10 py-28 md:py-40 text-center">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
            Reserve your stay
          </p>
        </FadeUp>
        <h2 className="font-display text-4xl md:text-7xl tracking-tight mb-10 max-w-4xl mx-auto leading-[1.02]">
          <StaggerWords text="The island is" />
          <br />
          <span className="italic font-light text-stone">
            <StaggerWords text="waiting." delay={0.08} />
          </span>
        </h2>
        <FadeUp delay={0.3}>
          <Link
            href="/booking"
            data-cursor-hover
            className="inline-flex items-center gap-3 border border-ink px-10 py-4 text-[12px] uppercase tracking-[0.16em] hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            Check availability &rarr;
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
