"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { Photo } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Image that drifts vertically against the scroll. `speed` is the % of
 * travel (positive = slower than scroll). The image is over-scaled so
 * edges never show.
 */
export function ParallaxImage({
  photo,
  className,
  speed = 12,
  sizes = "100vw",
  priority,
  cursor = "View",
}: {
  photo: Photo;
  className?: string;
  speed?: number;
  sizes?: string;
  priority?: boolean;
  cursor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.3 });

  const positioned = /\b(absolute|fixed|sticky)\b/.test(className ?? "");

  return (
    <div ref={ref} className={cn(!positioned && "relative", "overflow-hidden", className)} data-cursor={cursor}>
      <motion.div className="absolute inset-[-14%] will-change-transform" style={{ y }}>
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
