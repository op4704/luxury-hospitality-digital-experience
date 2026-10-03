"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ROOMS } from "@/data/rooms";
import type { Room, RoomView } from "@/lib/types";
import { EASE, cn, money } from "@/lib/utils";

const VIEWS: ("All" | RoomView)[] = ["All", "Forest", "Valley", "Lake", "Garden"];
const SIZES = [
  { id: "any", label: "Any size", test: () => true },
  { id: "s", label: "Under 70 m²", test: (r: Room) => r.sizeSqm < 70 },
  { id: "m", label: "70–120 m²", test: (r: Room) => r.sizeSqm >= 70 && r.sizeSqm <= 120 },
  { id: "l", label: "120 m² +", test: (r: Room) => r.sizeSqm > 120 },
];
const MAX_PRICE = Math.max(...ROOMS.map((r) => r.pricePerNight));

export function RoomsListing() {
  const [view, setView] = useState<(typeof VIEWS)[number]>("All");
  const [size, setSize] = useState("any");
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(MAX_PRICE);

  const list = useMemo(
    () =>
      ROOMS.filter(
        (r) =>
          (view === "All" || r.view === view) &&
          SIZES.find((s) => s.id === size)!.test(r) &&
          r.maxGuests >= guests &&
          r.pricePerNight <= price
      ),
    [view, size, guests, price]
  );

  const reset = () => {
    setView("All");
    setSize("any");
    setGuests(1);
    setPrice(MAX_PRICE);
  };

  return (
    <section className="container-x pb-[var(--section-y)]" aria-labelledby="rooms-filter-title">
      <h2 id="rooms-filter-title" className="sr-only">Filter rooms</h2>
      <div className="sticky top-20 md:top-24 z-30 mb-12">
        <div className="glass-ink rounded-[24px] p-3 md:p-4 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <LayoutGroup id="view">
            <div role="radiogroup" aria-label="View" className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
              {VIEWS.map((v) => (
                <button
                  key={v}
                  role="radio"
                  aria-checked={view === v}
                  onClick={() => setView(v)}
                  className={cn("relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors", view === v ? "text-bg" : "text-ivory/75 hover:text-ivory")}
                >
                  {view === v && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-ivory" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">{v}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:ml-auto">
            <label className="flex items-center gap-3 text-sm text-ivory/80">
              <span className="eyebrow text-[0.6rem] text-muted">Size</span>
              <select value={size} onChange={(e) => setSize(e.target.value)} className="rounded-full border border-white/15 bg-transparent px-3 py-1.5 text-ivory">
                {SIZES.map((s) => (
                  <option key={s.id} value={s.id} className="bg-surface">{s.label}</option>
                ))}
              </select>
            </label>

            <div className="flex items-center gap-3 text-sm">
              <span className="eyebrow text-[0.6rem] text-muted" id="guests-label">Guests</span>
              <div className="flex items-center gap-2" role="group" aria-labelledby="guests-label">
                <button aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 hover:border-gold">−</button>
                <span className="num w-4 text-center" aria-live="polite">{guests}</span>
                <button aria-label="More guests" onClick={() => setGuests((g) => Math.min(5, g + 1))} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 hover:border-gold">+</button>
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm">
              <span className="eyebrow text-[0.6rem] text-muted">Up to</span>
              <input type="range" min={400} max={MAX_PRICE} step={20} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-28 accent-[var(--gold)]" aria-valuetext={money(price)} />
              <span className="num w-16 text-ivory">{money(price)}</span>
            </label>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted" aria-live="polite">
          {list.length} of {ROOMS.length} rooms
        </p>
      </div>

      <motion.ul layout className="grid grid-cols-1 md:grid-cols-2 gap-x-[2vw] gap-y-16">
        <AnimatePresence mode="popLayout">
          {list.map((room, i) => (
            <motion.li
              key={room.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: EASE }}
              className={cn(i % 2 === 1 && "md:mt-[14vh]")}
            >
              <RoomCard room={room} index={ROOMS.indexOf(room)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-display text-h3 italic">Nothing quite fits.</p>
          <button onClick={reset} className="mt-6 eyebrow text-gold border-b border-gold/50 pb-1">Clear filters</button>
        </div>
      )}
    </section>
  );
}

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <Link href={`/rooms/${room.slug}`} data-cursor="View" className="group block">
      <ViewTransition name={`room-${room.slug}`} share="morph" default="none">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
          <Image
            src={room.hero.src}
            alt={room.hero.alt}
            fill
            sizes="(max-width:768px) 100vw, 48vw"
            className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.05]"
          />
          <span className="eyebrow num absolute left-5 top-5 text-ivory/85">{String(index + 1).padStart(2, "0")}</span>
          <span className="glass absolute right-4 top-4 rounded-full px-3 py-1.5 eyebrow text-[0.58rem]">{room.view} view</span>
        </div>
      </ViewTransition>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-h3">{room.name}</h3>
          <p className="mt-2 max-w-sm text-muted leading-relaxed">{room.summary}</p>
        </div>
        <p className="shrink-0 text-right">
          <span className="eyebrow block text-[0.58rem] text-muted">From</span>
          <span className="font-display text-2xl">{money(room.pricePerNight)}</span>
        </p>
      </div>
      <p className="mt-4 flex gap-4 border-t border-[var(--line-dark)] pt-4 text-sm text-ivory/70">
        <span>{room.sizeSqm} m²</span>
        <span aria-hidden="true">·</span>
        <span>Up to {room.maxGuests} guests</span>
        <span aria-hidden="true">·</span>
        <span>{room.beds}</span>
      </p>
    </Link>
  );
}
