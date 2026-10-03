"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { RangeCalendar } from "./RangeCalendar";
import { AnimatedTotal } from "./AnimatedTotal";
import { TAX_RATE, useQuote } from "./useQuote";
import { ROOMS } from "@/data/rooms";
import { EXPERIENCES, CATEGORIES } from "@/data/experiences";
import { useBooking, type GuestDetails } from "@/lib/store";
import { EASE, cn, fmtDate, fmtDuration, money } from "@/lib/utils";

const STEPS = ["Dates", "Room", "Experiences", "Details", "Review"] as const;

const detailsSchema = z.object({
  firstName: z.string().trim().min(1, "Please add your first name"),
  lastName: z.string().trim().min(1, "Please add your last name"),
  email: z.email("That email doesn't look right"),
  phone: z.string().trim().regex(/^[+\d][\d\s()-]{6,}$/, "Include your country code, e.g. +44 7700 900123"),
  country: z.string().trim().min(2, "Where are you travelling from?"),
  requests: z.string().max(500, "Keep it under 500 characters").optional(),
});

export function BookingFlow() {
  const q = useQuote();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Store is rehydrated from localStorage after mount; pick the first
  // incomplete step so "Reserve" on a room page lands in the right place.
  useEffect(() => {
    const s = useBooking.getState();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with persisted external store
    setMounted(true);
    if (s.confirmedRef) return;
    if (s.checkIn && s.checkOut && s.roomSlug) setStep(2);
    else if (s.checkIn && s.checkOut) setStep(1);
  }, []);

  const canNext = [!!q.checkIn && !!q.checkOut && q.nights > 0, !!q.room && q.room.maxGuests >= q.guests, true, !!q.details, true][step];

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    window.scrollTo({ top: 0 });
  };

  if (mounted && q.confirmedRef) return <Confirmation />;

  return (
    <div className="container-x pt-32 md:pt-40 pb-[var(--section-y)]">
      <header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="eyebrow text-gold mb-5">Reserve · Aranya Estate</p>
          <h1 className="font-display text-display">Plan your stay.</h1>
        </div>
        <Progress step={step} onJump={(i) => i < step && go(i)} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
        <div className="lg:col-span-8 min-h-[480px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.section
              key={step}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40, filter: "blur(6px)" }),
                center: { opacity: 1, x: 0, filter: "blur(0px)" },
                exit: (d: number) => ({ opacity: 0, x: d * -40, filter: "blur(6px)" }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: EASE }}
              aria-labelledby={`step-${step}`}
            >
              <h2 id={`step-${step}`} className="font-display text-h3 mb-8">
                <span className="num text-gold mr-4 text-[0.6em] align-middle">{String(step + 1).padStart(2, "0")}</span>
                {["When are you coming?", "Choose your room", "Add to your days", "Who's travelling?", "Review your stay"][step]}
              </h2>
              {step === 0 && <StepDates />}
              {step === 1 && <StepRoom />}
              {step === 2 && <StepExperiences />}
              {step === 3 && <StepDetails onDone={() => go(4)} />}
              {step === 4 && <StepReview />}
            </motion.section>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between border-t border-[var(--line-dark)] pt-8">
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="eyebrow text-ivory/70 hover:text-gold disabled:opacity-0 transition-colors">
              ← Back
            </button>
            {step < 3 && (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => go(step + 1)}
                className="rounded-full bg-ivory px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-bg transition-colors duration-500 hover:bg-gold disabled:opacity-30"
              >
                {step === 2 ? (q.exps.length ? "Continue →" : "Skip for now →") : "Continue →"}
              </button>
            )}
            {step === 3 && (
              <button type="submit" form="guest-details" className="rounded-full bg-ivory px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-bg transition-colors duration-500 hover:bg-gold">
                Review →
              </button>
            )}
            {step === 4 && <ConfirmButton />}
          </div>
        </div>

        <aside className="lg:col-span-4">
          <Summary />
        </aside>
      </div>
    </div>
  );
}

function Progress({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <nav aria-label="Booking progress">
      <ol className="flex items-center gap-2 md:gap-3">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={i >= step}
              aria-current={i === step ? "step" : undefined}
              className="group flex items-center gap-2"
            >
              <span className={cn("relative grid h-7 w-7 place-items-center rounded-full border text-[0.62rem] num transition-colors duration-500", i < step ? "border-gold bg-gold text-bg" : i === step ? "border-gold text-gold" : "border-white/20 text-ivory/40")}>
                {i < step ? "✓" : i + 1}
              </span>
              <span className={cn("eyebrow text-[0.6rem] hidden xl:inline", i === step ? "text-ivory" : "text-muted")}>{s}</span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="relative h-px w-5 md:w-8 bg-white/15">
                <motion.span className="absolute inset-0 origin-left bg-gold" initial={false} animate={{ scaleX: i < step ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE }} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function StepDates() {
  const { checkIn, checkOut, adults, children, setDates, setGuests } = useBooking();
  return (
    <div className="space-y-10">
      <div className="rounded-[24px] border border-[var(--line-dark)] bg-surface p-5 md:p-8">
        <RangeCalendar start={checkIn} end={checkOut} onChange={setDates} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            ["Adults", adults, (n: number) => setGuests(n, children), 1, 6],
            ["Children", children, (n: number) => setGuests(adults, n), 0, 4],
          ] as const
        ).map(([label, val, set, min, max]) => (
          <div key={label} className="flex items-center justify-between rounded-[18px] border border-[var(--line-dark)] px-6 py-4">
            <span id={`g-${label}`}>{label}</span>
            <div className="flex items-center gap-4" role="group" aria-labelledby={`g-${label}`}>
              <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} disabled={val <= min} onClick={() => set(val - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-gold disabled:opacity-30">−</button>
              <span className="num w-4 text-center" aria-live="polite">{val}</span>
              <button type="button" aria-label={`More ${label.toLowerCase()}`} disabled={val >= max} onClick={() => set(val + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:border-gold disabled:opacity-30">+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepRoom() {
  const { roomSlug, setRoom, nights, guests } = useQuote();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Rooms">
      {ROOMS.map((r) => {
        const fits = r.maxGuests >= guests;
        const on = r.slug === roomSlug;
        return (
          <button
            key={r.slug}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={!fits}
            onClick={() => setRoom(r.slug)}
            className={cn("group overflow-hidden rounded-[20px] border text-left transition-colors duration-500", on ? "border-gold bg-gold/5" : "border-[var(--line-dark)] hover:border-white/30", !fits && "opacity-35")}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={r.hero.src} alt={r.hero.alt} fill sizes="(max-width:640px) 100vw, 30vw" className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
              <AnimatePresence>
                {on && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-gold text-bg">✓</motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-2xl">{r.name}</p>
                <p className="text-sm text-ivory/80 whitespace-nowrap">{money(r.pricePerNight)}<span className="text-muted"> /night</span></p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {r.view} view · {r.sizeSqm} m² · sleeps {r.maxGuests}
                {!fits && " · too small for your party"}
              </p>
              {on && nights > 0 && <p className="mt-3 text-sm text-gold">{nights} nights · {money(r.pricePerNight * nights)}</p>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function StepExperiences() {
  const { experiences, toggleExperience, room } = useQuote();
  const recommended = new Set(room?.pairsWith ?? []);
  return (
    <div className="space-y-12">
      {CATEGORIES.map((cat) => (
        <div key={cat}>
          <p className="eyebrow text-gold mb-4">{cat}</p>
          <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
            {EXPERIENCES.filter((e) => e.category === cat).map((e) => {
              const on = experiences.includes(e.slug);
              return (
                <li key={e.slug}>
                  <label className="flex cursor-pointer items-center gap-5 py-4">
                    <input type="checkbox" checked={on} onChange={() => toggleExperience(e.slug)} className="peer sr-only" />
                    <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-gold", on ? "border-gold bg-gold text-bg" : "border-white/25")}>{on ? "✓" : ""}</span>
                    <span className="relative hidden sm:block h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image src={e.image.src} alt="" fill sizes="80px" className="object-cover" />
                    </span>
                    <span className="flex-1">
                      <span className="font-display text-xl">{e.name}</span>
                      {recommended.has(e.slug) && <span className="ml-3 eyebrow text-[0.55rem] text-gold">Pairs with your room</span>}
                      <span className="block text-sm text-muted">{fmtDuration(e.durationMins)} · {e.summary}</span>
                    </span>
                    <span className="text-sm text-ivory/80 whitespace-nowrap">{money(e.price)}<span className="text-muted"> pp</span></span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function StepDetails({ onDone }: { onDone: () => void }) {
  const { details, setDetails } = useBooking();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestDetails>({ resolver: zodResolver(detailsSchema), defaultValues: details ?? undefined, mode: "onBlur" });

  const field = (name: keyof GuestDetails, label: string, type = "text", auto?: string, span = "") => (
    <div className={span}>
      <label htmlFor={name} className="eyebrow block text-[0.6rem] text-muted mb-2">{label}</label>
      <input
        id={name}
        type={type}
        autoComplete={auto}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-err` : undefined}
        {...register(name)}
        className={cn("w-full rounded-[14px] border bg-surface px-5 py-4 text-ivory outline-none transition-colors focus:border-gold", errors[name] ? "border-[#d98b7a]" : "border-[var(--line-dark)]")}
      />
      <AnimatePresence>
        {errors[name] && (
          <motion.p id={`${name}-err`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-sm text-[#e3a090]">
            {errors[name]?.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <form
      id="guest-details"
      noValidate
      onSubmit={handleSubmit((d) => {
        setDetails(d);
        onDone();
      })}
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
    >
      {field("firstName", "First name", "text", "given-name")}
      {field("lastName", "Last name", "text", "family-name")}
      {field("email", "Email", "email", "email")}
      {field("phone", "Phone", "tel", "tel")}
      {field("country", "Country of residence", "text", "country-name", "sm:col-span-2")}
      <div className="sm:col-span-2">
        <label htmlFor="requests" className="eyebrow block text-[0.6rem] text-muted mb-2">Anything we should know? (optional)</label>
        <textarea id="requests" rows={4} {...register("requests")} className="w-full rounded-[14px] border border-[var(--line-dark)] bg-surface px-5 py-4 text-ivory outline-none focus:border-gold" placeholder="Dietary needs, celebrations, arrival time…" />
      </div>
    </form>
  );
}

function StepReview() {
  const q = useQuote();
  return (
    <div className="space-y-8">
      <div className="relative aspect-[21/9] overflow-hidden rounded-[22px]">
        {q.room && <Image src={q.room.hero.src} alt={q.room.hero.alt} fill sizes="66vw" className="object-cover" />}
        <div className="scrim-b absolute inset-0" />
        <div className="absolute bottom-5 left-6">
          <p className="eyebrow text-[0.6rem] text-gold">Your room</p>
          <p className="font-display text-3xl">{q.room?.name}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          ["Arrive", fmtDate(q.checkIn, { weekday: "short", day: "numeric", month: "short" })],
          ["Depart", fmtDate(q.checkOut, { weekday: "short", day: "numeric", month: "short" })],
          ["Nights", String(q.nights)],
          ["Guests", `${q.adults} adult${q.adults > 1 ? "s" : ""}${q.children ? `, ${q.children} child` : ""}`],
        ].map(([k, v]) => (
          <div key={k} className="border-t border-[var(--line-dark)] pt-4">
            <dt className="eyebrow text-[0.6rem] text-muted">{k}</dt>
            <dd className="mt-2 font-display text-2xl">{v}</dd>
          </div>
        ))}
      </dl>
      {q.details && (
        <div className="rounded-[18px] border border-[var(--line-dark)] p-6">
          <p className="eyebrow text-[0.6rem] text-muted mb-3">Lead guest</p>
          <p>{q.details.firstName} {q.details.lastName} · {q.details.email} · {q.details.phone}</p>
          {q.details.requests && <p className="mt-2 text-muted italic">“{q.details.requests}”</p>}
        </div>
      )}
      <p className="text-sm text-muted">Free cancellation until 21 days before arrival. No payment is taken in this demo.</p>
    </div>
  );
}

function Summary() {
  const q = useQuote();
  const lines = [
    q.room && q.nights > 0 ? { k: `${q.room.name} × ${q.nights} night${q.nights > 1 ? "s" : ""}`, v: q.roomTotal } : null,
    ...q.exps.map((e) => ({ k: `${e.name} × ${Math.max(1, q.adults)}`, v: e.price * Math.max(1, q.adults) })),
  ].filter(Boolean) as { k: string; v: number }[];

  return (
    <div className="lg:sticky lg:top-28 glass rounded-[24px] p-7">
      <p className="eyebrow text-gold mb-6">Your stay</p>
      <p className="font-display text-2xl">
        {q.checkIn ? fmtDate(q.checkIn) : "Arrive"} <span className="text-gold">→</span> {q.checkOut ? fmtDate(q.checkOut) : "Depart"}
      </p>
      <p className="mt-1 text-sm text-muted">{q.guests} guest{q.guests > 1 ? "s" : ""}{q.nights ? ` · ${q.nights} nights` : ""}</p>

      <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm min-h-[3rem]">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.li key={l.k} layout initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.4, ease: EASE }} className="flex justify-between gap-4">
              <span className="text-ivory/80">{l.k}</span>
              <span className="num">{money(l.v)}</span>
            </motion.li>
          ))}
        </AnimatePresence>
        {lines.length === 0 && <li className="text-muted italic">Nothing added yet.</li>}
      </ul>
      {q.subtotal > 0 && (
        <div className="mt-4 flex justify-between text-sm text-muted">
          <span>Taxes &amp; service ({Math.round(TAX_RATE * 100)}%)</span>
          <span className="num">{money(q.taxes)}</span>
        </div>
      )}
      <div className="rule my-6 opacity-60" />
      <div className="flex items-end justify-between">
        <span className="eyebrow text-[0.62rem] text-muted">Total</span>
        <AnimatedTotal value={q.total} className="font-display text-[2.6rem] leading-none num" />
      </div>
    </div>
  );
}

function ConfirmButton() {
  const confirm = useBooking((s) => s.confirm);
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => {
        setBusy(true);
        setTimeout(() => {
          confirm();
          window.scrollTo({ top: 0 });
        }, 900);
      }}
      className="relative overflow-hidden rounded-full bg-gold px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-bg transition-colors duration-500 hover:bg-ivory"
    >
      {busy ? "Confirming…" : "Confirm reservation"}
      {busy && <motion.span className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-bg" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9 }} />}
    </button>
  );
}

function Confirmation() {
  const q = useQuote();
  const reset = useBooking((s) => s.reset);
  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      {q.room && (
        <motion.div className="absolute inset-0" initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 0.35 }} transition={{ duration: 2.4, ease: EASE }}>
          <Image src={q.room.hero.src} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/80 to-bg" />
      <div className="relative container-x flex min-h-[100svh] flex-col items-center justify-center py-32 text-center">
        <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
          <motion.circle cx="60" cy="60" r="54" fill="none" stroke="#C8A96A" strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: EASE }} />
          <motion.path d="M38 62 L54 77 L84 45" fill="none" stroke="#C8A96A" strokeWidth="1.6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 1.1 }} />
        </svg>
        <motion.p className="eyebrow text-gold mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          Reservation confirmed
        </motion.p>
        <motion.h1 className="mt-6 font-display text-display" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1, ease: EASE }}>
          We&apos;ll see you <span className="italic font-light">soon{q.details ? `, ${q.details.firstName}` : ""}.</span>
        </motion.h1>
        <motion.div className="mt-10 glass rounded-[22px] px-8 py-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 1, ease: EASE }}>
          <p className="eyebrow text-[0.6rem] text-muted">Booking reference</p>
          <p className="mt-2 font-display text-4xl tracking-[0.12em] num">{q.confirmedRef}</p>
          <p className="mt-3 text-sm text-ivory/75">
            {q.room?.name} · {fmtDate(q.checkIn)} – {fmtDate(q.checkOut)} · {money(q.total)}
          </p>
        </motion.div>
        <motion.p className="mt-8 max-w-md text-ivory/75 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          Your concierge, Lakshmi, will write within the hour to arrange your transfer from Kochi and anything else you&apos;d like waiting on arrival.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          <Link href="/concierge" className="rounded-full bg-ivory px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.18em] text-bg hover:bg-gold transition-colors">Message the concierge</Link>
          <button onClick={reset} className="rounded-full border border-white/25 px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.18em] hover:border-gold hover:text-gold transition-colors">Plan another stay</button>
        </motion.div>
      </div>
    </div>
  );
}
