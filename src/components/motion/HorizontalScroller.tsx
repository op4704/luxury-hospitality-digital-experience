"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useCinematic } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Vertical scroll drives a horizontal track while the section is pinned.
 * Travel distance is measured from the real track width (ResizeObserver),
 * so any number / size of cards works. Below 768px or with reduced motion
 * it degrades to a native swipeable row.
 */
export function HorizontalScroller({
  children,
  header,
  className,
  id,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const cinematic = useCinematic();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const distMV = useMotionValue(0);

  useEffect(() => {
    if (!cinematic) return;
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      distMV.set(d);
      setDist(d);
    });
    ro.observe(el);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [cinematic, distMV]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, [0.05, 0.95], [0, 1], { clamp: true });
  const raw = useTransform(() => -p.get() * distMV.get());
  const x = useSpring(raw, { stiffness: 160, damping: 34, mass: 0.3 });

  if (!cinematic) {
    return (
      <section id={id} className={cn("relative section-y", className)}>
        {header}
        <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-[var(--gutter)] pb-4 [scrollbar-width:none]">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section id={id} ref={ref} className={cn("relative", className)} style={{ height: `calc(100svh + ${dist * 1.1}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {header}
        <motion.div ref={trackRef} className="mt-[5vh] flex gap-[1.6vw] pl-[var(--gutter)] will-change-transform" style={{ x }}>
          {children}
          <div aria-hidden="true" className="w-[var(--gutter)] shrink-0" />
        </motion.div>
        <div className="container-x mt-[5vh]">
          <div className="relative h-px bg-[var(--line-dark)]">
            <motion.div className="absolute inset-0 origin-left bg-gold" style={{ scaleX: p }} />
          </div>
        </div>
      </div>
    </section>
  );
}
