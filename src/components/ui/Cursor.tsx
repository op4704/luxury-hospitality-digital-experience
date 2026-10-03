"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/**
 * Dot cursor that grows into a labelled disc over [data-cursor] targets
 * ("View", "Explore", …) and into a ring over links/buttons.
 * Only mounts its behaviour on fine pointers.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [hoverLink, setHoverLink] = useState(false);
  const [active, setActive] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!shown.current) {
        shown.current = true;
        setActive(true);
      }
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor || null);
      setHoverLink(!!t.closest("a, button, [role=button], input, select, textarea, label"));
    };
    const leave = () => {
      shown.current = false;
      setActive(false);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  const size = label ? 92 : hoverLink ? 44 : 10;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden md:block"
      style={{ x: sx, y: sy, opacity: active ? 1 : 0 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(243,238,230,0.92)" : hoverLink ? "rgba(200,169,106,0)" : "rgba(200,169,106,1)",
          borderColor: hoverLink && !label ? "rgba(200,169,106,0.9)" : "rgba(200,169,106,0)",
        }}
        style={{ borderWidth: 1, borderStyle: "solid" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="eyebrow text-bg text-[0.6rem]"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
