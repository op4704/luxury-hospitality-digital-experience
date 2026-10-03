"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { money } from "@/lib/utils";

/** Money value that rolls to its new total. */
export function AnimatedTotal({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => money(Math.round(v)));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [value, mv]);
  return (
    <motion.span className={className} aria-live="polite" aria-label={money(value)}>
      {text}
    </motion.span>
  );
}
