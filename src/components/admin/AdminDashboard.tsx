"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StaffShell } from "@/components/layout/StaffShell";
import { BOOKINGS, OCCUPANCY, getGuest } from "@/data/operations";
import { ROOMS as SEED_ROOMS } from "@/data/rooms";
import { EXPERIENCES as SEED_EXPS } from "@/data/experiences";
import type { BookingStatus } from "@/lib/types";
import { EASE, cn, fmtDate, fmtDuration, money } from "@/lib/utils";

const STATUS_STYLE: Record<BookingStatus, string> = {
  confirmed: "bg-[#8fb3c7]/15 text-[#a9c8da]",
  pending: "bg-gold/15 text-gold",
  "checked-in": "bg-[#8fc79a]/15 text-[#a6d6b0]",
  cancelled: "bg-white/5 text-ivory/50 line-through",
};

export function AdminDashboard() {
  const revenue = BOOKINGS.filter((b) => b.status !== "cancelled").reduce((t, b) => t + b.total, 0);
  const avgOcc = Math.round(OCCUPANCY.reduce((a, b) => a + b, 0) / OCCUPANCY.length);
  const inHouse = BOOKINGS.filter((b) => b.status === "checked-in").length;

  return (
    <StaffShell title="Estate overview" subtitle="October 2026 · demo data">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Avg. occupancy", `${avgOcc}%`],
          ["Booked revenue", money(revenue)],
          ["Guests in house", String(inHouse)],
          ["Upcoming arrivals", String(BOOKINGS.filter((b) => b.status === "confirmed" || b.status === "pending").length)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[18px] border border-[var(--line-dark)] bg-surface/60 p-5">
            <p className="text-sm text-muted">{k}</p>
            <p className="mt-2 font-display text-4xl num">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-5 gap-6">
        <OccupancyChart className="xl:col-span-3" />
        <AvailabilityCalendar className="xl:col-span-2" />
      </div>

      <BookingsTable />
      <ContentManager />
    </StaffShell>
  );
}

function Panel({ title, children, className, action }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return (
    <section className={cn("rounded-[20px] border border-[var(--line-dark)] bg-surface/60 p-5 md:p-6", className)} aria-label={title}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function OccupancyChart({ className }: { className?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 600;
  const H = 220;
  const pad = 28;
  const step = (W - pad * 2) / (OCCUPANCY.length - 1);
  const pts = OCCUPANCY.map((v, i) => [pad + i * step, H - pad - (v / 100) * (H - pad * 2)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${pts.at(-1)![0]},${H - pad} L${pad},${H - pad} Z`;

  return (
    <Panel title="Occupancy, next 14 days" className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Occupancy ranges from ${Math.min(...OCCUPANCY)}% to ${Math.max(...OCCUPANCY)}%`}>
        <defs>
          <linearGradient id="occ" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C8A96A" stopOpacity="0.35" />
            <stop offset="1" stopColor="#C8A96A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75, 100].map((g) => {
          const y = H - pad - (g / 100) * (H - pad * 2);
          return (
            <g key={g}>
              <line x1={pad} x2={W - pad} y1={y} y2={y} stroke="rgba(243,238,230,0.08)" />
              <text x={4} y={y + 3} fontSize="9" fill="#A39E94">{g}%</text>
            </g>
          );
        })}
        <motion.path d={area} fill="url(#occ)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} />
        <motion.path d={line} fill="none" stroke="#C8A96A" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: EASE }} />
        {pts.map((p, i) => (
          <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <rect x={p[0] - step / 2} y={0} width={step} height={H} fill="transparent" />
            <circle cx={p[0]} cy={p[1]} r={hover === i ? 5 : 2.5} fill="#C8A96A" />
            {i % 2 === 0 && <text x={p[0]} y={H - 8} fontSize="9" fill="#A39E94" textAnchor="middle">{i + 1}</text>}
          </g>
        ))}
        {hover !== null && (
          <g>
            <line x1={pts[hover][0]} x2={pts[hover][0]} y1={pad} y2={H - pad} stroke="rgba(243,238,230,0.25)" strokeDasharray="3 3" />
            <rect x={pts[hover][0] - 30} y={pts[hover][1] - 32} width="60" height="22" rx="11" fill="#F3EEE6" />
            <text x={pts[hover][0]} y={pts[hover][1] - 17} fontSize="11" textAnchor="middle" fill="#0E0D0B" fontWeight="600">Oct {hover + 1} · {OCCUPANCY[hover]}%</text>
          </g>
        )}
      </svg>
    </Panel>
  );
}

function AvailabilityCalendar({ className }: { className?: string }) {
  const days = Array.from({ length: 14 }, (_, i) => new Date(2026, 9, 1 + i));
  const booked = (slug: string, d: Date) => {
    const iso = d.toISOString().slice(0, 10);
    return BOOKINGS.find((b) => b.roomSlug === slug && b.status !== "cancelled" && iso >= b.checkIn && iso < b.checkOut);
  };
  return (
    <Panel title="Room availability" className={className} action={<span className="flex items-center gap-3 text-xs text-muted"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-gold/70" />Booked</span>}>
      <div className="overflow-x-auto" data-lenis-prevent>
        <table className="w-full border-separate border-spacing-[3px] text-xs">
          <thead>
            <tr>
              <th scope="col" className="text-left font-normal text-muted pr-2">Room</th>
              {days.map((d) => (
                <th key={d.getDate()} scope="col" className="w-6 font-normal text-muted num">{d.getDate()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEED_ROOMS.map((r) => (
              <tr key={r.slug}>
                <th scope="row" className="whitespace-nowrap pr-2 text-left font-normal text-ivory/85">{r.name}</th>
                {days.map((d) => {
                  const b = booked(r.slug, d);
                  return (
                    <td key={d.getDate()} title={b ? `${getGuest(b.guestId)?.name} · ${b.ref}` : "Available"} className={cn("h-6 rounded-[4px]", b ? "bg-gold/70" : "bg-white/[0.04]")}>
                      <span className="sr-only">{b ? "Booked" : "Available"}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function BookingsTable() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | BookingStatus>("all");
  const rows = useMemo(
    () =>
      BOOKINGS.filter((b) => (status === "all" || b.status === status) && (getGuest(b.guestId)!.name + b.ref).toLowerCase().includes(q.toLowerCase())),
    [q, status]
  );
  return (
    <Panel
      title="Bookings"
      className="mt-6"
      action={
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="bk-search">Search bookings</label>
          <input id="bk-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search guest or ref" className="w-44 rounded-full border border-white/12 bg-transparent px-4 py-1.5 text-sm outline-none focus:border-gold" />
          <label className="sr-only" htmlFor="bk-status">Filter by status</label>
          <select id="bk-status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="rounded-full border border-white/12 bg-transparent px-3 py-1.5 text-sm">
            {["all", "confirmed", "pending", "checked-in", "cancelled"].map((s) => (
              <option key={s} value={s} className="bg-surface">{s}</option>
            ))}
          </select>
        </div>
      }
    >
      <div className="overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-muted">
              {["Ref", "Guest", "Room", "Dates", "Guests", "Total", "Status"].map((h) => (
                <th key={h} scope="col" className="py-3 pr-4 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map((b) => (
                <motion.tr key={b.ref} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 pr-4 num text-ivory/80">{b.ref}</td>
                  <td className="py-3 pr-4">{getGuest(b.guestId)?.name}</td>
                  <td className="py-3 pr-4 text-ivory/80">{SEED_ROOMS.find((r) => r.slug === b.roomSlug)?.name}</td>
                  <td className="py-3 pr-4 text-ivory/80">{fmtDate(b.checkIn)} – {fmtDate(b.checkOut)}</td>
                  <td className="py-3 pr-4 num">{b.guests}</td>
                  <td className="py-3 pr-4 num">{money(b.total)}</td>
                  <td className="py-3 pr-4"><span className={cn("rounded-full px-2.5 py-1 text-xs", STATUS_STYLE[b.status])}>{b.status}</span></td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {rows.length === 0 && <p className="py-8 text-center text-muted">No bookings match.</p>}
      </div>
    </Panel>
  );
}

type Row = { slug: string; name: string; meta: string; price: number };

function ContentManager() {
  const [tab, setTab] = useState<"rooms" | "experiences">("rooms");
  const [rooms, setRooms] = useState<Row[]>(SEED_ROOMS.map((r) => ({ slug: r.slug, name: r.name, meta: `${r.view} · ${r.sizeSqm} m² · sleeps ${r.maxGuests}`, price: r.pricePerNight })));
  const [exps, setExps] = useState<Row[]>(SEED_EXPS.map((e) => ({ slug: e.slug, name: e.name, meta: `${e.category} · ${fmtDuration(e.durationMins)}`, price: e.price })));
  const [editing, setEditing] = useState<Row | null>(null);
  const list = tab === "rooms" ? rooms : exps;
  const setList = tab === "rooms" ? setRooms : setExps;

  return (
    <Panel
      title="Content"
      className="mt-6"
      action={
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-white/12 p-0.5" role="tablist" aria-label="Content type">
            {(["rooms", "experiences"] as const).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("rounded-full px-3.5 py-1 text-sm capitalize", tab === t ? "bg-white/10" : "text-ivory/60")}>{t}</button>
            ))}
          </div>
          <button onClick={() => setEditing({ slug: "", name: "", meta: "", price: 0 })} className="rounded-full bg-ivory px-4 py-1.5 text-sm text-bg hover:bg-gold">+ New</button>
        </div>
      }
    >
      <ul className="divide-y divide-white/6">
        <AnimatePresence initial={false}>
          {list.map((r) => (
            <motion.li key={r.slug} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: EASE }} className="flex items-center gap-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="truncate">{r.name}</p>
                <p className="truncate text-sm text-muted">{r.meta}</p>
              </div>
              <span className="num text-sm text-ivory/80">{money(r.price)}</span>
              <button onClick={() => setEditing(r)} className="rounded-full border border-white/12 px-3 py-1 text-sm hover:border-gold">Edit</button>
              <button onClick={() => setList((xs) => xs.filter((x) => x.slug !== r.slug))} aria-label={`Delete ${r.name}`} className="rounded-full border border-white/12 px-3 py-1 text-sm text-[#e3a090] hover:border-[#e3a090]">Delete</button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {editing && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-bg/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditing(null)}>
            <motion.form
              role="dialog"
              aria-modal="true"
              aria-label={editing.slug ? "Edit item" : "New item"}
              className="w-full max-w-md rounded-[22px] border border-white/10 bg-surface p-6"
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const row: Row = {
                  slug: editing.slug || String(fd.get("name")).toLowerCase().replace(/\W+/g, "-") + "-" + Date.now().toString(36),
                  name: String(fd.get("name")),
                  meta: String(fd.get("meta")),
                  price: Number(fd.get("price")) || 0,
                };
                setList((xs) => (editing.slug ? xs.map((x) => (x.slug === editing.slug ? row : x)) : [row, ...xs]));
                setEditing(null);
              }}
            >
              <h3 className="font-display text-2xl mb-5">{editing.slug ? "Edit" : "New"} {tab === "rooms" ? "room" : "experience"}</h3>
              {(
                [
                  ["name", "Name", editing.name, "text"],
                  ["meta", "Details", editing.meta, "text"],
                  ["price", tab === "rooms" ? "Price per night (USD)" : "Price per guest (USD)", String(editing.price || ""), "number"],
                ] as const
              ).map(([n, l, v, t]) => (
                <label key={n} className="mb-4 block">
                  <span className="mb-1.5 block text-sm text-muted">{l}</span>
                  <input name={n} defaultValue={v} type={t} required min={t === "number" ? 0 : undefined} className="w-full rounded-[12px] border border-white/12 bg-transparent px-4 py-2.5 outline-none focus:border-gold" />
                </label>
              ))}
              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setEditing(null)} className="rounded-full px-4 py-2 text-sm text-ivory/70 hover:text-ivory">Cancel</button>
                <button type="submit" className="rounded-full bg-ivory px-5 py-2 text-sm text-bg hover:bg-gold">Save</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  );
}
