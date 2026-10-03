export const EASE = [0.22, 1, 0.36, 1] as const;

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

/** Unsplash URL with sizing params — only for non-next/image contexts (e.g. three.js textures). */
export const unsplash = (src: string, w = 1200, q = 70) => `${src}?w=${w}&q=${q}&auto=format&fit=crop`;

export function nightsBetween(a: string | null, b: string | null) {
  if (!a || !b) return 0;
  const ms = new Date(b + "T00:00:00").getTime() - new Date(a + "T00:00:00").getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

export const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fmtDate = (iso: string | null, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-GB", opts) : "—";

export const fmtDuration = (mins: number) =>
  mins < 60 ? `${mins} min` : mins % 60 === 0 ? `${mins / 60} h` : `${Math.floor(mins / 60)} h ${mins % 60} min`;
