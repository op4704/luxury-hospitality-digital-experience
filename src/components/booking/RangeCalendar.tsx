"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, cn, toISO } from "@/lib/utils";

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Two-month range calendar (custom, keyboard accessible). */
export function RangeCalendar({
  start,
  end,
  onChange,
}: {
  start: string | null;
  end: string | null;
  onChange: (start: string | null, end: string | null) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [cursor, setCursor] = useState(() => {
    const base = start ? new Date(start + "T00:00:00") : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [dir, setDir] = useState(1);
  const [hover, setHover] = useState<string | null>(null);

  const months = [cursor, new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)];
  const canPrev = cursor > new Date(today.getFullYear(), today.getMonth(), 1);

  function pick(iso: string) {
    if (!start || (start && end)) onChange(iso, null);
    else if (iso <= start) onChange(iso, null);
    else onChange(start, iso);
  }

  const rangeEnd = end ?? (start && hover && hover > start ? hover : null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canPrev}
          onClick={() => {
            setDir(-1);
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
          }}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-gold disabled:opacity-30"
        >
          ←
        </button>
        <p className="eyebrow text-muted" aria-live="polite">
          {start ? (end ? "Dates selected" : "Now choose your departure") : "Choose your arrival"}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => {
            setDir(1);
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));
          }}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-gold"
        >
          →
        </button>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={toISO(cursor)}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {months.map((m, mi) => (
              <Month key={mi} month={m} today={today} start={start} end={rangeEnd} onPick={pick} onHover={setHover} hideOnMobile={mi === 1} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Month({
  month,
  today,
  start,
  end,
  onPick,
  onHover,
  hideOnMobile,
}: {
  month: Date;
  today: Date;
  start: string | null;
  end: string | null;
  onPick: (iso: string) => void;
  onHover: (iso: string | null) => void;
  hideOnMobile?: boolean;
}) {
  const y = month.getFullYear();
  const mo = month.getMonth();
  const days = new Date(y, mo + 1, 0).getDate();
  const offset = (new Date(y, mo, 1).getDay() + 6) % 7;
  const cells: (Date | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => new Date(y, mo, i + 1))];
  const label = month.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className={cn(hideOnMobile && "hidden md:block")}>
      <p className="font-display text-2xl mb-4" id={`cal-${y}-${mo}`}>{label}</p>
      <div className="grid grid-cols-7 gap-y-1 text-center" aria-hidden="true">
        {DOW.map((d) => (
          <span key={d} className="eyebrow pb-3 text-[0.58rem] text-muted">{d}</span>
        ))}
      </div>
      <div role="group" aria-labelledby={`cal-${y}-${mo}`} className="grid grid-cols-7 gap-y-1 text-center">
        {cells.map((d, i) => {
          if (!d) return <span key={i} aria-hidden="true" />;
          const iso = toISO(d);
          const past = d < today;
          const isStart = iso === start;
          const isEnd = iso === end;
          const inRange = !!start && !!end && iso > start && iso < end;
          return (
            <div key={i} className={cn("relative", inRange && "bg-gold/15", isStart && end && "rounded-l-full bg-gold/15", isEnd && "rounded-r-full bg-gold/15")}>
              <button
                type="button"
                disabled={past}
                onClick={() => onPick(iso)}
                onMouseEnter={() => onHover(iso)}
                onMouseLeave={() => onHover(null)}
                aria-pressed={isStart || isEnd}
                aria-label={d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                className={cn(
                  "num mx-auto grid h-10 w-10 place-items-center rounded-full text-sm transition-colors",
                  past && "text-ivory/20 line-through",
                  !past && !isStart && !isEnd && "hover:bg-white/10",
                  (isStart || isEnd) && "bg-gold text-bg font-semibold"
                )}
              >
                {d.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
