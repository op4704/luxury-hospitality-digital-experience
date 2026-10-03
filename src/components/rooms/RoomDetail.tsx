"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ViewTransition, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FadeUp, RevealText, ClipReveal } from "@/components/motion/RevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCES } from "@/data/experiences";
import { useBooking } from "@/lib/store";
import type { Room } from "@/lib/types";
import { EASE, cn, fmtDuration, money } from "@/lib/utils";

export function RoomDetail({ room }: { room: Room }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const pairs = room.pairsWith.map((s) => EXPERIENCES.find((e) => e.slug === s)!).filter(Boolean);

  return (
    <main>
      {/* HERO — shared element with the listing card */}
      <section className="relative h-[92svh] min-h-[560px] overflow-hidden">
        <ViewTransition name={`room-${room.slug}`} share="morph" default="none">
          <div className="absolute inset-0">
            <Image src={room.hero.src} alt={room.hero.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </ViewTransition>
        <div className="scrim-b absolute inset-0" />
        <div className="relative z-10 container-x flex h-full flex-col justify-end pb-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-ivory/70">
            <Link href="/rooms" className="hover:text-gold transition-colors">Stay</Link>
            <span className="mx-3 text-gold">/</span>
            <span aria-current="page">{room.name}</span>
          </nav>
          <RevealText as="h1" trigger="mount" delay={0.25} text={room.name} className="font-display text-hero" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mt-5 font-display text-h3 italic font-light text-ivory/85">
            {room.kicker}
          </motion.p>
        </div>
      </section>

      {/* STORY + STICKY GLASS PANEL */}
      <section className="container-x section-y grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-6">
        <div className="lg:col-span-7">
          <FadeUp>
            <p className="eyebrow text-gold mb-8">01 — The room</p>
          </FadeUp>
          <FadeUp className="font-display text-[clamp(1.7rem,2.6vw,2.6rem)] leading-[1.25] text-ivory/95">
            <p>{room.story}</p>
          </FadeUp>
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[var(--line-dark)] pt-8">
            {[
              ["Size", `${room.sizeSqm} m²`],
              ["Sleeps", `Up to ${room.maxGuests}`],
              ["Beds", room.beds],
              ["Outlook", `${room.view} view`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow text-[0.6rem] text-muted">{k}</dt>
                <dd className="mt-2 text-ivory">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <ReservePanel room={room} />
        </aside>
      </section>

      {/* GALLERY */}
      <section className="container-x pb-[var(--section-y)]" aria-label="Gallery">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {room.gallery.map((p, i) => (
            <button
              key={p.src + i}
              onClick={() => setLightbox(i)}
              data-cursor="Open"
              aria-label={`Open photo ${i + 1}: ${p.alt}`}
              className={cn(
                "group relative overflow-hidden rounded-[18px] text-left",
                ["col-span-2 md:col-span-7 aspect-[4/3]", "md:col-span-5 aspect-[4/5] md:aspect-auto", "md:col-span-5 aspect-square md:aspect-[4/5]", "col-span-2 md:col-span-7 aspect-[16/10] md:aspect-auto"][i % 4]
              )}
            >
              <ClipReveal className="absolute inset-0" delay={i * 0.08}>
                <Image src={p.src} alt="" fill sizes="(max-width:768px) 100vw, 58vw" className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
              </ClipReveal>
            </button>
          ))}
        </div>
      </section>

      {/* AMENITIES + FLOOR PLAN */}
      <section className="bg-ivory text-bg section-y">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-6">
          <div className="lg:col-span-5">
            <SectionHeading tone="light" index="02" eyebrow="In the room" title="Considered," italic="not crowded." />
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {room.amenities.map((a, i) => (
                <FadeUp as="li" key={a} delay={i * 0.05} className="flex items-center gap-4 border-b border-[var(--line-light)] py-4">
                  <span className="num eyebrow text-[0.6rem] text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <span>{a}</span>
                </FadeUp>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FloorPlan room={room} />
          </div>
        </div>
      </section>

      {/* PAIRINGS */}
      <section className="container-x section-y">
        <SectionHeading index="03" eyebrow="Pair with" title="Make the days" italic="as good as the nights." />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[2vw]">
          {pairs.map((e, i) => (
            <PairCard key={e.slug} exp={e} delay={i * 0.08} />
          ))}
        </div>
      </section>

      <Lightbox photos={room.gallery} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </main>
  );
}

function ReservePanel({ room }: { room: Room }) {
  const router = useRouter();
  const setRoom = useBooking((s) => s.setRoom);
  const chosen = useBooking((s) => s.roomSlug === room.slug);

  return (
    <div className="lg:sticky lg:top-28">
      <div className="glass rounded-[24px] p-7 md:p-8 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(200,169,106,0.12),transparent_60%)]">
        <p className="eyebrow text-[0.6rem] text-muted">From, per night</p>
        <p className="mt-3 font-display text-[3.4rem] leading-none">{money(room.pricePerNight)}</p>
        <p className="mt-3 text-sm text-ivory/70">Breakfast, Wi-Fi-free evenings and transfers from the valley gate included.</p>
        <div className="rule my-7 opacity-50" />
        <button
          onClick={() => {
            setRoom(room.slug);
            router.push("/booking");
          }}
          className="w-full rounded-full bg-ivory px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-bg transition-colors duration-500 hover:bg-gold"
        >
          {chosen ? "Continue booking →" : "Reserve this room →"}
        </button>
        <Link href="/concierge" className="mt-4 block text-center text-sm text-ivory/70 hover:text-gold transition-colors">
          Questions? Ask the concierge
        </Link>
      </div>
    </div>
  );
}

function FloorPlan({ room }: { room: Room }) {
  const [active, setActive] = useState(room.floorPlan[0].id);
  const zone = room.floorPlan.find((z) => z.id === active)!;
  return (
    <figure>
      <figcaption className="eyebrow text-gold-deep mb-6">Floor plan · hover or tab through</figcaption>
      <div className="rounded-[22px] border border-[var(--line-light)] bg-ivory-2 p-5 md:p-8">
        <svg viewBox="0 0 400 260" className="w-full" role="group" aria-label={`${room.name} floor plan`}>
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#7a5c24" strokeWidth="0.6" strokeOpacity="0.35" />
            </pattern>
          </defs>
          <rect x="10" y="10" width="380" height="240" fill="none" stroke="#0e0d0b" strokeWidth="2.5" />
          {room.floorPlan.map((z) => {
            const on = z.id === active;
            return (
              <g
                key={z.id}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                aria-label={`${z.label}: ${z.note}`}
                onMouseEnter={() => setActive(z.id)}
                onFocus={() => setActive(z.id)}
                onClick={() => setActive(z.id)}
                className="cursor-pointer outline-none"
              >
                <rect x={z.x} y={z.y} width={z.w} height={z.h} fill={on ? "url(#hatch)" : "transparent"} stroke="#0e0d0b" strokeWidth="1" />
                <motion.rect
                  x={z.x}
                  y={z.y}
                  width={z.w}
                  height={z.h}
                  fill="#c8a96a"
                  initial={false}
                  animate={{ opacity: on ? 0.22 : 0 }}
                  transition={{ duration: 0.4 }}
                />
                <text x={z.x + 10} y={z.y + 20} fontSize="10" letterSpacing="1.6" fill="#0e0d0b" style={{ textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>
                  {z.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p key={zone.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
            <span className="font-display text-2xl">{zone.label}</span>
            <span className="text-muted-ink"> — {zone.note}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </figure>
  );
}

function PairCard({ exp, delay }: { exp: (typeof EXPERIENCES)[number]; delay: number }) {
  const toggle = useBooking((s) => s.toggleExperience);
  const added = useBooking((s) => s.experiences.includes(exp.slug));
  return (
    <FadeUp delay={delay} className="group">
      <Link href={`/experiences/${exp.slug}`} data-cursor="Explore" className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
          <Image src={exp.image.src} alt={exp.image.alt} fill sizes="(max-width:768px) 100vw, 31vw" className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
          <div className="glass absolute inset-x-3 bottom-3 rounded-[16px] p-4">
            <p className="eyebrow text-[0.58rem] text-gold">{exp.category} · {fmtDuration(exp.durationMins)}</p>
            <p className="mt-1.5 font-display text-2xl leading-tight">{exp.name}</p>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-ivory/75">{money(exp.price)}</span>
        <button
          onClick={() => toggle(exp.slug)}
          aria-pressed={added}
          className={cn("rounded-full border px-4 py-2 text-[0.66rem] uppercase tracking-[0.16em] transition-colors duration-500", added ? "border-gold bg-gold text-bg" : "border-white/20 hover:border-gold hover:text-gold")}
        >
          {added ? "✓ Added to stay" : "+ Add to stay"}
        </button>
      </div>
    </FadeUp>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: Room["gallery"];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const step = useCallback((d: number) => index !== null && onIndex((index + d + photos.length) % photos.length), [index, onIndex, photos.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[85] grid place-items-center bg-bg/92 p-4 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="relative h-[78vh] w-full max-w-6xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={photos[index!].src} alt={photos[index!].alt} fill sizes="90vw" className="object-contain" />
            </motion.div>
          </AnimatePresence>
          <div className="glass absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full px-3 py-2" onClick={(e) => e.stopPropagation()}>
            <button autoFocus aria-label="Previous photo" onClick={() => step(-1)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">←</button>
            <span className="eyebrow num text-[0.62rem]">{index! + 1} / {photos.length}</span>
            <button aria-label="Next photo" onClick={() => step(1)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">→</button>
            <button aria-label="Close" onClick={onClose} className="ml-2 grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">✕</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
