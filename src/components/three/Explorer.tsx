"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ZONES } from "@/data/zones";
import { PHOTOS } from "@/data/photos";
import type { ZoneId } from "@/lib/types";
import { useMediaQuery } from "@/lib/hooks";
import { EASE, cn } from "@/lib/utils";

const EstateScene = dynamic(() => import("@/components/three/EstateScene"), {
  ssr: false,
  loading: () => <Loader />,
});

function Loader() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-bg" role="status">
      <div className="text-center">
        <svg viewBox="0 0 80 80" className="mx-auto h-16 w-16" aria-hidden="true">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(243,238,230,0.12)" strokeWidth="1" />
          <motion.circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#C8A96A"
            strokeWidth="1.2"
            strokeLinecap="round"
            animate={{ pathLength: [0.05, 0.9, 0.05], rotate: [0, 360] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "50%", originY: "50%" }}
          />
        </svg>
        <p className="eyebrow mt-6 text-muted">Drawing the estate…</p>
      </div>
    </div>
  );
}

/** Decide once on mount whether this device should get the 3D scene. */
function useCanRender3D() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [capable, setCapable] = useState<boolean | null>(null);
  useEffect(() => {
    let ok = false;
    try {
      const c = document.createElement("canvas");
      ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      ok = false;
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd = (nav.deviceMemory !== undefined && nav.deviceMemory < 4) || navigator.hardwareConcurrency <= 2;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability probe of the browser
    setCapable(ok && !lowEnd);
  }, []);
  if (capable === null) return null;
  return capable && !reduced;
}

export function Explorer() {
  const can3D = useCanRender3D();
  const [mode, setMode] = useState<"3d" | "map" | null>(null);
  const [active, setActive] = useState<ZoneId | null>(null);
  const [night, setNight] = useState(false);
  const effective = mode ?? (can3D === null ? null : can3D ? "3d" : "map");
  const zone = ZONES.find((z) => z.id === active);

  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-bg" aria-label="Property explorer">
      {effective === "3d" && <EstateScene active={active} night={night} onSelect={setActive} />}
      {effective === "map" && <MapFallback active={active} onSelect={setActive} night={night} />}
      {effective === null && <Loader />}

      {/* top-left title */}
      <div className="pointer-events-none absolute left-0 top-0 z-[25] container-x pt-28 md:pt-32">
        <p className="eyebrow text-gold mb-3">Explore · 120 acres</p>
        <h1 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.95] max-w-[12ch] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          Walk the estate <span className="italic font-light">before you arrive.</span>
        </h1>
      </div>

      {/* controls */}
      <div className="absolute bottom-6 left-[var(--gutter)] z-20 flex flex-wrap items-center gap-2">
        <div className="glass-ink flex rounded-full p-1" role="group" aria-label="Lighting">
          {(["Day", "Night"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setNight(l === "Night")}
              aria-pressed={night === (l === "Night")}
              className={cn("rounded-full px-4 py-2 eyebrow text-[0.6rem] transition-colors", night === (l === "Night") ? "bg-ivory text-bg" : "text-ivory/80 hover:text-ivory")}
            >
              {l === "Day" ? "☼ Day" : "☾ Night"}
            </button>
          ))}
        </div>
        <div className="glass-ink flex rounded-full p-1" role="group" aria-label="View mode">
          {(["3d", "map"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={effective === m}
              disabled={m === "3d" && can3D === false && mode !== "3d"}
              className={cn("rounded-full px-4 py-2 eyebrow text-[0.6rem] transition-colors disabled:opacity-40", effective === m ? "bg-ivory text-bg" : "text-ivory/80 hover:text-ivory")}
            >
              {m === "3d" ? "3D" : "Map"}
            </button>
          ))}
        </div>
        {active && (
          <button onClick={() => setActive(null)} className="glass-ink rounded-full px-4 py-3 eyebrow text-[0.6rem] text-ivory/85 hover:text-ivory">
            ⤢ Overview
          </button>
        )}
      </div>

      {/* zone index (desktop) */}
      <nav aria-label="Estate areas" className="absolute right-[var(--gutter)] top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <ol className="space-y-1">
          {ZONES.map((z) => (
            <li key={z.id}>
              <button
                onClick={() => setActive(z.id)}
                aria-current={active === z.id}
                className={cn("group flex w-full items-center justify-end gap-3 py-1.5 text-right transition-colors", active === z.id ? "text-ivory" : "text-ivory/55 hover:text-ivory")}
              >
                <span className="font-display text-xl">{z.name}</span>
                <span className={cn("num eyebrow text-[0.6rem]", active === z.id ? "text-gold" : "")}>{z.index}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* glass side panel */}
      <AnimatePresence>
        {zone && (
          <motion.aside
            key={zone.id}
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass absolute z-30 rounded-[26px] p-5 md:p-6 inset-x-3 bottom-20 md:inset-x-auto md:bottom-6 md:right-6 md:top-28 md:w-[380px] overflow-y-auto"
            aria-label={zone.name}
            data-lenis-prevent
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow num text-[0.6rem] text-gold">{zone.index} / 0{ZONES.length}</p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{zone.name}</h2>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close panel" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 hover:border-gold">✕</button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {zone.photos.map((p, i) => (
                <motion.div key={p.src} className="relative aspect-[4/5] overflow-hidden rounded-[14px]" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.08 }}>
                  <Image src={p.src} alt={p.alt} fill sizes="190px" className="object-cover" />
                </motion.div>
              ))}
            </div>
            <p className="mt-5 text-ivory/85 leading-relaxed">{zone.description}</p>
            <ul className="mt-5 space-y-1 border-t border-white/10 pt-4">
              {zone.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-center justify-between py-2 text-ivory hover:text-gold transition-colors">
                    {l.label}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}

/** 2D image-map fallback for low-end devices / reduced motion. */
function MapFallback({ active, onSelect, night }: { active: ZoneId | null; onSelect: (z: ZoneId) => void; night: boolean }) {
  return (
    <div className="absolute inset-0">
      <Image src={PHOTOS.forestAerial.src} alt="Aerial view of the Aranya estate" fill priority sizes="100vw" className={cn("object-cover transition-[filter] duration-1000", night && "brightness-[0.35] saturate-[0.6] hue-rotate-[200deg]")} />
      <div className="absolute inset-0 bg-bg/35" />
      {ZONES.map((z) => (
        <button
          key={z.id}
          onClick={() => onSelect(z.id)}
          aria-pressed={active === z.id}
          aria-label={`${z.name} — show details`}
          style={{ left: `${z.map.x}%`, top: `${z.map.y}%` }}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full p-1.5 pr-3 text-[0.62rem] uppercase tracking-[0.16em] transition-colors",
            active === z.id ? "bg-ivory text-bg" : "glass-ink text-ivory hover:bg-white/20"
          )}
        >
          <span className={cn("grid h-6 w-6 place-items-center rounded-full", active === z.id ? "bg-bg text-ivory" : "bg-gold text-bg")}>{z.index}</span>
          <span className="hidden sm:inline">{z.name}</span>
        </button>
      ))}
    </div>
  );
}
