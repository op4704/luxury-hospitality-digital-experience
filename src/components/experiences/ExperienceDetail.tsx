"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FadeUp, RevealText } from "@/components/motion/RevealText";
import { EXPERIENCES } from "@/data/experiences";
import { ROOMS } from "@/data/rooms";
import { useBooking } from "@/lib/store";
import type { Experience } from "@/lib/types";
import { EASE, cn, fmtDuration, money } from "@/lib/utils";

export function ExperienceDetail({ exp }: { exp: Experience }) {
  const add = useBooking((s) => s.toggleExperience);
  const added = useBooking((s) => s.experiences.includes(exp.slug));
  const more = EXPERIENCES.filter((e) => e.category === exp.category && e.slug !== exp.slug).slice(0, 2);
  const rooms = ROOMS.filter((r) => r.pairsWith.includes(exp.slug));

  return (
    <main>
      <section className="relative h-[88svh] min-h-[560px] overflow-hidden">
        <ViewTransition name={`exp-${exp.slug}`} share="morph" default="none">
          <div className="absolute inset-0">
            <Image src={exp.image.src} alt={exp.image.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </ViewTransition>
        <div className="scrim-b absolute inset-0" />
        <div className="relative z-10 container-x flex h-full flex-col justify-end pb-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-ivory/70">
            <Link href="/experiences" className="hover:text-gold transition-colors">Experiences</Link>
            <span className="mx-3 text-gold">/</span>
            <span>{exp.category}</span>
          </nav>
          <RevealText as="h1" trigger="mount" delay={0.25} text={exp.name} className="font-display text-display max-w-[16ch]" />
        </div>
      </section>

      <section className="container-x section-y grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-6">
        <div className="lg:col-span-7">
          <FadeUp className="font-display text-[clamp(1.7rem,2.6vw,2.6rem)] leading-[1.25]">
            <p>{exp.story}</p>
          </FadeUp>

          <div className="mt-16">
            <p className="eyebrow text-gold mb-8">The schedule</p>
            <ol className="relative border-l border-[var(--line-dark)] ml-2">
              {exp.schedule.map((s, i) => (
                <FadeUp as="li" key={s.time} delay={i * 0.08} className="relative pl-10 pb-10 last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-gold" />
                  <p className="num font-display text-3xl text-ivory">{s.time}</p>
                  <p className="mt-1 text-ivory/75">{s.detail}</p>
                </FadeUp>
              ))}
            </ol>
          </div>

          <div className="mt-16">
            <p className="eyebrow text-gold mb-5">Included</p>
            <ul className="flex flex-wrap gap-3">
              {exp.includes.map((x) => (
                <li key={x} className="rounded-full border border-[var(--line-dark)] px-4 py-2 text-sm text-ivory/80">{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28 glass rounded-[24px] p-7 md:p-8">
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted">Duration</dt>
                <dd className="mt-2 font-display text-3xl">{fmtDuration(exp.durationMins)}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.6rem] text-muted">Per guest</dt>
                <dd className="mt-2 font-display text-3xl">{money(exp.price)}</dd>
              </div>
            </dl>
            <div className="rule my-7 opacity-50" />
            <button
              onClick={() => add(exp.slug)}
              aria-pressed={added}
              className={cn("relative w-full overflow-hidden rounded-full px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500", added ? "bg-gold text-bg" : "bg-ivory text-bg hover:bg-gold")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={String(added)} className="block" initial={{ y: "120%" }} animate={{ y: "0%" }} exit={{ y: "-120%" }} transition={{ duration: 0.4, ease: EASE }}>
                  {added ? "✓ Added to your stay" : "+ Add to stay"}
                </motion.span>
              </AnimatePresence>
            </button>
            <AnimatePresence>
              {added && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <Link href="/booking" className="mt-4 block text-center text-sm text-gold hover:underline">Continue to booking →</Link>
                </motion.div>
              )}
            </AnimatePresence>
            {rooms.length > 0 && (
              <p className="mt-6 text-sm text-ivory/65">
                Lovely from{" "}
                {rooms.map((r, i) => (
                  <span key={r.slug}>
                    <Link href={`/rooms/${r.slug}`} className="text-ivory underline decoration-gold/60 underline-offset-4 hover:text-gold">{r.name}</Link>
                    {i < rooms.length - 1 ? (i === rooms.length - 2 ? " or " : ", ") : "."}
                  </span>
                ))}
              </p>
            )}
          </div>
        </aside>
      </section>

      {more.length > 0 && (
        <section className="bg-ivory text-bg section-y">
          <div className="container-x">
            <p className="eyebrow text-gold-deep mb-10">More {exp.category.toLowerCase()}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[2vw]">
              {more.map((m) => (
                <Link key={m.slug} href={`/experiences/${m.slug}`} data-cursor="Explore" className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
                    <Image src={m.image.src} alt={m.image.alt} fill sizes="(max-width:768px) 100vw, 48vw" className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
                  </div>
                  <p className="mt-5 font-display text-h3">{m.name}</p>
                  <p className="mt-1 text-muted-ink">{m.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
