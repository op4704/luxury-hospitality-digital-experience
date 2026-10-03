"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { StaffShell } from "@/components/layout/StaffShell";
import { REQUESTS, BOOKINGS, getGuest } from "@/data/operations";
import { getRoom } from "@/data/rooms";
import type { GuestRequest, RequestStatus } from "@/lib/types";
import { EASE, cn, fmtDate } from "@/lib/utils";

const COLS: { id: RequestStatus; label: string; dot: string }[] = [
  { id: "new", label: "New", dot: "bg-gold" },
  { id: "in-progress", label: "In progress", dot: "bg-[#8fb3c7]" },
  { id: "done", label: "Done", dot: "bg-[#8fc79a]" },
];

const timeAgo = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function ConciergeBoard() {
  const [items, setItems] = useState<GuestRequest[]>(REQUESTS);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<RequestStatus | null>(null);
  const [profile, setProfile] = useState<string | null>(null);

  const move = (id: string, status: RequestStatus) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status } : x)));

  return (
    <StaffShell title="Guest requests" subtitle={`${items.filter((i) => i.status !== "done").length} open · drag cards between columns, or use the arrows`}>
      <LayoutGroup>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLS.map((col) => {
            const list = items.filter((i) => i.status === col.id);
            return (
              <section
                key={col.id}
                aria-label={col.label}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(col.id);
                }}
                onDragLeave={() => setOver((o) => (o === col.id ? null : o))}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain");
                  if (id) move(id, col.id);
                  setOver(null);
                  setDragging(null);
                }}
                className={cn("rounded-[20px] border p-4 min-h-[420px] transition-colors duration-300", over === col.id ? "border-gold/60 bg-gold/5" : "border-[var(--line-dark)] bg-surface/60")}
              >
                <header className="mb-4 flex items-center justify-between px-1">
                  <h2 className="flex items-center gap-2.5 eyebrow text-[0.64rem]">
                    <span className={cn("h-2 w-2 rounded-full", col.dot)} />
                    {col.label}
                  </h2>
                  <span className="num text-sm text-muted">{list.length}</span>
                </header>
                <ul className="space-y-3">
                  <AnimatePresence>
                    {list.map((r) => {
                      const g = getGuest(r.guestId)!;
                      const idx = COLS.findIndex((c) => c.id === r.status);
                      return (
                        <motion.li
                          key={r.id}
                          layoutId={r.id}
                          layout
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: dragging === r.id ? 0.4 : 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.45, ease: EASE }}
                        >
                          <article
                            draggable
                            onDragStart={(e: React.DragEvent) => {
                              e.dataTransfer.setData("text/plain", r.id);
                              setDragging(r.id);
                            }}
                            onDragEnd={() => setDragging(null)}
                            className="cursor-grab active:cursor-grabbing rounded-[16px] border border-white/8 bg-[#1f1d1a] p-4 hover:border-white/20 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="eyebrow text-[0.58rem] text-gold">{r.type}</p>
                              <time className="text-[0.68rem] text-muted">{timeAgo(r.createdAt)}</time>
                            </div>
                            <p className="mt-2 text-[0.95rem] leading-snug">{r.detail}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <button onClick={() => setProfile(g.id)} className="flex items-center gap-2 text-sm text-ivory/80 hover:text-gold">
                                <span className="relative h-6 w-6 overflow-hidden rounded-full">
                                  <Image src={g.avatar} alt="" fill sizes="24px" className="object-cover" />
                                </span>
                                {g.name}
                              </button>
                              <span className="flex gap-1">
                                <button aria-label="Move back" disabled={idx === 0} onClick={() => move(r.id, COLS[idx - 1].id)} className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-xs hover:border-gold disabled:opacity-25">←</button>
                                <button aria-label="Move forward" disabled={idx === COLS.length - 1} onClick={() => move(r.id, COLS[idx + 1].id)} className="grid h-7 w-7 place-items-center rounded-full border border-white/10 text-xs hover:border-gold disabled:opacity-25">→</button>
                              </span>
                            </div>
                          </article>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </section>
            );
          })}
        </div>
      </LayoutGroup>

      <GuestDrawer id={profile} onClose={() => setProfile(null)} />
    </StaffShell>
  );
}

function GuestDrawer({ id, onClose }: { id: string | null; onClose: () => void }) {
  const g = id ? getGuest(id) : null;
  const stays = BOOKINGS.filter((b) => b.guestId === id);

  useEffect(() => {
    if (!id) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [id, onClose]);

  return (
    <AnimatePresence>
      {g && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-bg/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${g.name} profile`}
            className="fixed right-0 top-0 z-[75] h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-surface p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            data-lenis-prevent
          >
            <button autoFocus onClick={onClose} aria-label="Close profile" className="absolute right-6 top-6 grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-gold">✕</button>
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image src={g.avatar} alt={g.name} fill sizes="80px" className="object-cover" />
            </div>
            <h2 className="mt-5 font-display text-4xl">{g.name}</h2>
            <p className="mt-1 text-muted">{g.country} · {g.visits} stay{g.visits > 1 ? "s" : ""} with us</p>
            <p className="mt-1 text-sm text-ivory/70">{g.email}</p>

            <p className="eyebrow text-gold mt-10 mb-4">Preferences</p>
            <ul className="flex flex-wrap gap-2">
              {g.preferences.map((p) => (
                <li key={p} className="rounded-full border border-white/12 px-3 py-1.5 text-sm">{p}</li>
              ))}
            </ul>

            <p className="eyebrow text-gold mt-10 mb-4">Stays</p>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {stays.map((b) => (
                <li key={b.ref} className="flex items-center justify-between py-3 text-sm">
                  <span>
                    <span className="block text-ivory">{getRoom(b.roomSlug)?.name}</span>
                    <span className="text-muted">{fmtDate(b.checkIn)} – {fmtDate(b.checkOut)} · {b.ref}</span>
                  </span>
                  <span className="eyebrow text-[0.56rem] text-ivory/70">{b.status}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
