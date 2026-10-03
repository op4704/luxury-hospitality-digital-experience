"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { frame, cancelFrame, MotionConfig } from "motion/react";
import { useBooking, useUI } from "@/lib/store";

const LenisCtx = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisCtx);

/**
 * Lenis drives the scroll position; Motion's frame loop drives Lenis.
 * One rAF for everything, so useScroll-driven values never lag a frame
 * behind the smoothed scroll.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    useBooking.persist.rehydrate();
    useUI.persist.rehydrate();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.15 });
    const update = ({ timestamp }: { timestamp: number }) => instance.raf(timestamp);
    frame.update(update, true);
    // Storing the instance is the external-system subscription this effect exists for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    return () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisCtx.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisCtx.Provider>
  );
}
