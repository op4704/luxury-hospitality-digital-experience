"use client";

import Image from "next/image";
import Link from "next/link";
import { HorizontalScroller } from "@/components/motion/HorizontalScroller";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROOMS } from "@/data/rooms";
import { money } from "@/lib/utils";

export function RoomsTeaser() {
  return (
    <HorizontalScroller
      id="stay"
      className="bg-bg"
      header={
        <div className="container-x flex flex-col md:flex-row md:items-end justify-between gap-8">
          <SectionHeading index="03" eyebrow="Stay" title="Eighteen ways" italic="to wake up here." />
          <p className="max-w-xs text-muted leading-relaxed md:pb-3">
            Suites in the canopy, pavilions on the lake, and villas with pools that end at the edge of the ridge.
          </p>
        </div>
      }
    >
      {ROOMS.map((room, i) => (
        <Link
          key={room.slug}
          href={`/rooms/${room.slug}`}
          data-cursor="View"
          className="group relative shrink-0 snap-start overflow-hidden rounded-[22px] w-[82vw] h-[64svh] md:w-[clamp(340px,30vw,560px)] md:h-[58vh]"
        >
          <Image
            src={room.hero.src}
            alt={room.hero.alt}
            fill
            sizes="(max-width:768px) 82vw, 30vw"
            quality={75}
            className="object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          <span className="eyebrow num absolute left-5 top-5 text-ivory/80">{String(i + 1).padStart(2, "0")}</span>
          <div className="glass absolute inset-x-3 bottom-3 rounded-[18px] p-5 transition-transform duration-700 ease-expo group-hover:-translate-y-1">
            <p className="eyebrow text-[0.6rem] text-gold">{room.view} view</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-[1.75rem] leading-none">{room.name}</h3>
                <p className="mt-2 text-sm text-ivory/75">{room.sizeSqm} m² · up to {room.maxGuests} guests</p>
              </div>
              <p className="text-right text-sm text-ivory/75 whitespace-nowrap">
                from <span className="font-display text-xl text-ivory">{money(room.pricePerNight)}</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
      <Link
        href="/rooms"
        data-cursor="All rooms"
        className="group relative grid shrink-0 snap-start place-items-center rounded-[22px] border border-[var(--line-dark)] w-[60vw] h-[64svh] md:w-[clamp(260px,20vw,380px)] md:h-[58vh] hover:border-gold transition-colors duration-700"
      >
        <span className="text-center">
          <span className="font-display text-h3 italic block">See every room</span>
          <span className="eyebrow mt-4 block text-gold">Compare &amp; filter →</span>
        </span>
      </Link>
    </HorizontalScroller>
  );
}
