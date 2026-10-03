"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query. Returns `fallback` until mounted. */
export function useMediaQuery(query: string, fallback = false) {
  const [match, setMatch] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** True on desktop-sized screens where pinned / horizontal scroll is used. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)", true);
export const useReducedMotionPref = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** Pinned scrollytelling is only for desktop without reduced motion. */
export function useCinematic() {
  const desktop = useIsDesktop();
  const reduced = useReducedMotionPref();
  return desktop && !reduced;
}
